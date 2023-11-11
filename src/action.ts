import * as THREE from 'three';

type vec3 = THREE.Vector3;
type material = THREE.Material;

class action{}

class actionChangeMaterial extends action
{
    new_material : material;
}

class actionMove extends action
{
    new_pos : vec3;
}

class actionRotate extends action
{
    new_rotation_euler : vec3;
}

class actionAnimate extends action
{
    new_state : boolean;
}