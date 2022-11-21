
import { _decorator, Component, Node, EventKeyboard, systemEvent, SystemEventType, Vec3, sys, KeyCode } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('KnifeBaseEffect')
export class KnifeBaseEffect extends Component {

    private cooldown;
    private effect;
    private gameStatus;

    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        this.cooldown = 10;
        this.effect = 0;
        this.gameStatus = JSON.parse(sys.localStorage.getItem("gameStatus"));
    }

    update() {
        this.gameStatus = JSON.parse(sys.localStorage.getItem("gameStatus"));
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (this.effect > 0) {
            this.effect--;
        }
        if (this.effect == 0) {
            this.node.position = new Vec3(0, -150, 0);
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                if (this.cooldown == 0 && this.gameStatus != 0) {
                    this.node.position = new Vec3(0, -10000, 0);
                    // this.node.position = new Vec3(0, -1000, 0);
                    this.cooldown = 10;
                    this.effect = 9;
                }
                break;
        }

    }


}


