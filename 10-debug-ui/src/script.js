import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";

/**
 * Debug
 */
const gui = new dat.GUI();
const parameters = {
	color: 0xff0000,
	spin: () => {
		gsap.to(meshBox.rotation, { z: meshBox.rotation.z + 10, duration: 1 });
	},
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Helpers
const axesHelper = new THREE.AxesHelper(0.2);
scene.add(axesHelper);

/**
 * Object
 */
const boxGeometry = new THREE.BoxGeometry(1, 3, 5);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const circleGeometry = new THREE.CircleGeometry(1);
const coneGeometry = new THREE.ConeGeometry(1.5, 3);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 200, 200);

const material = new THREE.MeshPhongMaterial({
	color: parameters.color,
	flatShading: true,
});
const mesh = new THREE.Mesh(planeGeometry, material);
mesh.position.set(0, 0, 0);
mesh.rotation.set(-Math.PI / 2, 0, 0);

const meshBox = new THREE.Mesh(boxGeometry, material);
meshBox.position.set(2, boxGeometry.parameters.depth / 2, 0);
meshBox.rotation.set(-Math.PI / 2, 0, 0);
scene.add(mesh);
scene.add(meshBox);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

/**
 * Events
 */
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) canvas.requestFullscreen();
	else document.exitFullscreen();
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.set(0, 5, 10);
scene.add(camera);

// lights
const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(50, 100, 100);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x002288);
dirLight2.position.set(-100, -100, -100);
scene.add(dirLight2);

const dirLight3 = new THREE.DirectionalLight(0x8e8e8e);
dirLight3.position.set(0, 100, 0);
scene.add(dirLight3);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = true;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = (3 * Math.PI) / 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setClearColor(0xf0f0f0);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Debug
 */
gui.add(camera.position, "x").min(-150).max(150).step(0.01).name("camera-x");
gui.add(camera.position, "y").min(-150).max(150).step(0.01).name("camera-x");
gui.add(camera.position, "z").min(-150).max(150).step(0.01).name("camera-x");

gui.add(meshBox, "visible").name("visible");
gui.add(meshBox.position, "x").min(-150).max(150).step(0.01).name("elem-x");
gui.add(meshBox.position, "z").min(-150).max(150).step(0.01).name("elem-y");
gui.add(meshBox.position, "y")
	.min(-150)
	.max(150)
	.step(0.01)
	.name("elem-elevation");

gui.add(meshBox.material, "wireframe").name("wireframe");
gui.addColor(parameters, "color").onChange(() => {
	meshBox.material.color.set(parameters.color);
});

gui.add(parameters, "spin");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
