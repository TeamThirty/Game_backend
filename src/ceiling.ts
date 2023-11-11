import * as THREE from 'three';
import {immovable_object} from './immovable_object'
export {ceiling}

class ceiling extends immovable_object
{
    constructor(width : number, depth : number, thickness : number)
    {
        const geometry = new THREE.BoxGeometry( width, thickness, depth ); 
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const box = new THREE.Mesh( geometry, material ); 
        super(box);        
    }
}