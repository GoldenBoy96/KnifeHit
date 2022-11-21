
import { _decorator, Component, Node, EventKeyboard, KeyCode, director, systemEvent, SystemEventType } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('PlayAgainController')
export class PlayAgainController extends Component {

    private cooldown;

    start () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        this.cooldown = 60;
    }

    update() {
        if(this.cooldown > 0) {
            this.cooldown --;
        }
        
    }


    onKeyDown(event: EventKeyboard) {
        if (this.cooldown == 0) {
            switch (event.keyCode) {
                case KeyCode.SPACE:
                    director.loadScene("main");
    
            }
        }
        
    }
}


