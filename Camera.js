import * as THREE from '../libs/three128/three.module.js';

class Camera{
    camera;
    biasy = 1;

    setCamera(camera)
    {
        this.camera = camera;
        camera.position.y = 1;
        camera.rotation.x = 70/360*Math.PI;
        camera.rotation.y = 0/360*Math.PI;
        camera.rotation.z = 0/360*Math.PI;
    }

    setCameraPosition(pos){
        var boundaryx = 1;
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
      
      if( pos[1] - this.camera.position.y > boundaryx)
      {
        this.camera.position.y=this.camera.position.y+deltaMovement;
      }
      else if(pos[1] - this.camera.position.y <-boundaryx)
      {
        this.camera.position.y=this.camera.position.y-deltaMovement;
      }
      else if(this.camera.position.y != pos[1])
      {
        this.camera.position.y=this.camera.position.y+(pos[1]-this.camera.position.y)/smoothing + this.biasy;
      }

      //camera 이동 

    }

    getCamera(){
        return this.camera;
    }

}

export {Camera};