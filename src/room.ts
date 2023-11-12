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
    constructor(scene : THREE.Scene, width : number, depth : number, height : number, wall_thickness : number = 1, materials)
    {
        super();

        const w = width;
        const h = height;
        const d = depth;
        const t = wall_thickness;
        
        let current_wall : wall;
         
        //right wall
        current_wall = new wall(depth, height, wall_thickness, materials['wall']);
        scene.add(current_wall)
        current_wall.position.set(-t/2, h/2, d/2);
        current_wall.rotation.set(0, -Math.PI / 2, 0);
        current_wall.visible = false;       
        current_wall.layers.set(walls_layer);

        //left wall
        current_wall = new wall(depth, height, wall_thickness, materials['wall']);
        scene.add(current_wall)
        current_wall.position.set(t/2+w, h/2, d/2);
        current_wall.rotation.set(0, -Math.PI / 2, 0);        

        //near wall   
        current_wall = new  wall(width + 2 * wall_thickness, height, wall_thickness, materials['wall']);
        scene.add(current_wall)
        current_wall.position.set(w/2, h/2, -t/2);
        current_wall.rotation.set(0, 0, 0); 
        current_wall.visible = false;       
        
        //far wall        
        current_wall = new wall(width + 2 * wall_thickness, height, wall_thickness, materials['wall']);
        scene.add(current_wall)
        current_wall.position.set(w/2, h/2, d+t/2);
        current_wall.rotation.set(0, 0, 0);
        current_wall.layers.set(walls_layer);
        
        this.ceiling = new ceiling(width+2*wall_thickness, depth+2*wall_thickness, wall_thickness, materials['ceiling']);
        scene.add(this.ceiling)
        this.ceiling.position.set(w/2, h+t/2, d/2);
        this.ceiling.visible = false;
        this.ceiling.layers.set(walls_layer);
        
        this.floor = new floor(width+2*wall_thickness, depth+2*wall_thickness, wall_thickness, materials['floor']);
        scene.add(this.floor)
        this.floor.position.set(w/2, -t/2, d/2);        
        this.floor.layers.set(walls_layer);        
    }
}

class room_complex extends room
{
    constructor() 
    {
        super();
    }
}