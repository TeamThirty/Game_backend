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
        super();
        let current_wall : wall;
        this.walls.push(new wall(0,0,0)) //left wall
        this.walls.push() //right wall
        
        //far wall        
        this.walls.push(new wall(width + 2 * wall_thickness, 0,0)) 
        //near wall        
        current_wall = new wall(width + 2 * wall_thickness, 0,0);
        current_wall.mesh.position.set();

        this.walls.push()

        this.floor = new floor({});

        //this.ceiling = new ceiling();
        
    }
}

class room_complex extends room
{
    constructor() 
    {
        super();
    }
}