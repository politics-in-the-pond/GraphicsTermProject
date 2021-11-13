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
        camera.rotation.x = 30 * Math.PI / 180;
        camera.rotation.y = 180 * Math.PI / 180;
        camera.rotation.z = 0 * Math.PI / 180;
    }

    setCameraPosition(pos){
        var boundaryx = 2;
        var boundaryy = 10;
        var smoothing = 100
        var deltaMovement = 0.01;

    //camera 이동 
      if( pos[0] - this.beforePositionx > boundaryx)
      {
        this.camera.position.x=this.beforePositionx+deltaMovement;
      }
      else if(pos[0] - this.beforePositionx <-boundaryx)
      {
        this.camera.position.x=this.beforePositionx-deltaMovement;
      }
      else if(this.beforePositionx != pos[0])
      {
        this.camera.position.x=this.beforePositionx+(pos[0]-this.beforePositionx)/smoothing;
      }
      
      if( pos[2] - this.beforePositionz > boundaryy)
      {
        this.camera.position.z=this.beforePositionz+deltaMovement;
      }
      else if(pos[2] - this.beforePositionz < -boundaryx)
      {
        this.camera.position.z=this.beforePositionz-deltaMovement;
      }
      else if(this.beforePositionz != pos[2])
      {
        this.camera.position.z=this.beforePositionz+(pos[2]-this.beforePositionz)/smoothing;
      }

      this.beforePositionx = this.camera.position.x;
      this.beforePositionz = this.camera.position.z;
      this.camera.position.x += 0;
      this.camera.position.z -= 3;
      //camera 이동 
    }

    getCamera(){
        return this.camera;
    }

}

export {Camera};