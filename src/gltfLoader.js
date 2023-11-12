// is using one static loader good idea? 
import * as THREE from 'three';
import { movable_object } from "./movable_object";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export { gltfLoader }


function findType(object, type, list, depth) {
    object.children.forEach((child) => {
        if (child.type === type) {
            child.name = 'gltf_child'
            child.layers.set(1)
            //list.push(child)            
        }
        findType(child, type, list, depth+1);
    });
}

class gltfLoader
{
    load(scene, path,
        position = new THREE.Vector3(0,0,0),
        rotation = new THREE.Vector3(0,0,0),
        scale = new THREE.Vector3(1,1,1))
    {
        const loader = new GLTFLoader();
				
        loader.load(path,
            function (gltf) 
            {       
                let mesh = gltf.scene
                mesh.name = 'gltf_parent'
                let list = new Array()
                findType(gltf.scene, 'Mesh', list, 0)
                mesh.position.set(position.x, position.y, position.z)
                mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                //thosrotation.applyEuler(rotation);
                mesh.scale.set(scale.x, scale.y, scale.z);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                mesh.name = 'gltf_parent'
                mesh.layers.set(1)
                scene.add(mesh)
            });
    }
}