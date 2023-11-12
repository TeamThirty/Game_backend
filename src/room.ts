import * as THREE from 'three';

import {wall} from './wall'
import {floor} from './floor'
import {ceiling} from './ceiling'
import { immovable_object } from './immovable_object';

export {room_box}

class room
{
    walls : Array<THREE.Mesh>;
    ceiling : ceiling;
    floor : floor;
}

let walls_layer = 10;

class room_box extends room
{
    constructor(scene : THREE.Scene, width : number, depth : number, height : number, wall_thickness : number = 1)
    {
        super();

        const w = width;
        const h = height;
        const d = depth;
        const t = wall_thickness;
        
        let current_wall : wall;
         
        //right wall
        current_wall = new wall(scene, depth, height, wall_thickness);
        current_wall.mesh.position.set(-t/2, h/2, d/2);
        current_wall.mesh.rotation.set(0, -Math.PI / 2, 0);
        current_wall.mesh.visible = false;       
        current_wall.mesh.layers.set(walls_layer);

        //left wall
        current_wall = new wall(scene, depth, height, wall_thickness);
        current_wall.mesh.position.set(t/2+w, h/2, d/2);
        current_wall.mesh.rotation.set(0, -Math.PI / 2, 0);
        current_wall.mesh.layers.set(walls_layer);
        
        //near wall        
        current_wall = new wall(scene, width + 2 * wall_thickness, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, -t/2);
        current_wall.mesh.rotation.set(0, 0, 0); 
        current_wall.mesh.visible = false;       
        current_wall.mesh.layers.set(walls_layer);
        
        //far wall        
        current_wall = new wall(scene, width + 2 * wall_thickness, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, d+t/2);
        current_wall.mesh.rotation.set(0, 0, 0);
        current_wall.mesh.layers.set(walls_layer);
        
        this.ceiling = new ceiling(scene, width+2*wall_thickness, depth+2*wall_thickness, wall_thickness);
        this.ceiling.mesh.position.set(w/2, h+t/2, d/2);
        this.ceiling.mesh.visible = false;
        this.ceiling.mesh.layers.set(walls_layer);
        
        this.floor = new floor(scene, width+2*wall_thickness, depth+2*wall_thickness, wall_thickness);
        this.floor.mesh.position.set(w/2, -t/2, d/2);        
        this.floor.mesh.layers.set(walls_layer);        
    }
}

class room_complex extends room
{
    constructor() 
    {
        super();
    }
}