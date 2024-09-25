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

// Define a simple leaf using a custom geometry
const leafShape = new THREE.Shape();
leafShape.moveTo(0, 0);
leafShape.arc(0, 0, 3, 0, 9, 10);
const geometry = new THREE.ShapeGeometry(leafShape);

// Initialize the color transition
let color = new THREE.Color(0x00ff00); // Start with green
const material = new THREE.MeshBasicMaterial({ color });

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
// const leafFolder = gui.addFolder('Leaf');
// leafFolder.add(leaf.rotation, 'x', 0, Math.PI * 2);
// leafFolder.add(leaf.rotation, 'y', 0, Math.PI * 2);
// leafFolder.add(leaf.rotation, 'z', 0, Math.PI * 2);
// leafFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'z', 0, 10);
cameraFolder.open();

// Color transformation from green to brown
function updateColor() {
    const time = Date.now() * 0.001; // Get current time in seconds
    const greenToBrown = (1 - Math.abs(Math.sin(time * 0.5)));
    color.setHSL(0.1, 1, greenToBrown); // Adjusting color
    material.color = color;
}

function animate() {
    requestAnimationFrame(animate);
    updateColor();
    // leaf.rotation.x += 0.01;
    leaf.rotation.y += 0.005;
    controls.update();
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();
