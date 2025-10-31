// SIMPLE 3D Car - THIS WILL WORK 100%
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);

// Create car (red cube)
const geometry = new THREE.BoxGeometry(1, 0.5, 2);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const car = new THREE.Mesh(geometry, material);
scene.add(car);

// Create road
const roadGeometry = new THREE.PlaneGeometry(10, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = Math.PI / 2;
scene.add(road);

camera.position.z = 5;
camera.position.y = 2;

// Controls
const keys = {};
let carSpeed = 0;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') e.preventDefault(); // Prevent spacebar scrolling
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function animate() {
    requestAnimationFrame(animate);
    
    // Movement
    if (keys['ArrowUp'] || keys['w']) carSpeed = 0.1;
    else if (keys['ArrowDown'] || keys['s']) carSpeed = -0.1;
    else carSpeed *= 0.9; // Slow down
    
    if (keys['ArrowLeft'] || keys['a']) car.rotation.y += 0.03;
    if (keys['ArrowRight'] || keys['d']) car.rotation.y -= 0.03;
    
    // Move car
    car.position.x -= Math.sin(car.rotation.y) * carSpeed;
    car.position.z -= Math.cos(car.rotation.y) * carSpeed;
    
    // Update camera to follow car
    camera.position.x = car.position.x;
    camera.position.z = car.position.z + 5;
    camera.position.y = 2;
    camera.lookAt(car.position);
    
    // Update speed display
    document.getElementById('speed').textContent = 
        `Speed: ${Math.abs(Math.round(carSpeed * 100))} km/h`;
    
    renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the game
animate();

console.log("🚗 Racing game loaded! Use WASD or Arrow keys to drive!");
