import * as THREE from 'three';
import { sceneObject } from './sceneObject';
export {movable_object}

class movable_object extends sceneObject
{
    constructor(geometry : THREE.BufferGeometry, material : THREE.Material)
    {        
        super(geometry, material);
        this.layers.set(1);
    }
}