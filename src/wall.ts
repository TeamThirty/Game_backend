import * as THREE from 'three';
import {immovable_object} from './immovable_object'
export {wall}

class wall extends immovable_object
{
    constructor(scene : THREE.Scene, length : number, height : number, thickness : number)
    {
        const geometry = new THREE.BoxGeometry( length, height , thickness); 
        const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
        const box = new THREE.Mesh( geometry, material ); 
        super(scene, box);        
    }
}