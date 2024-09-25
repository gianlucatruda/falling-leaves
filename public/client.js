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

class Leaf {
    constructor() {
        const geometry = new THREE.ConeGeometry(0.5, 2, 2);
        geometry.rotateX(Math.PI / 2);
        geometry.rotateZ(Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.
                Color(0.0, Math.min(0.6, Math.random()), 0.0)
        }); // Starting color green
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(
            Math.random() * 20 - 10,
            Math.random() * 10 + 5,
            Math.random() * 5 - 2.5,
        );
        this.velocityY = 0;  // Initial falling velocity
        scene.add(this.mesh);
    }

    move() {
        // Flutter effect with random rotation
        this.mesh.rotation.y += (0.01 * Math.random());
        this.mesh.rotation.x += (0.02 * Math.random());
        this.mesh.rotation.z += (0.01 * Math.random());

        // Simulating gravity
        this.velocityY += 0.001;  // Gravity effect
        this.mesh.position.y -= this.velocityY * 0.08;

        // Change color over time to simulate aging
        if (this.mesh.material.color.g > 0.6) { // Green to yellow transition
            this.mesh.material.color.g -= 0.0005;
        } else if (this.mesh.material.color.r < 1) { // Yellow to orange/brown
            this.mesh.material.color.g -= 0.0005;
            this.mesh.material.color.r += 0.001;
        }

        // Remove the leaf if it goes too low
        if (this.mesh.position.y < -10) {
            scene.remove(this.mesh);
            leaves.splice(leaves.indexOf(this), 1);
        }
    }
}

let leaves = [];
for (let i = 0; i < 20; i++) {
    leaves.push(new Leaf());

}
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

let fc = 0;


// Color transformation from green to brown
function updateColor() {
    // const time = Date.now() * 0.001; // Current time in seconds
    // const greenToBrown = (1 - Math.abs(Math.sin(time * 0.5)));
    // color.setHSL(0.1, 1, greenToBrown);  // Continuously shift hue from green to brown
    // material.color = color;
}

function animate() {
    fc++;
    requestAnimationFrame(animate);
    // updateColor();
    leaves.forEach(leaf => {
        leaf.move();
    });
    // leaf.rotation.y += 0.002;
    // leaf.rotation.z += Math.random() * 0.002;
    // leaf.rotation.x += Math.random() * 0.002;

    if (fc % 10 == 0) {
        leaves.push(new Leaf());
    }

    controls.update();
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();
