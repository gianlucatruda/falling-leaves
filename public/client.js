import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.
    innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Create a point light
// const light = new THREE.PointLight(0xffffff, 100, 100);
// const light = new THREE.AmbientLight(0xffffff, 1, 100);
// light.position.set(5, 5, 5);
// scene.add(light);

// Define a simple leaf geometry
const geometry = new THREE.ConeGeometry(0.5, 2, 2);
geometry.rotateX(Math.PI / 2);
geometry.rotateZ(Math.PI / 2);
const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Math.random(), 255, 0)
});

const leaf = new THREE.Mesh(geometry, material);
scene.add(leaf);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();

// Color transformation from green to brown
function updateColor() {
    // const time = Date.now() * 0.001; // Current time in seconds
    // const greenToBrown = (1 - Math.abs(Math.sin(time * 0.5)));
    // color.setHSL(0.1, 1, greenToBrown);  // Continuously shift hue from green to brown
    // material.color = color;
}

function animate() {
    requestAnimationFrame(animate);
    updateColor();
    leaf.rotation.y += 0.002;  
    leaf.rotation.z += Math.random() * 0.002; 
    leaf.rotation.x += Math.random() * 0.002; 
    controls.update();
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();
