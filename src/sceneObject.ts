import * as THREE from 'three';

export {sceneObject}

class sceneObject extends THREE.Mesh
{
    constructor(scene : THREE.Scene, mesh : THREE.Mesh)
    {
        super();
        this.scene = scene;
        this.mesh = mesh;
        scene.add(this.mesh)
        mesh.geometry.computeBoundingBox();
        this.collider = mesh.geometry.boundingBox; // local coorinates, to transoform to world use .applyMatrix4( mesh.matrixWorld )
    }

    id : number;
    mesh : THREE.Mesh;
    collider : THREE.Box3 | null;
    scene : THREE.Scene;
    
    private static nextId = 0;
}
