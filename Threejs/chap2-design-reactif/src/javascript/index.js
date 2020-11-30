import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import * as THREE from "three"
const canvas = document.querySelector('.main-canvas')
const ctx = canvas.getContext("3d")

canvas.width = window.innerWidth * window.devicePixelRatio
canvas.height = window.innerHeight * window.devicePixelRatio
canvas.style.maxWidth = window.innerWidth
canvas.style.maxHeight = window.innerHeight

let canvasWidth = (canvas.width)
let canvasHeight = (canvas.height)
let cW2 = (canvas.width / 2)
let cH2 = (canvas.height / 2)

let maskLoaded = false

const renderer = new THREE.WebGLRenderer({canvas});
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

const FOV = 100;
const ASPECT = canvas.clientWidth / canvas.clientHeight;  // valeur par défaut du canevas
const NEAR = 0.1;
const FAR = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR)
camera.updateProjectionMatrix()

camera.position.z = 2;

const scene = new THREE.Scene()

const BOX_WIDTH = 1
const BOX_HEIGHT = 1
const BOX_DEPTH = 1
const box_geometry = new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH);

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

const cubes = [
    makeInstance(box_geometry, 0x44aa88,  0),
    makeInstance(box_geometry, 0x8844aa, -2),
    makeInstance(box_geometry, 0xaa8844,  2),
  ];
    
const INTENSITY = 1
const COLOR = 0xFFFFFF
const light = new THREE.DirectionalLight(COLOR, INTENSITY)
light.position.set(-1, 2, 4)

scene.add(light)
renderer.render(scene, camera);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

const render = (time) => {
    time *= 0.001;  // convertis le temps en secondes

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

   cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });
  

    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
  }
requestAnimationFrame(render);


