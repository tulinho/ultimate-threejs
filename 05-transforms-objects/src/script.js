import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

// Axes helper
const axesHelper = new THREE.AxesHelper(0.2);
scene.add(axesHelper);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(1, 1, 0);
//mesh.rotation.reorder("YXZ");
mesh.rotation.set(Math.PI / 4.0, Math.PI / 4.0, 0);
scene.add(mesh);

const mesh2 = new THREE.Mesh(geometry, material);
scene.add(mesh2);
mesh2.position.set(2.5, 2.5, 0);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1.25, 1.25, 5);
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
