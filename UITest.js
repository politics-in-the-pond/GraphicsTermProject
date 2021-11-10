function UIInit(renderer)
{
    document.body.appendChild(renderer.domElement);
    return new ThreeUI(renderer.domElement, 720);
}
// AssetLoader
   // AssetLoader.add.webFont('webFont', 'fonts/web-font.css');
   AssetLoader.add.image('sprites/heart.png');
   // AssetLoader.add.image('sprites/asset-active.png');
   // AssetLoader.add.spriteSheet('sprites/sheet.png', 'sprites/sheet.json');
   // AssetLoader.add.bitmapText('fonts/bitmap-font.png', 'fonts/bitmap-font.json');
  // Set a progress listener, can be used to create progress bars
    AssetLoader.progressListener = function(progress) {
        console.info('Progress: ' + (progress * 100) + '%');
    }; //progress바 표기

    AssetLoader.load(function() { //에셋 로더
        // Initialize the game
        init();
    });
    
    
//testcode
function init() 
{
  const canvas = document.getElementById( "gl-canvas" );
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight); //ui anchor를 위해 필수

  const ui = UIInit(renderer);
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;

  // 카메라 세팅
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far); //카메라 객체 생성
    camera.position.z = 2;
    

    // UI elements
    const rectangle = ui.createRectangle('#FF6D92',0, 0, 300, 100)//x,y,w,h
    rectangle.anchor.x = ThreeUI.anchors.center;
    rectangle.anchor.y = ThreeUI.anchors.center;
    const text = ui.createText('BUTTON', 40, 'Arial', 'white');
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.anchor.x = ThreeUI.anchors.center;
    text.anchor.y = ThreeUI.anchors.center;
    text.parent = rectangle;
    rectangle.onClick(() => {
        console.info('clicked');
    });
    //scene
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
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); //박스 Geometry 객체 생성

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});//meterial 객체 생성
    const cube = new THREE.Mesh(geometry, material); // 박스 메쉬 생성
    scene.add(cube); // Scene에 박스 추가
    cube.position.x = x;
    return cube;
  }

  
  const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
  ];


  function render(time) {
    time *= 0.001;  // convert time to seconds
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    ui.render(renderer);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);	
}
