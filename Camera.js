import * as THREE from '../libs/three128/three.module.js';

class Camera{
    camera;
    biasy = 1;
    beforePositionx=0;
    beforePositionz=0;

    setCamera(camera)
    {
        this.camera = camera;
        camera.position.y = 2;
        camera.rotation.x = -10/360*Math.PI;
        camera.rotation.y = 0/360*Math.PI;
        camera.rotation.z = 0/360*Math.PI;
    }

    setCameraPosition(pos){
        var boundaryx = 2;
        var boundaryy = 1;
        var smoothing = 50
        var deltaMovement = 0.01;
    //camera 이동 
      if( pos[0] - this.camera.position.x > boundaryx)
      {
        this.camera.position.x=this.camera.position.x+deltaMovement;
      }
      else if(pos[0] - this.camera.position.x <-boundaryx)
      {
        this.camera.position.x=this.camera.position.x-deltaMovement;
      }
      else if(this.camera.position.x != pos[0])
      {
        this.camera.position.x=this.camera.position.x+(pos[0]-this.camera.position.x)/smoothing;
      }
      
      if( pos[1] - this.beforePositionz > boundaryx)
      {
        this.camera.position.z=this.beforePositionz+deltaMovement;
      }
      else if(pos[1] - this.beforePositionz <-boundaryx)
      {
        this.camera.position.z=this.beforePositionz-deltaMovement;
      }
      else if(this.beforePositionz != pos[1])
      {
        this.camera.position.z=this.beforePositionz+(pos[1]-this.beforePositionz)/smoothing;
      }

      this.beforePositionx = this.camera.position.x;
      this.beforePositionz = this.camera.position.z;
      this.camera.position.x += 0;
      this.camera.position.z += 1.2;
      //camera 이동 
    }

    getCamera(){
        return this.camera;
    }

}

export {Camera};