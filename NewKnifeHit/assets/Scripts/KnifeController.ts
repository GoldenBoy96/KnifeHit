
import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType, EventKeyboard, instantiate, macro, Vec3, KeyCode, systemEvent, SystemEventType, director, sys, Prefab, RichText, } from 'cc';
import { WoodController } from './WoodController';
const { ccclass, property } = _decorator;



@ccclass('KnifeController')
export class KnifeController extends Component {

    private newRotation: Vec3
    private status;
    private speed;
    private y;

    @property({ type: Prefab })
    public playAgainPrefab: Prefab | null = null;

    

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        
            console.log('onBeginContact');
            sys.localStorage.setItem("gameStatus", JSON.stringify(0));
       
    }

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        this.newRotation = new Vec3(0, 0, 0);
        this.speed = JSON.parse(sys.localStorage.getItem("speed"));

        this.status = 1;

        this.y=this.node.position.y;


    }

    
    update(deltaTime: number) {
        this.speed = JSON.parse(sys.localStorage.getItem("speed"));
        if (this.status == 1) {
            if (this.y <= 150) {
                var newPosition = new Vec3(0, this.y, 0);
                this.node.position = newPosition;
                this.y += 25;
            } else {
                this.y = 0;
                this.status = 2;
            }

        }
        if (this.status == 2) {
            this.newRotation.z += this.speed;

            // this.node.eulerAngles = newRotation;
            this.node.setRotationFromEuler(this.newRotation);
        }

    }


    


}


