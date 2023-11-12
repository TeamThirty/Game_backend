import * as THREE from 'three';
import { sceneObject } from './sceneObject';
export {immovable_object}


class immovable_object extends sceneObject 
{
    constructor(geometry : THREE.BufferGeometry, material : THREE.Material)
    {        
        super(geometry, material);
        this.layers.set(10);
    }
}