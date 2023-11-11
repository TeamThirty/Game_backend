import * as THREE from 'three';

import {wall} from './wall'
import {floor} from './floor'
import {ceiling} from './ceiling'

export {room_box}

class room
{
    walls : Array<wall>;
    ceiling : ceiling;
    floor : floor;
}

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
        this.walls = new Array<wall>;
        current_wall = new wall(scene, depth, height, wall_thickness);
        current_wall.mesh.position.set(-t/2, h/2, d/2);
        current_wall.mesh.rotation.set(0, -Math.PI / 2, 0);
        current_wall.mesh.visible = false;       
        this.walls.push(current_wall);

        //left wall
        current_wall = new wall(scene, depth, height, wall_thickness);
        current_wall.mesh.position.set(t/2+w, h/2, d/2);
        current_wall.mesh.rotation.set(0, -Math.PI / 2, 0);
        this.walls.push(current_wall);
        
        //near wall        
        current_wall = new wall(scene, width + 2 * wall_thickness, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, -t/2);
        current_wall.mesh.rotation.set(0, 0, 0); 
        current_wall.mesh.visible = false;       
        this.walls.push(current_wall);
        
        //far wall        
        current_wall = new wall(scene, width + 2 * wall_thickness, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, d+t/2);
        current_wall.mesh.rotation.set(0, 0, 0);
        this.walls.push(current_wall);
        
        this.ceiling = new ceiling(scene, width+2*wall_thickness, depth+2*wall_thickness, wall_thickness);
        this.ceiling.mesh.position.set(w/2, h+t/2, d/2);
        this.ceiling.mesh.visible = false;
        
        this.floor = new floor(scene, width+2*wall_thickness, depth+2*wall_thickness, wall_thickness);
        this.floor.mesh.position.set(w/2, -t/2, d/2);        
    }
}

class room_complex extends room
{
    constructor() 
    {
        super();
    }
}