import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-10, 10, -10);




const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
document.body.appendChild( canvas );
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const loader = new STLLoader();

loader.load( "./models/fox.stl", function ( geometry ) {

    console.log("tik")
    const material = new THREE.MeshPhongMaterial( { color: 0xf25f78 } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 0, 0 );
    mesh.rotation.set(- Math.PI / 2, 0, 0);
    mesh.scale.set( 0.1, 0.1, 0.1 );

    scene.add( mesh );

} );

//ambient light
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
scene.background = new THREE.Color( 0x72645b );

//directional light
const color = 0xFFFFFF;
const intensity = 1;
const light_dir = new THREE.DirectionalLight(color, intensity);
light_dir.position.set(-20, 10, 0);
light_dir.target.position.set(0, 0, 0);
scene.add(light_dir);
scene.add(light_dir.target);

function resize()
{
    const aspectRatio = window.innerWidth / window.innerHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight )
}
window.addEventListener( 'resize', () => {resize()});

var axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

function animate() 
{
    requestAnimationFrame( animate )
    renderer.render( scene, camera );
}

if (WebGL.isWebGLAvailable())
{
	animate()
}
else 
{
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}

