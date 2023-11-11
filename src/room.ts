import * as THREE from 'three';

import {wall} from './wall'
import {floor} from './floor'
import {ceiling} from './ceiling'


class room
{
    walls : Array<wall>;
    ceiling : ceiling;
    floor : floor;
}

class room_box extends room
{
    constructor(width : number, depth : number, height : number, wall_thickness : number = 3)
    {
        const w = width;
        const h = height;
        const d = depth;
        const t = wall_thickness;

        super();
        let current_wall : wall;
         
        //left wall
        current_wall = new wall(depth, height, wall_thickness);
        current_wall.mesh.position.set(-t/2, h/2, d/2);
        current_wall.mesh.rotation.set(0, Math.PI / 2, 0);
        this.walls.push(current_wall);

        //right wall
        current_wall = new wall(depth, height, wall_thickness);
        current_wall.mesh.position.set(t/2+2, h/2, d/2);
        current_wall.mesh.rotation.set(0, -Math.PI / 2, 0);
        this.walls.push(current_wall);
        
        //near wall        
        current_wall = new wall(width, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, -t/2);
        current_wall.mesh.rotation.set(0, 0, 0);
        this.walls.push(current_wall);
        
        //far wall        
        current_wall = new wall(width, height, wall_thickness);
        current_wall.mesh.position.set(w/2, h/2, d+t/2);
        current_wall.mesh.rotation.set(0, 0, 0);
        this.walls.push(current_wall);

        
        this.ceiling = new ceiling(width, depth, wall_thickness);
        this.ceiling.mesh.position.set(w/2, h+t/2, d/2);
        
        this.floor = new ceiling(width, depth, wall_thickness);
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