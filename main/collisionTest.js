import * as THREE from '../libs/three128/three.module.js';
import { GLTFLoader } from '../libs/three128/GLTFLoader.js';
import { DRACOLoader } from '../libs/three128/DRACOLoader.js';
import { RGBELoader } from '../libs/three128/RGBELoader.js';
import { OrbitControls } from '../libs/three128/OrbitControls.js';
import { LoadingBar } from '../libs/LoadingBar.js';

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
  

  function makeSphere(color, x) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 16);
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  
  function makeBox(color, x) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  var collidableMeshList = [makeBox(0x44aa88, 0)];
  function RandomMovement()
  {
      const direction = new THREE.Vector3(Math.random()*2-1,Math.random()*2-1,0).normalize();
      return direction;
  }

  const spheres = [
    makeSphere(0x44aa88,  1),
  ];
  
  var spheresDir =[
    RandomMovement()
  ];

 

  function render(time) {
    time *= 0.001;  // convert time to seconds
    
    spheres.forEach((obj, ndx) => {
        const speed = 0.1;
        obj.position.x = obj.position.x+spheresDir[ndx].x*time*speed;
        obj.position.y = obj.position.y+spheresDir[ndx].y*time*speed;
      });
      spheres.forEach((obj, ndx) => {
        //console.log(obj.matrix);
         for (var vertexIndex = 0; vertexIndex < obj.geometry.index.count; vertexIndex++)
         {        
             var localVertex = new THREE.Vector3(obj.geometry.index[vertexIndex]);

             var globalMatrix = new THREE.Matrix4();
             globalMatrix.fromArray(obj.matrix);
            var globalVertex = localVertex.applyMatrix4(globalMatrix);
             var directionVector = globalVertex.sub( obj.position );
             var ray = new THREE.Raycaster( obj.position.clone(), directionVector.clone().normalize());
             var collisionResults = ray.intersectObjects( collidableMeshList );
             if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
                 appendText(" Hit ");
         }
     });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);	
}
