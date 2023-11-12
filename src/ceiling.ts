import * as THREE from 'three';
import {immovable_object} from './immovable_object'
export {ceiling}

class ceiling extends immovable_object
{
    constructor(width : number, depth : number, thickness : number, material : THREE.Material)
    {
        const geometry = new THREE.BoxGeometry( width, thickness, depth ); 
        if (material==null)
        {
            material = new THREE.MeshPhongMaterial( {color: 0x00ff00 } );         
        }        
        super(geometry, material);
        this.castShadow = false;
        this.receiveShadow = true;
    }
}