import * as THREE from '../libs/three128/three.module.js';

var pressed_buffer = [false, false];
class Obstacle{
    actor;
    posx;
    posy;
    posz;
    deltaMovement;

    constructor(){
      
    }
  
    setInstance(instance)
    {
        this.instance=instance.scene;
        reset();
    }
   
    reset()
    {
      this.instance.position.set(-3,-3,-3);
    }
    setPosition(x,y,z)
    {
      this.instance.position.set(x,y,z);
    }

    
}

export { Obstacle };