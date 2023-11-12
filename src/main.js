import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { room_box } from './room'

import { MySTLLoader } from './stlObject.js';


const scene = new THREE.Scene();

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

let  cursor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshBasicMaterial( {color : 0xffffff}))
scene.add(cursor)
camera.layers.enableAll()

loader.load(scene,
    './models/fox.stl',
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.03, 0.03, 0.03))

loader.load(scene,
    './models/Cute_triceratops.stl',
    new THREE.Vector3(5,1,0),
    new THREE.Vector3(-Math.PI/2, 0, 0),
    new THREE.Vector3(0.01, 0.01, 0.01))
    
loader.load(scene,
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
    raycaster2.layers.set(10)

    const intersects = raycaster2.intersectObjects( scene.children, false );
    

    if ( intersects.length > 0 ) 
    {
        //we detected some number of hits
        let hit = intersects[ 0 ];
        cursor.position.set(hit.point.x, hit.point.y, hit.point.z);
        if ( INTERSECTED_WALL != hit.object ) 
        {
            //we hit the same wall            
            if ( INTERSECTED_WALL ) INTERSECTED_WALL.material.emissive.setHex( INTERSECTED_WALL.currentHex );

            INTERSECTED_WALL = hit.object;
            INTERSECTED_WALL.currentHex = INTERSECTED_WALL.material.emissive.getHex();
            INTERSECTED_WALL.material.emissive.setHex( 0xffff00 );
        }

    }
    else 
    {
        //we were hitting it before but now object hit changed, need to get back our original color
        if ( INTERSECTED_WALL ) INTERSECTED_WALL.material.emissive.setHex( INTERSECTED_WALL.currentHex );
        INTERSECTED_WALL = null;
    }
}

function raycast_objects()
{
    raycaster.setFromCamera( pointer, camera );
    raycaster.layers.set(1)
    const intersects = raycaster.intersectObjects( scene.children, false );    
    
    if ( intersects.length > 0 ) 
    {
        let hit = intersects[ 0 ];    
        if ( INTERSECTED != hit.object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = hit.object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

    }
}

var action = 0;

function onClick()
{        

    if (currently_holding)
    {
        currently_holding = null;        
        action = (1+action)%2;
        console.log(action)
        return;
    }

    if (INTERSECTED)
    {
        currently_holding = INTERSECTED;
        console.log(currently_holding)
    }
}

function onMouseUp()
{

} 
let frame = 0;

let arrow;


function update()
{
     // 1 is move, 2 is rotate
    if (currently_holding)
    {
        frame+=1
        const grounded_cursor_position = new THREE.Vector3(cursor.position.x, 0, cursor.position.z);
        
        if (action == 0)
        {   
            currently_holding.position.copy(grounded_cursor_position)
        }
        
        if (action == 1)
        {
            rotateAt(currently_holding, grounded_cursor_position);
        }
        
    }
}

function rotateAt(obj, at)
{
    let dir = new THREE.Vector3().copy(at)
    dir.sub(obj.position)
    const angle = dir.angleTo(new THREE.Vector3(1,0,0)) * (dir.z < 0? 1 : -1);
    obj.rotation.z = angle+Math.PI/2;
    return
}

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
    if (!currently_holding) raycast_objects()

    update()
    render()

}

if (WebGL.isWebGLAvailable()) {
    animate()
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

