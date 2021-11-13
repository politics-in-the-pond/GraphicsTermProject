import * as THREE from "../libs/three128/three.module.js"
import {GLTFLoader} from "../libs/three128/GLTFLoader.js"
class Queue {
    constructor() {
      this._arr = [];
    }
    enqueue(item) {
      this._arr.push(item);
    }
    dequeue() {
      return this._arr.shift();
    }
  }
  
class Obstacles {


    static obstaclePath = '../assets/'
    constructor(game){
        this.game = game;
        this.scene = game.scene;
        this.position = new THREE.Vector3(0,90 * Math.PI / 180,0);
        this.rotaion = new THREE.Vector3(0.1,0.1,0.1);
        this.isFirst;
        this.currentMinePosz=1;
        this.load();
        
    }


    load() {

        const loader = new GLTFLoader().setPath(`${Obstacles.obstaclePath}`);
        this.loaded = false;
        
        loader.load(

            // gltf resource
            'land_mine_resize.glb',

            // resource가 loading 될때 불린다.
            gltf => {
                this.landmine = gltf.scene.children[0];
                this.landmineQueue=new Queue();
                this.landmine.name = 'landMine';
               
                this.landmine.visible = true;
                

                for (let index = 0; index < 10; index++) {
                    var newMine=this.landmine.clone();
                    this.scene.add(newMine)
                    this.landmineQueue.enqueue(newMine);
                }
                console.log(this.landmineQueue._arr);
               
                while(this.landmineQueue._arr.length>0)
                {
                    this.landmineQueue._arr[0].position.set((Math.random()*2-1)*3,0,this.currentMinePosz);
                    console.log( this.landmineQueue._arr[0].position);
                    this.landmineQueue.dequeue();
                    this.currentMinePosz=this.currentMinePosz+1;
                }
                
            },
            xhr => { },
            err => {console.log(err);}
        );


        this.loaded = true;
    }
   
    reset()
    {
        this.landmine.position.set(0,100,0);
    }
    setPosition(x,y,z)
    {
        this.landmine.position.set(x,y,z);
    }
    update(pos, time){



    }

}


export {Obstacles}