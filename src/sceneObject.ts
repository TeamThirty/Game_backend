import * as THREE from 'three';

export {sceneObject}

class sceneObject
{
    constructor(mesh : THREE.Mesh)
    {
        this.mesh = mesh;
        mesh.geometry.computeBoundingBox();
        this.collider = mesh.geometry.boundingBox; // local coorinates, to transoform to world use .applyMatrix4( mesh.matrixWorld )
        this.id = sceneObject.nextId;
        sceneObject.nextId = sceneObject.nextId + 1;
    }

    id : number;
    mesh : THREE.Mesh;
    collider : THREE.Box3;
    
    private static nextId = 0;
}
