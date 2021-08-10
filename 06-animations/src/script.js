import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh2 = new THREE.Mesh(geometry, material2);
scene.add(mesh2);

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Time
const clock = new THREE.Clock();

// Animations
gsap.to(mesh2.position, { x: 2, duration: 2, delay: 0 });
let interval = 2;
setInterval(() => {
	let elapsedTime = clock.getElapsedTime();
	let position = 2 * Math.sin(elapsedTime);
	let duration = Math.abs(mesh2.position.x - position);
	let interval = duration;
	gsap.to(mesh2.position, { x: position, duration });
}, interval);

const tick = () => {
	// Time
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	mesh.rotation.y = elapsedTime * Math.PI * 0.5;
	mesh.position.x = 2 * Math.sin(elapsedTime);
	mesh.position.y = 1.2 * Math.cos(elapsedTime);

	// Render
	renderer.render(scene, camera);

	//Request animation frame
	window.requestAnimationFrame(tick);
};

tick();
