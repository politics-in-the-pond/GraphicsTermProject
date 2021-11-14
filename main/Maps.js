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
  
class Maps {


    static MapPath = '../assets/'
    constructor(game){
        this.game = game;
        this.scene = game.scene;
        this.position = new THREE.Vector3(0,90 * Math.PI / 180,0);
        this.isFirst;
        this.currentMapPosz=0;

        this.character = this.game.character;
        this.load();
    }
    gameOver(){
        var overmenu = document.getElementById("GameOverMenu")
        var menu = document.getElementById("GameMenu")
        var menuBtn = document.getElementById("GameMenuBtn")
        menu.style.display="none";
        overmenu.style.display="flex";
        menuBtn.style.display="none";
        this.game.pause=true;
        this.mapHeight=-0.1;
    }
    load() {

        const loader = new GLTFLoader().setPath(`${Maps.MapPath}road_free/`);
        this.loaded = false;
        
        loader.load(

            // gltf resource
            'scene.gltf',

            // resource가 loading 될때 불린다.
            gltf => {
                this.map = gltf.scene;
                this.mapWaitQueue=new Queue();
                this.mapQueue=new Queue();
                this.map.name = 'map';
               
                this.map.visible = true;
                

                for (let index = 0; index < 3; index++) {
                    var newMap=this.map.clone();
                    this.scene.add(newMap)
                    this.mapWaitQueue.enqueue(newMap);
                }
                
                while(this.mapWaitQueue._arr.length>0)
                {
                    this.mapWaitQueue._arr[0].position.set(0,this.mapHeight,this.currentMapPosz);
                    console.log( this.mapWaitQueue._arr[0].position);
                    this.mapQueue.enqueue(this.mapWaitQueue.dequeue());
                    this.currentMapPosz=this.currentMapPosz+1;
                }
                
            },
            xhr => { },
            err => {console.log(err);}
        );
        this.loaded = true;
    }
    distanceVector( v1, v2 )
    {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt( dx * dx + dy * dy + dz * dz );
    }
    checkCollision(o1,r1,o2,r2)
    {
       
        //console.log(this.distanceVector(o1.position,o2.position));
        if(this.distanceVector(o1.position,o2.position)<r1+r2)
        {
            return true
        }
        return false;
    }
    reset()
    {
        this.currentMapPosz=1;
        this.life=3;
        this.lifeChanged();
        for (let index = 1; index < 10; index++) {
            this.replaceMap(this.mapQueue.dequeue());
        }
    }
   
    replaceMap(map){
        map.position.set(0,this.mapHeight,this.currentMapPosz); //지뢰 랜덥 뒤에 곱한 수치에 따라 너비 조정
        this.mapQueue.enqueue(map);
        this.currentMapPosz=this.currentMapPosz+1;
        map.visible = true;
    }
    update(){

        this.collisionObj = []
        this.isCollision = false;
        this.mapQueue._arr.forEach((map, ndx) => {
            if(this.character.posz-map.position.z>2)
            {
                this.replaceMap(this.mapQueue.dequeue());
            }
        });
    }

}


export {Maps}