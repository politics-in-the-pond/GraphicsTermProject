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
  
class Obstacles {


    static obstaclePath = '../assets/'
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

        const loader = new GLTFLoader().setPath(`${Obstacles.obstaclePath}`);
        this.loaded = false;
        
        loader.load(

            // gltf resource
            'land_mine_resize.glb',

            // resource가 loading 될때 불린다.
            gltf => {
                this.landmine = gltf.scene.children[0];
                this.landmineWaitQueue=new Queue();
                this.landmineQueue=new Queue();
                this.landmine.name = 'landMine';
               
                this.landmine.visible = true;
                

                for (let index = 0; index < 10; index++) {
                    var newMine=this.landmine.clone();
                    this.scene.add(newMine)
                    this.landmineWaitQueue.enqueue(newMine);
                }
                console.log(this.landmineWaitQueue._arr);
               
                while(this.landmineWaitQueue._arr.length>0)
                {
                    this.landmineWaitQueue._arr[0].position.set((Math.random()*2-1)*3,0,this.currentMinePosz);
                    console.log( this.landmineWaitQueue._arr[0].position);
                    this.landmineQueue.enqueue(this.landmineWaitQueue.dequeue());
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
            this.replaceLandmine(this.landmineQueue.dequeue());
        }

        while(this.explosions.length >0){
            this.explosions[0].onComplete();
        }
    }

    recycleFiredLandmine(landmine){
        const x_range = 8;
        const z_range = 5;
        landmine.position.set(Math.abs(Math.random() * x_range), 0, this.currentMinePosz + Math.abs(Math.random()*z_range));
        landmine.visible = true;
    }
   
    replaceLandmine(landmine){
        landmine.position.set((Math.random()*2-1)*3,0,this.currentMinePosz); //지뢰 랜덥 뒤에 곱한 수치에 따라 너비 조정
        this.landmineQueue.enqueue(landmine);
        this.currentMinePosz=this.currentMinePosz+1;
        landmine.visible = true;
    }
    
    // landmine을 밟으면 구체를만들고 그 위에 텍스쳐를 입혀 폭발하는 것처럼 보여준다.
    removeExplosion(explosion){    // explosion 객체를 reference 인자로 전달 받는다.
        const index = this.explosions.indexOf(explosion);
        if(index != -1) this.explosions.splice(index,1);
        // 찾는 값이 이미 없는 경우가 아니면 explosions 배열에서 제거한다.

    }


    update(){

        this.collisionObj = []
        this.isCollision = false;
        this.landmineQueue._arr.forEach((landmine, ndx) => {
            if(this.character.posz-landmine.position.z>2)
            {
                this.replaceLandmine(this.landmineQueue.dequeue());
            }
            const collisionResult=this.checkCollision(landmine,0.3,this.character.actor,0.3); //콜리전 체크하는 부분 0.3이 반지름
            if(collisionResult)
            {
                this.colided.push(landmine);
                this.isCollision = true;
                this.explosions.push(new Explosion(landmine, this));
                //목숨 깍이는 코드 작성했지만 맞고나면 무적처리 필요
                //explosion 효과 필요
                //사운드 필요
                //움직임 제한
            }
            
        });


        this.colided.forEach((landmine) => {
            
            landmine.visible = false;
            this.recycleFiredLandmine(landmine);
        })

        this.colided.splice(0);

     

        if(this.isCollision){
            this.life = this.life -1;
            this.lifeChanged();
        }


    }

}


export {Obstacles}