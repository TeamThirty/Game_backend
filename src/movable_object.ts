import * as THREE from 'three';
import { sceneObject } from './sceneObject';
export {movable_object}

class movable_object extends sceneObject
{
    constructor(scene : THREE.Scene, mesh : THREE.Mesh)
    {
        mesh.layers.set(1);
        super(scene, mesh);
    }
}