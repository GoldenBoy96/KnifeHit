
import { _decorator, Component, Node, Vec3, Collider2D, director, IPhysics2DContact, Contact2DType, sp, sys } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('WoodController')
export class WoodController extends Component {

    private speed;


    start() {
        this.node.angle = 0;
        
    }

    update(deltaTime: number) {
        this.speed = JSON.parse(sys.localStorage.getItem("speed"));

        this.node.angle += this.speed;
    }

    

}

