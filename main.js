import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const ambientLight = new THREE.AmbientLight(0xff8800, 0.1); // Color y intensidad
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(1, 1, 1); // Ajusta la posición de la luz
scene.add(light);

loader.load( 'fecha.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, 5 );
controls.update();

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	scene.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();