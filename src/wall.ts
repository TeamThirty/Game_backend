import * as THREE from 'three';
import {immovable_object} from './immovable_object'
export {wall}

class wall extends immovable_object
{
    constructor(length : number, height : number, thickness : number, material : THREE.Material)
    {
        const geometry = new THREE.BoxGeometry( length, height , thickness); 
        if (material==null)
        {
            material = new THREE.MeshPhongMaterial( {color: 0x00ff00 } );         
        }        
        super(geometry, material);
        this.castShadow = false;
        this.receiveShadow = true;
    }
}