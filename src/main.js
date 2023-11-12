import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { room_box } from './room'

import { MySTLLoader } from './stlObject.js';


const scene = new THREE.Scene();

let objList = new Array();
const loader = new MySTLLoader(scene, );

let room = new room_box(scene, 10, 10 ,5);

let raycaster;


let INTERSECTED;

const pointer = new THREE.Vector2();
const radius = 5;
raycaster = new THREE.Raycaster();



function onPointerMove( event ) 
{

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


loader.load(scene, objList, 
    './models/fox.stl',
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))

loader.load(scene, objList, 
    './models/fox.stl',
    new THREE.Vector3(0,2,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))
    
loader.load(scene, objList, 
    './models/fox.stl',
    new THREE.Vector3(0,3,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))            

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 10, -10);

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
document.body.appendChild(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

//ambient light
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
scene.background = new THREE.Color(0x72645b);

//directional light
const color = 0xFFFFFF;
const intensity = 1;
const light_dir = new THREE.DirectionalLight(color, intensity);
light_dir.position.set(-20, 10, 0);
light_dir.target.position.set(0, 0, 0);
scene.add(light_dir);
scene.add(light_dir.target);

function resize() {
    const aspectRatio = window.innerWidth / window.innerHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', () => { resize() });

var axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

function animate() {
    requestAnimationFrame(animate)
    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( scene.children, false );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );

        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

    }

    renderer.render(scene, camera);
}

document.addEventListener( 'mousemove', onPointerMove );
//window.addEventListener( 'resize', onWindowResize );


if (WebGL.isWebGLAvailable()) {
    animate()
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

