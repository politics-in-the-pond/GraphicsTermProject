import * as THREE from '../libs/three128/three.module.js';

class Deadline{
    posx;
    posy;
    posz;
    gameOverThreshold = 0.7;
    game;
    line;
    beforePositionz = -3;

    constructor(game){
        this.posx=0;
        this.posy=0;
        this.posz=-3;
        this.game = game;
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const points = [];
        points.push( new THREE.Vector3( - 3, 0, 0 ) );
        points.push( new THREE.Vector3( 3, 0, 0 ) );  
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        this.line = line;
        this.game.scene.add(this.line);
    }

    updatePosition(pos){
        var smoothing = 10;
        var boundaryz = 3;
        var deltaMovement = 0.015;
        if( pos[2] - this.beforePositionz < boundaryz)
        {
          this.line.position.z=this.beforePositionz+deltaMovement;
        }
        else if(this.beforePositionz != pos[2])
        {
          this.line.position.z=this.beforePositionz+(pos[2]-this.beforePositionz)/smoothing;
        }
        this.beforePositionz = this.line.position.z;
        this.line.position.z += 0.5;
        this.checkGameOver(pos);
    }

    checkGameOver(pos){
        var z = pos[2];
        var dist = Math.abs(this.beforePositionz - z);
        console.log(dist);
        if(dist<this.gameOverThreshold){
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
        this.reset();
        this.game.pause=true;
    }

    reset(){
        this.beforePositionz = -3;
    }
}

export {Deadline};