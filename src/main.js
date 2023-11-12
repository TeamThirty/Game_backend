import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { room_box } from './room'

import { stlLoader } from './stlLoader.js';
import { gltfLoader } from './gltfLoader.js';

const scene = new THREE.Scene();

const stl_loader = new stlLoader();
const gltf_Loader = new gltfLoader();

let room = new room_box(scene, 15, 20 ,10);

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

function init()
{

    gltf_Loader.load(scene,
        './models/carpet/scene.gltf',
        new THREE.Vector3(5,1,5),
        new THREE.Vector3(0, Math.PI, 0),
        new THREE.Vector3(0.01, 0.01, 0.01));

    gltf_Loader.load(scene,
        './models/drawer/scene.gltf',
        new THREE.Vector3(5, 4, 5),
        new THREE.Vector3(0, Math.PI, 0),
        new THREE.Vector3(0.01, 0.01, 0.01));
    
    stl_loader.load(scene,
        './models/fox.stl',
        new THREE.Vector3(0,1,0),
        new THREE.Vector3(-Math.PI/2, 0, 0),
        new THREE.Vector3(0.03, 0.03, 0.03));
    
    
    stl_loader.load(scene,
        './models/Cute_triceratops.stl',
        new THREE.Vector3(5,1,0),
        new THREE.Vector3(-Math.PI/2, 0, 0),
        new THREE.Vector3(0.01, 0.01, 0.01));
        
    stl_loader.load(scene,
        './models/chair.stl',
        new THREE.Vector3(2,1,0),
        new THREE.Vector3(-Math.PI/2, 0, 0),
        new THREE.Vector3(0.01, 0.01, 0.01));
}


init()


const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
document.body.appendChild(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();

//ambient light
const light = new THREE.AmbientLight(0x808080); // soft white light
scene.add(light);
scene.background = new THREE.Color(0x72645b);

//directional light
const color = 0xFFFFFF;
const intensity = 50;
const light_point = new THREE.PointLight(color, intensity);

light_point.position.set(10, 2, 10);
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

let currently_holding = false;

let raycaster_objects;
let raycaster_walls;

let INTERSECTED;
let INTERSECTED_WALL;

raycaster_objects = new THREE.Raycaster();
raycaster_walls = new THREE.Raycaster();

function raycast_walls()
{
    raycaster_walls.setFromCamera( pointer, camera );
    raycaster_walls.layers.set(10)

    const intersects = raycaster_walls.intersectObjects( scene.children, false );
    

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
            INTERSECTED_WALL.material.emissive.setHex( 0x505000 );
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
    raycaster_objects.setFromCamera( pointer, camera );
    raycaster_objects.layers.set(1)
    const intersects = raycaster_objects.intersectObjects( scene.children, true );    

    if ( intersects.length > 0 ) 
    {
        let hit = intersects[ 0 ];
        let hit_obj = hit.object
        
        if ( INTERSECTED != hit_obj ) 
        {

            //console.log("HIT!")
            if (hit_obj.name == "gltf_child")
            {
                while (hit_obj.parent && hit_obj.name != 'gltf_parent')
                {
                    hit_obj = hit_obj.parent
                }
                INTERSECTED = hit_obj

                // INTERSECTED.children.forEach(element => {
                //     element.material.emissive.setHex( element.currentHex );                    
                //     element.currentHex = element.material.emissive.getHex();
                //     element.material.emissive.setHex( 0xff0000 );                    
                // });
            }
            else
            {
                //console.log('obj')
                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                INTERSECTED = hit_obj
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
        }

    } else {

        if ( INTERSECTED) 
        {
            if (INTERSECTED.name != 'gltf_parent') { INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex )}
            // else 
            // {
            //     INTERSECTED.children.forEach(element => {element.material.emissive.setHex( INTERSECTED.currentHex )});
            // }

        }
        
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

function update()
{
     // 0 is move, 1 is rotate
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
    obj.rotation.y = angle-Math.PI/2;
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

if (WebGL.isWebGLAvailable()) 
{
    animate()
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

