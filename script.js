import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);

// Car
const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

// Road
const roadGeometry = new THREE.PlaneGeometry(10, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.y = -0.5;
scene.add(road);

// Camera position
camera.position.set(0, 2, 5);
camera.lookAt(car.position);

// Game state
const keys = {};
let speed = 0;
const speedElement = document.getElementById('speed');

// Controls
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Movement
    if (keys['ArrowUp'] || keys['w']) speed += 0.1;
    if (keys['ArrowDown'] || keys['s']) speed -= 0.1;
    if (keys['ArrowLeft'] || keys['a']) car.rotation.y += 0.03;
    if (keys['ArrowRight'] || keys['d']) car.rotation.y -= 0.03;

    // Apply movement
    car.position.x -= Math.sin(car.rotation.y) * speed;
    car.position.z -= Math.cos(car.rotation.y) * speed;

    // Update camera
    camera.position.x = car.position.x;
    camera.position.z = car.position.z + 5;
    camera.lookAt(car.position);

    // Update UI
    speedElement.textContent = `Speed: ${Math.abs(Math.round(speed * 50))} km/h`;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
