// is using one static loader good idea? 
import * as THREE from 'three';
import { movable_object } from "./movable_object";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

export { stlLoader }

class stlLoader
{
    load(scene, path,
        position = new THREE.Vector3(0,0,0),
        rotation = new THREE.Vector3(0,0,0),
        scale = new THREE.Vector3(1,1,1),
        material = new THREE.MeshPhongMaterial({ color: 0xff9c7c, specular: 0x494949, shininess: 200 }))
    {
        const loader = new STLLoader();
				
        loader.load(path,
            function (geometry) 
            {

                const mesh = new movable_object(geometry, material)

                mesh.position.set(position.x, position.y, position.z)
                mesh.rotation.set(rotation.x, rotation.y, rotation.z);
                //thosrotation.applyEuler(rotation);
                mesh.scale.set(scale.x, scale.y, scale.z);

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                scene.add(mesh)
            });
    }
}