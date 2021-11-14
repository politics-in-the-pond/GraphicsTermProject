import * as THREE from "../libs/three128/three.module.js"
import {GLTFLoader} from "../libs/three128/GLTFLoader.js"

class Obstacles {


    static obstaclePath = '../assets/'
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
            'land_mine_resize.glb',

            // resource가 loading 될때 불린다.
            gltf => {
                this.thorn = gltf.scene.children[0];
                this.thorn.name = 'landMine';
                this.thorn.position.set(0,0,1);
                this.thorn.visible = true;
                this.scene.add(this.thorn);
                 
            },
            xhr => { },
            err => {console.log(err);}
        );


        this.loaded = true;
    }
   

    update(pos, dt){
        let collisionObstacle;

        this.obstacles.forEach( obstacle =>{
            obstacle.children[0].rotateY(0.01);
            const relativePosZ = obstacle.position.z-pos.z;
            if (Math.abs(relativePosZ)<2){
                collisionObstacle = obstacle;
            }
            if (relativePosZ<-20){
                this.respawnObstacle(obstacle); 
            }
        });

       
        if (collisionObstacle!==undefined){
			let minDist = Infinity;
			collisionObstacle.children.some( child => {
				child.getWorldPosition(this.tmpPos);
				const dist = this.tmpPos.distanceToSquared(pos);
				if (dist<minDist) minDist = dist;
                if (dist<5 && !collisionObstacle.userData.hit){
					collisionObstacle.userData.hit = true;
					console.log(`Closest obstacle is ${minDist.toFixed(2)}`);
					this.hit(child);
                    return true;
                }
            })
            
        }


        this.explosions.forEach(explosion => {
            explosion.update(dt);   // delta time을 업데이트 한다.
        })

    }

    // 초기상태로 돌아간다. Gameover를 위해 만든것
    reset(){


    }
}


export {Obstacles}