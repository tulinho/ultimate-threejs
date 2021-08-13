import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Helpers
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

/**
 * Object
 */
const boxGeometry = new THREE.BoxGeometry(3, 1, 3);
const planeGeometry = new THREE.PlaneGeometry(2, 4);
const circleGeometry = new THREE.CircleGeometry(1);
const coneGeometry = new THREE.ConeGeometry(1.5, 3);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 3, 200, 200);

const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 2, 0));
geometry.vertices.push(new THREE.Vector3(2, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 0, 2));
geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faces.push(new THREE.Face3(0, 3, 1));
geometry.faces.push(new THREE.Face3(2, 1, 3));
geometry.faces.push(new THREE.Face3(0, 2, 3));

const material = new THREE.MeshPhongMaterial({
	color: 0xffaaaa,
	flatShading: true,
});
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh.position.set(1.5, cylinderGeometry.parameters.radiusBottom * 0.5, 1.5);
mesh2.position.set(5, cylinderGeometry.parameters.radiusBottom * 0.5, 7);
scene.add(mesh);
scene.add(mesh2);

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
camera.position.set(20, 15, 0);
scene.add(camera);

// lights
const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(100, 100, 100);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x002288);
dirLight2.position.set(-100, -100, -100);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

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
