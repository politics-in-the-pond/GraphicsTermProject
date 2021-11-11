import * as THREE from '../libs/three128/three.module.js';
import { GLTFLoader } from '../libs/three128/GLTFLoader.js';
import { DRACOLoader } from '../libs/three128/DRACOLoader.js';
import { RGBELoader } from '../libs/three128/RGBELoader.js';
import { OrbitControls } from '../libs/three128/OrbitControls.js';
import { LoadingBar } from '../libs/LoadingBar.js';
import { Movement } from '../Movement.js';

class Game{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
		this.clock = new THREE.Clock();
        // loadingBar를 만듭니다.
        this.loadingBar = new LoadingBar();
        this.loadingBar.visible = false;

		this.assetsPath = '../assets/';
        
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 50 );
		this.camera.position.set( 1, 1.7, 2.8 );
        
		let col = 0x605550;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( col );
		
        
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		this.scene.add(ambient);

        const light = new THREE.DirectionalLight();
        light.position.set( 0.2, 1, 1 );
		
        // antialiasing을 활성화합니다.
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		// 렌더러의 비율을 사용하는 기기화면 비율에 맞추어 조정합니다.
        this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );

        this.setEnvironment();
        
        // 우리들이 마우스 조작을 통해서 카메라의 위치를 바꿀 수 있게 합니다.
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set(0, 1, 0);
		controls.update();

        this.loadEve();
		
		window.addEventListener('resize', this.resize.bind(this) );
        
	}
	
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;    // 종횡비 변경
    	this.camera.updateProjectionMatrix();   // camera matrix를 업데이트하여 카메라의 위치 변경을 반영합니다.
    	this.renderer.setSize( window.innerWidth, window.innerHeight );    // 렌더러의 크기를 현재 창 크기에 맞춘다.
    }
    
    setEnvironment(){
        
        const loader = new RGBELoader().setDataType( THREE.UnsignedByteType ).setPath(this.assetsPath);
        // mipmap을 사용하는 발광 맵을 만든다. 이 맵의 특징은 다양한 수준의 blur를 빠르게 적용한다는 점이다.
        const pmremGenerator = new THREE.PMREMGenerator( this.renderer );
        pmremGenerator.compileEquirectangularShader();
        // Pre-compiles the equirectangular shader
        const self = this;
        
        loader.load( 'hdr/factory.hdr', ( texture ) => {
          // Generates a PMREM from an equirectangular texture, which can be either LDR (RGBFormat) or HDR (RGBEFormat).
          // The ideal input image size is 1k (1024 x 512)  
          const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
          pmremGenerator.dispose();
            //Disposes of the PMREMGenerator's internal memory
          self.scene.environment = envMap;

        }, undefined, (err)=>{
            console.error( err.message );
        } );
    }

    loadEve(){
    	const loader = new GLTFLoader().setPath(`${this.assetsPath}factory/`);
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../libs/three128/draco/');
        loader.setDRACOLoader(dracoLoader);

        this.loadingBar.visible = true;

        // this.scene = gltf.scene;

        loader.load(
            'eve.glb',
         gltf => {
            this.eve = gltf.scene;
            this.scene.add(gltf.scene);
            this.mixer = new THREE.AnimationMixer(gltf.scene);

            this.animations = {};
            
            gltf.animations.forEach(animation => {
                this.animations[animation.name.toLowerCase()] = 
                animation;
            });

            this.actionName = '';   // since we have no animatinos at the moment we initialize this to an empty string


            // method that will trigger a new animation
            this.newAnim();

            this.loadingBar.visible = false;

            this.renderer.setAnimationLoop(this.render.bind(this));
            this.plane = gltf.scene;            
        },
        xhr => { 
            this.loadingBar.progress = (xhr.loaded/xhr.total);
        },
        err => {
            console.error(err.message);
        }
        );
	}			
    
	newAnim(){
		const keys = Object.keys(this.animations);

        let index;

        do{
            index = Math.floor( Math.random() * keys.length);
        }while(keys[index] == this.actionName);

        this.action = keys[index];

        setTimeout(this.newAnim.bind(this), 3000);
	}

	set action(name){   // setter method when we called we set the game property action
		const clip = this.animations[name];

        if(clip!==undefined){
            const action = this.mixer.clipAction(clip);

            action.reset();
            
            if(name == 'shot'){
                action.setLoop(THREE.LoopOnce);
            }
            this.actionName = name;
            action.play();
            
            if(this.curAction){
                this.curAction.crossFadeTo(action, 0.5);
            }

            this.curAction = action;
        }
	}

	render() {
		const dt = this.clock.getDelta();
        if(this.mixer !== undefined) this.mixer.update(dt);
        this.renderer.render( this.scene, this.camera );
    }
}

export { Game };