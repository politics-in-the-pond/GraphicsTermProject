import * as THREE from "../libs/three128/three.module.js"
import {GLTFLoader} from "../libs/three128/GLTFLoader.js"
import {cylinderIntersectsCylinder} from "../libs/Collisions.js"
import {Explosion} from "../main/Explosion.js"
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
        this.rotaion = new THREE.Vector3(0.1,0.1,0.1);
        this.isFirst;
        this.currentMinePosz=1;
        this.character = this.game.character;
        this.load();
        this.life=3; //라이프를 참조를 계속 못해서 여기로 옮김
        this.colided = [];
        this.explosions = [];
        //this.explosion = new Explosion(); //explosion 경로 혹은 참조 오류?
    }

    lifeChanged()
    {
        console.log(this.life);
        var lives=[
            document.getElementById("Life1"),
            document.getElementById("Life2"),
            document.getElementById("Life3"),
        ]
        var fillin = "../assets/life/0.png"
        var blank = "../assets/life/2.png"

        if(this.life==3)
        {
            lives[0].src=fillin;
            lives[1].src=fillin;
            lives[2].src=fillin;
        }
        else if(this.life==2)
        {
            lives[0].src=fillin;
            lives[1].src=fillin;
            lives[2].src=blank;
        }
        else if(this.life==1)
        {
            lives[0].src=fillin;
            lives[1].src=blank;
            lives[2].src=blank;
        }
        else if(this.life<=0)
        {
            lives[0].src=blank;
            lives[1].src=blank;
            lives[2].src=blank;
            this.gameOver();
        }
    }
    gameOver(){
        var overmenu = document.getElementById("GameOverMenu")
        var menu = document.getElementById("GameMenu")
        var menuBtn = document.getElementById("GameMenuBtn")
        menu.style.display="none";
        overmenu.style.display="flex";
        menuBtn.style.display="none";
        this.game.pause=true;

    }
    load() {

        const loader = new GLTFLoader().setPath(`${Obstacles.MapPath}`);
        this.loaded = false;
        
        loader.load(

            // gltf resource
            'land_mine_resize.glb',

            // resource가 loading 될때 불린다.
            gltf => {
                this.map = gltf.scene.children[0];
                this.mapWaitQueue=new Queue();
                this.mapQueue=new Queue();
                this.map.name = 'map';
               
                this.map.visible = true;
                

                for (let index = 0; index < 3; index++) {
                    var newMap=this.map.clone();
                    this.scene.add(newMap)
                    this.mapWaitQueue.enqueue(newMap);
                }
                console.log(this.mapWaitQueue._arr);
               
                while(this.mapWaitQueue._arr.length>0)
                {
                    this.mapWaitQueue._arr[0].position.set(0*3,0,this.currentMinePosz);
                    console.log( this.mapWaitQueue._arr[0].position);
                    this.mapQueue.enqueue(this.mapWaitQueue.dequeue());
                    this.currentMinePosz=this.currentMinePosz+1;
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
        this.currentMinePosz=1;
        this.life=3;
        this.lifeChanged();
        for (let index = 1; index < 10; index++) {
            this.replaceMap(this.mapQueue.dequeue());
        }
    }
   
    replaceMap(map){
        map.position.set(0,0,this.currentMinePosz); //지뢰 랜덥 뒤에 곱한 수치에 따라 너비 조정
        this.mapQueue.enqueue(map);
        this.currentMinePosz=this.currentMinePosz+1;
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