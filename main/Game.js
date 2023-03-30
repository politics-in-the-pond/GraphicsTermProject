import * as THREE from '../libs/three128/three.module.js';
import { GLTFLoader } from '../libs/three128/GLTFLoader.js';
import { DRACOLoader } from '../libs/three128/DRACOLoader.js';
import { RGBELoader } from '../libs/three128/RGBELoader.js';
import { OrbitControls } from '../libs/three128/OrbitControls.js';
import { LoadingBar } from '../libs/LoadingBar.js';
import { Character } from '../Character.js';
import { Obstacles } from './Obstacles.js';
import { Camera } from '../Camera.js';
import { Deadline } from './Deadline.js';

var pressed_array = [false, false, false, false];


class Game{

	constructor(BGM,SFX){

        function whenKeyDown(pressed_array){
            var keyCode = event.which;
                // up w
            if (keyCode == 87) {
                pressed_array[0] = true;
            }
                // down s
            if (keyCode == 83) {
                pressed_array[1] = true;
            }
                // left a
            if (keyCode == 65) {
                pressed_array[2] = true;
            }
                // right d
            if (keyCode == 68) {
                pressed_array[3] = true;
            }

            return pressed_array;
        }
    
        function whenKeyUp(pressed_array){
            var keyCode = event.which;
                // up w
            if (keyCode == 87) {
                pressed_array[0] = false;
            }
                // down s
            if (keyCode == 83) {
                pressed_array[1] = false;
            }
                // left a
            if (keyCode == 65) {
                pressed_array[2] = false;
            }
                // right d
            if (keyCode == 68) {
                pressed_array[3] = false;
            }

            return pressed_array;
        }

		const container = document.createElement( 'div' );
		document.body.appendChild( container );

      
        this.BGM=BGM;
        this.SFX=SFX;
        
        this.BGM[0].loop=true;
        this.BGM[0].play();
		this.clock = new THREE.Clock();
        // loadingBar를 만듭니다.
        this.loadingBar = new LoadingBar();
        this.loadingBar.visible = false;

		this.assetsPath = '../assets/';
        this.movableCam = new Camera();
        this.movableCam.setCamera(new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.0001, 1000 ));
        
		let col = 0x605550;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( col );	
        
		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		this.scene.add(ambient);
        this.scene.fog = new THREE.Fog(0xffffff, 0.1, 50);

        const light = new THREE.DirectionalLight();
        light.position.set( 0.2, 1, 1 );
		
        this.character = new Character(this.loadCharacter());
        this.obstacles = new Obstacles(this);
        this.deadline = new Deadline(this);
        this.pause=false;
        

        // antialiasing을 활성화합니다.
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		// 렌더러의 비율을 사용하는 기기화면 비율에 맞추어 조정합니다.
        this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );



        this.setEnvironment();
        
         // 우리들이 마우스 조작을 통해서 카메라의 위치를 바꿀 수 있게 합니다.
         

		
	    // window.addEventListener('resize', this.resize.bind(this) );

        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {pressed_array = whenKeyDown(pressed_array);};

        document.addEventListener("keyup", onDocumentKeyUp, false);
        function onDocumentKeyUp(event) {pressed_array = whenKeyUp(pressed_array);};

        document.getElementById("GameMenuBtn").addEventListener("click", () => { //종료 버튼
            this.pause=true;
        });
        document.getElementById("MenuResumeBtn").addEventListener("click", () => { //종료 버튼
            this.pause=false;
        });
        document.getElementById("MenuRestartBtn").addEventListener("click", () => { //종료 버튼
            this.character.reset();
            this.obstacles.reset();
            this.deadline.reset();
            this.movableCam.reset(this.character.actor.position); //카메라 리셋 기능 다시 구현 필요
            this.pause=false;
        });
        document.getElementById("OverRestartBtn").addEventListener("click", () => { //종료 버튼
            this.character.reset();
            this.obstacles.reset();
            this.deadline.reset();
            this.movableCam.reset(this.character.actor.position);
            this.pause=false;
        });
	}

    pause()
    {
        this.pause=true;
    }
    resume()
    {
        this.pause=false;
    }

    loadCharacter(){
        const loader = new GLTFLoader().setPath(`${this.assetsPath}factory/`);
         const dracoLoader = new DRACOLoader();
         dracoLoader.setDecoderPath('../libs/three128/draco/');
         loader.setDRACOLoader(dracoLoader);
 
         this.loadingBar.visible = true;
 
         // this.scene = gltf.scene;
 
         // gltf 파일을 받아오는 부분입니다.
         loader.load(
             'eve.glb',
          gltf => {
 
             // eve에 gltf.scene을 넣어줌으로 eve의 모든 animation과 textur를 넣어줍니다.
             this.eve = gltf.scene;
             this.scene.add(gltf.scene);
             this.character.setActor(gltf);
             // method that will trigger a new animation
             //this.newAnim();
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
        
        loader.load( 'road_free/road.jpg', ( texture ) => {
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


    

    loadCharacter(){
    	const loader = new GLTFLoader().setPath(`${this.assetsPath}factory/`);
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../libs/three128/draco/');
        loader.setDRACOLoader(dracoLoader);

        this.loadingBar.visible = true;

        // this.scene = gltf.scene;

        // gltf 파일을 받아오는 부분입니다.
        loader.load(
            'eve.glb',
         gltf => {

            // eve에 gltf.scene을 넣어줌으로 eve의 모든 animation과 textur를 넣어줍니다.
            this.eve = gltf.scene;
            this.scene.add(gltf.scene);
            this.character.setActor(gltf);
            // method that will trigger a new animation
            //this.newAnim();
            this.loadingBar.visible = false;
            this.renderer.setAnimationLoop(this.render.bind(this));
            //this.plane = gltf.scene;            
        },
        xhr => { 
            this.loadingBar.progress = (xhr.loaded/xhr.total);
        },
        err => {
            console.error(err.message);
        }
        );
	}		
    //애니메이션 판단용 코드.
    

	render() {

		const dt = this.clock.getDelta();   // get elapsed time
        if(!this.pause)
        {
            this.character.update(pressed_array); 
            this.obstacles.update(dt);
            if(pressed_array !== undefined) this.character.move(pressed_array);
            this.character.addDeltaMovementy(0)
            var actorPosition = this.character.getActorPosition();
            this.deadline.updatePosition(actorPosition);
            this.movableCam.setCameraPosition(actorPosition);
            if(this.character.mixer !== undefined) this.character.mixer.update(dt);
            this.renderer.render( this.scene, this.movableCam.getCamera() );
            
        }
    }
}


// Reference : The Beginners Guid to 3D Web Game Development
export { Game };