import * as THREE from "../libs/three128/three.module.js"
import {GLTFLoader} from "../libs/three128/GLTFLoader.js"

class Obstacles {


    static obstaclePath = '../assets/spike_club/'
    constructor(game){
        this.game = game;
        this.scene = game.scene;
        this.position = new THREE.Vector3(0,90 * Math.PI / 180,0);
        this.rotaion = new THREE.Vector3(0.1,0.1,0.1);
        this.isFirst;
        this.load();
        
    }


    load() {

        const loader = new GLTFLoader().setPath(`${Obstacles.obstaclePath}`);
        this.loaded = false;
        
        loader.load(

            // gltf resource
            'scene.gltf',

            // resource가 loading 될때 불린다.
            gltf => {
                this.thorn = gltf.scene.children[0];
                this.thorn.name = 'thron';
                this.thorn.position.set(2,0,1)
                this.thorn.visible = true;
                this.scene.add(this.thorn);
                
                
            },
            xhr => { },
            err => {console.log(err);}
        );


        this.loaded = true;
    }
   

   
    update(){

    }

    // 초기상태로 돌아간다. Gameover를 위해 만든것
    reset(){


    }
}


export {Obstacles}