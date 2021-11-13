import * as THREE from '../libs/three128/three.module.js';

class Camera{
    camera;

    setCamera(camera)
    {
        this.camera=camera;
    }

    setCameraPosition(pos){
        //this.camera.position.set(0, pos, 0);
    }

}

export {Camera};