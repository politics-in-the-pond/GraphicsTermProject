class Movement{

    constructor(){

    }
    
    w_pressed = false;
    a_pressed = false;
    s_pressed = false;
    d_pressed = false;

    whenKeyDown(){
        var keyCode = event.which;
        console.log("pressed")
        // up
        if (keyCode == 87) {
            w_pressed = true
        }
            // down
        if (keyCode == 83) {
        s_pressed = true
        }
            // left
        if (keyCode == 65) {
        a_pressed = true
        }
            // right
        if (keyCode == 68) {
        d_pressed = true
        }
            // space
        if (keyCode == 32) {
            posx = 0.0;
            posy = 0.0;
        }
    }

    whenKeyUp(){
        var keyCode = event.which;
        console.log("pressed")
        // up
        if (keyCode == 87) {
            w_pressed = false
        }
            // down
        if (keyCode == 83) {
        s_pressed = false
        }
            // left
        if (keyCode == 65) {
        a_pressed = false
        }
            // right
        if (keyCode == 68) {
        d_pressed = false
        }
            // space
        if (keyCode == 32) {
            posx = 0.0;
            posy = 0.0;
        }
    }
}

export { Movement };