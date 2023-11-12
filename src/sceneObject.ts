import * as THREE from 'three';

export {sceneObject}

class sceneObject extends THREE.Mesh
{
    constructor(geometry : THREE.BufferGeometry, material : THREE.Material)
    {
        super(geometry, material);
        this.geometry.computeBoundingBox();
        this.collider = this.geometry.boundingBox; // local coorinates, to transoform to world use .applyMatrix4( mesh.matrixWorld )
    }
    collider : THREE.Box3 | null;
}
