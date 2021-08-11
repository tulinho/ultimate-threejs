import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 *  Cursor
 */
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -1 * (event.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshNormalMaterial()
);
mesh.position.set(1, 1, 0);
scene.add(mesh);

const mesh2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshNormalMaterial()
);
mesh2.position.set(2, 2, 0);
scene.add(mesh2);

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	100
);

// const aspectRatio = sizes.width / sizes.height;

// const camera = new THREE.OrthographicCamera(
// 	-aspectRatio,
// 	aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );

camera.position.z = 8;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
//controls.target.y = 0;
controls.enableDamping = true;
//controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	//mesh.rotation.y = elapsedTime;

	// Update camera
	// camera.position.x = 3 * Math.sin(cursor.x * Math.PI * 2);
	// camera.position.z = 3 * Math.cos(cursor.x * Math.PI * 2);
	// camera.position.y = 3 * Math.sin(cursor.y * Math.PI);
	// camera.lookAt(mesh.position);

	//Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
