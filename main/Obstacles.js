import * as THREE from "../libs/three128/three.module.js"
import {GLTFLoader} from "../libs/three128/GLTFLoader.js"

class Obstacles {


    static obstaclePath = '../assets/spike_club/'
    constructor(game){
        this.game = game;
        this.scene = game.scene;
        this.loadThornPillar();
        this.position = Vector3(0,0,0);
        this.isFirst;
        
    }


   

   
    update(){

    }

    // 초기상태로 돌아간다. Gameover를 위해 만든것
    reset(){


    }
}


export {Obstacles}