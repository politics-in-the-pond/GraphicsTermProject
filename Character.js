import * as THREE from '../libs/three128/three.module.js';

var pressed_buffer = [false, false];
class Character{
    actor;
    posx;
    posy;
    posz;
    restriction=3;
    deltaMovement;

    constructor(){
        this.deltaMovement = 0.02;
        this.posx = 0;
        this.posy = 0;
        this.posz = 0;
    }
    reset()
    {
        this.deltaMovement = 0.02;
        this.posx = 0;
        this.posy = 0;
        this.posz = 0;
    }
    
	AnimationUpdate(index){
		const keys = Object.keys(this.animations);
        this.action = keys[index];
        //setTimeout(this.AnimationUpdate.bind(this), 3000);
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
            console.log(this.actionName);
            action.play();
            
            if(this.curAction){
                this.curAction.crossFadeTo(action, 0.5);
            }
            this.curAction = action;
        }
	}

    setActor(actor)
    {
        this.actor=actor.scene;
        this.setRotationY(180);
        this.mixer = new THREE.AnimationMixer(actor.scene);
        this.animations = {};
        actor.animations.forEach(animation => {
            this.animations[animation.name.toLowerCase()] = animation;
        });

        console.log(this.animations);

        this.actionName = '';   // since we have no animatinos at the moment we initialize this to an empty string
        this.setRotationY(0);
    }

    calcPosition(pressed_array){
        //console.log(pressed_array)
        if(pressed_array[0]){
            this.posz += this.deltaMovement;
        }
      
        if(pressed_array[1]){
            this.posz -= this.deltaMovement;
        }
      
        if(pressed_array[2]){
            this.posx += this.deltaMovement;
        }
      
        if(pressed_array[3]){
            this.posx -= this.deltaMovement;
        }
      }
      update(pressed_array){
        pressed_buffer[0] = pressed_buffer[1];
        if(pressed_array[0] == true){
            pressed_buffer[1] = true;
        } else if(pressed_array[1] == true){
            pressed_buffer[1] = true;
        } else if(pressed_array[2] == true){
            pressed_buffer[1] = true;
        } else if(pressed_array[3] == true){
            pressed_buffer[1] = true;
        }else{
            pressed_buffer[1] = false;
        }

        if(pressed_array[0] == true && pressed_array[1] == true && pressed_array[2] == false && pressed_array[3] == false){
            pressed_buffer[1] = false;
        } else if(pressed_array[0] == false && pressed_array[1] == false && pressed_array[2] == true && pressed_array[3] == true){
            pressed_buffer[1] = false;
        }  else if(pressed_array[0] == true && pressed_array[1] == true && pressed_array[2] == true && pressed_array[3] == true){
            pressed_buffer[1] = false;
        } 

        if(pressed_buffer[0] == false && pressed_buffer[1] == true){ //running으로 변경
            console.log("now running");
            this.AnimationUpdate(3);
        }else if(pressed_buffer[0] == true && pressed_buffer[1] == false){ //idle로 변경
            console.log("stop running");
            this.AnimationUpdate(2);
        }

        return 0;
    }

    move(pressed_array){
        this.calcPosition(pressed_array);
        var angle = this.getRotationFromKey(pressed_array);
        if(angle!= -1){
            this.setRotationY(angle);
        }
        if(this.posx > this.restriction){
            this.posx = this.restriction;
        }else if(this.posx < -this.restriction){
            this.posx = -this.restriction;
        }
        this.actor.position.set(this.posx, this.posy, this.posz);
        document.getElementById("Distance").innerText = Math.floor(this.posz)*10+" M";
    }

    getRotationFromKey(pressed_array){
        var angle = 0;
        if(pressed_array[0] == true){
            angle = 0;
        } else if(pressed_array[1] == true){
            angle = 180;
        } else if(pressed_array[2] == true){
            angle = 90;
        } else if(pressed_array[3] == true){
            angle = 270;
        }else{
            angle = -1;
        }

        if(pressed_array[0] == true && pressed_array[1] == false && pressed_array[2] == true && pressed_array[3] == false){
            angle = 45;
        } else if(pressed_array[0] == true && pressed_array[1] == false && pressed_array[2] == false && pressed_array[3] == true){
            angle = 315;
        } else if(pressed_array[0] == false && pressed_array[1] == true && pressed_array[2] == true && pressed_array[3] == false){
            angle = 135;
        } else if(pressed_array[0] == false && pressed_array[1] == true && pressed_array[2] == false && pressed_array[3] == true){
            angle = 225;
        } else{

        }

        return angle;
    }

    setRotationY(y){
        this.actor.rotation.set(0, y * Math.PI / 180, 0);
    }

    addDeltaMovementy(delta){
        this.posz += delta;
    }

    setDeltaMovement(delta){
        this.deltaMovement = delta;
    }

    getActorPosition(){
        var position = [this.posx, this.posy+1, this.posz];
        return position;
    }
}

export { Character };