// is using one static loader good idea? 
import * as THREE from 'three';
import { movable_object } from "./movable_object";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

export { gltfLoader }


function findType(object, type, list) {
    object.children.forEach((child) => {
        if (child.type === type) {
            list.push(child)
        }
        findType(child, type, list);
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
                let list = new Array()
                findType(gltf.scene, 'Mesh', list)
                console.log(list)
                let group = new THREE.Group()
                list.forEach(element => {
                    const mesh = new movable_object(element.geometry, element.material)                                    
                    mesh.name = 'gltf_child'
                    group.add(mesh)                                        
                });

                group.position.set(position.x, position.y, position.z)
                group.rotation.set(rotation.x, rotation.y, rotation.z);
                //thosrotation.applyEuler(rotation);
                group.scale.set(scale.x, scale.y, scale.z);

                group.castShadow = true;
                group.receiveShadow = true;

                group.name = 'gltf_parent'
                group.layers.set(1)
                scene.add(group)
            });
    }
}