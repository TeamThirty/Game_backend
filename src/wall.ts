import * as THREE from 'three';
import {immovable_object} from './immovable_object'
export {wall}

class wall extends immovable_object
{
    constructor(length : number, height : number, thickness : number)
    {
        const geometry = new THREE.BoxGeometry( length, thickness, height ); 
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const box = new THREE.Mesh( geometry, material ); 
        super(box);        
    }
}