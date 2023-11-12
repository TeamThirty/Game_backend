import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { room_box } from './room'

import { MySTLLoader } from './stlObject.js';


const scene = new THREE.Scene();

let objList = new Array();
const loader = new MySTLLoader();

let room = new room_box(scene, 20, 20 ,10);


const pointer = new THREE.Vector2();




function onPointerMove( event ) 
{

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);

let  cursor = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), new THREE.MeshBasicMaterial( {color : 0xff00ff}))
scene.add(cursor)
camera.layers.enableAll()

loader.load(scene, objList, 
    './models/fox.stl',
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))

loader.load(scene, objList, 
    './models/Cute_triceratops.stl',
    new THREE.Vector3(5,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))
    
loader.load(scene, objList, 
    './models/chair.stl',
    new THREE.Vector3(2,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))            



const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
document.body.appendChild(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();

//ambient light
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
scene.background = new THREE.Color(0x72645b);

//directional light
const color = 0xFFFFFF;
const intensity = 55;
const light_point = new THREE.PointLight(color, intensity);

light_point.position.set(5, 5, 5);
scene.add(light_point);
camera.layers.enable(10);

function resize() {
    const aspectRatio = window.innerWidth / window.innerHeight
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', () => { resize() });

function onWindowResize() 
{

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


let mousePos = new THREE.Vector3(0,0,0);



let currently_selected;
let currently_holding = false;

let raycaster;
let raycaster2;

let INTERSECTED;
let INTERSECTED_WALL;

raycaster = new THREE.Raycaster();
raycaster2 = new THREE.Raycaster();


function raycast_walls()
{
    raycaster2.setFromCamera( pointer, camera );
    raycaster2.layers.set( 10 ); 

    const intersects = raycaster2.intersectObjects( scene.children , false );
    let INTERSECTED_point;
    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED_point = intersects[ 0 ].point
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

    }

    if (INTERSECTED)
    {
        const vec3 = new THREE.Vector3(INTERSECTED.position.x, 0, INTERSECTED.position.z)
        mousePos.copy(vec3);
        console.log("walls raycast hit")
        
        cursor.position.set(INTERSECTED_point.x, INTERSECTED_point.y, INTERSECTED_point.z);
    }

    if(currently_selected)
    {
        //currently_selected.position.set(cursor.position.x, 0, cursor.position.z)
        //currently_selected.position.copy(mousePos)
    }
}

function raycast_objects()
{
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objList, false );

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
}

function onClick()
{    
    if (currently_holding)
    {
        currently_holding = null;
        return;
    }

    if (INTERSECTED)
    {
        currently_holding = INTERSECTED;
        currently_selected = INTERSECTED        
        console.log(currently_selected)
    }
    else
    {
        currently_selected = null
    }
}

function onMouseUp(){currently_selected = null; console.log("released")} 


window.addEventListener( 'resize', onWindowResize );

document.addEventListener( 'mousemove', onPointerMove );
document.addEventListener( 'click' , onClick);
document.addEventListener( 'mouseup', onMouseUp);

function render() 
{
    renderer.render(scene, camera);
}

function animate()
{   
    requestAnimationFrame(animate)
    
    raycast_walls()
    raycast_objects()    
    render()

}

if (WebGL.isWebGLAvailable()) {
    animate()
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

