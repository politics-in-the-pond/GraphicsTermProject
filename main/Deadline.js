import * as THREE from '../libs/three128/three.module.js';

class Deadline{
    posx;
    posy;
    posz;
    smoothing;
    game;
    line;

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
        this.posz = pos[2];
        this.line.position.x = this.posx;
        this.line.position.y = this.posy;
        this.line.position.z = this.posz;
    }

    gameOver(){
        var overmenu = document.getElementById("GameOverMenu")
        var menu = document.getElementById("GameMenu")
        var menuBtn = document.getElementById("GameMenuBtn")
        menu.style.display="none";
        overmenu.style.display="flex";
        menuBtn.style.display="none";
        this.game.pause=true;
    }
}

export {Deadline};