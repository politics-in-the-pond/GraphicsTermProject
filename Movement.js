class Movement{
    actor;
    posx;
    posy;
    posz;
    deltaMovement;

    constructor(){
        this.deltaMovement = 0.005;
        this.posx = 0;
        this.posy = 0;
        this.posz = 0;
    }
    
    setActor(actor){
        this.actor = actor;
    }

    calcPosition(pressed_array){
        //console.log(pressed_array)
        if(pressed_array[0]){
            this.posy -= this.deltaMovement;
        }
      
        if(pressed_array[1]){
            this.posy += this.deltaMovement;
        }
      
        if(pressed_array[2]){
            this.posx -= this.deltaMovement;
        }
      
        if(pressed_array[3]){
            this.posx += this.deltaMovement;
        }
      }

    moveActor(pressed_array){
        this.calcPosition(pressed_array);
        this.actor.position.set(this.posx, this.posz, this.posy);
        //console.log(pressed_array[0])
    }
}

export { Movement };