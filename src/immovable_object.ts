import * as THREE from 'three';
import { sceneObject } from './sceneObject';
export {immovable_object}


class immovable_object extends sceneObject 
{
    constructor(scene : THREE.Scene, mesh : THREE.Mesh)
    {
        mesh.layers.set(10);
        super(scene, mesh);
    }
}