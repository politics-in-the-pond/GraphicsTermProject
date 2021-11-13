import * as THREE from '../libs/three128/three.module.js';

class Camera{
    camera;
    biasy = 1;
    beforePositionx=0;
    beforePositiony=0;

    setCamera(camera)
    {
        this.camera = camera;
        camera.position.z = 3;
        camera.rotation.x = -10/360*Math.PI;
        camera.rotation.y = 0/360*Math.PI;
        camera.rotation.z = 0/360*Math.PI;
    }

    setCameraPosition(pos){
        var boundaryx = 2;
        var boundaryy = 10;
        var smoothing = 100
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
      
      if( pos[1] - this.beforePositiony > boundaryy)
      {
        this.camera.position.y=this.beforePositiony+deltaMovement;
      }
      else if(pos[1] - this.beforePositiony < -boundaryx)
      {
        this.camera.position.y=this.beforePositiony-deltaMovement;
      }
      else if(this.beforePositiony != pos[1])
      {
        this.camera.position.y=this.beforePositiony+(pos[1]-this.beforePositiony)/smoothing;
      }

      this.beforePositionx = this.camera.position.x;
      this.beforePositiony = this.camera.position.y;
      this.camera.position.x += 0;
      this.camera.position.y += 2;
      //camera 이동 
    }

    getCamera(){
        return this.camera;
    }

}

export {Camera};