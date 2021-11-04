posx = 0;
posy = 0;
posz = 0;

deltaMovement = 0.01
boundaryx = 1;
boundaryy = 1;
smoothing = 50

w_pressed = false;
a_pressed = false;
s_pressed = false;
d_pressed = false;

function whenKeyDown(){
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

function whenKeyUp(){
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

function calcPosition(){
  if(w_pressed){
    posy += deltaMovement;
  }

  if(a_pressed){
    posx -= deltaMovement;
  }

  if(s_pressed){
    posy -= deltaMovement;
  }

  if(d_pressed){
    posx += deltaMovement;
  }
}

window.onload = function init() 
{
  const canvas = document.getElementById( "gl-canvas" );
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  camera.rotation.x = 20/360*Math.PI;

  const scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
  ];

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {whenKeyDown();};

  document.addEventListener("keyup", onDocumentKeyUp, false);
  function onDocumentKeyUp(event) {whenKeyUp();};

  function render(time) {
    time *= 0.001;  // convert time to seconds
   
    calcPosition();
   
    cubes.forEach((cube) => {
      
      //camera 이동 
      if( cube.position.x - camera.position.x > boundaryx)
      {
        camera.position.x=camera.position.x+deltaMovement;
      }
      else if(cube.position.x - camera.position.x <-boundaryx)
      {
        camera.position.x=camera.position.x-deltaMovement;
      }
      else if(camera.position.x != cube.position.x)
      {
        camera.position.x=camera.position.x+(cube.position.x-camera.position.x)/smoothing;
      }
      
      
      if( cube.position.y - camera.position.y > boundaryx)
      {
        camera.position.y=camera.position.y+deltaMovement;
      }
      else if(cube.position.y - camera.position.y <-boundaryx)
      {
        camera.position.y=camera.position.y-deltaMovement;
      }
      else if(camera.position.y != cube.position.y)
      {
        camera.position.y=camera.position.y+(cube.position.y-camera.position.y)/smoothing;
      }
      //camera 이동 
      cube.position.x = posx;
      cube.position.y = posy;
     
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);	
}
