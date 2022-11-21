
import { _decorator, Component, Node, EventKeyboard, KeyCode, Vec3, Prefab, systemEvent, SystemEventType, instantiate, sys, randomRangeInt, RichText, Label } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('PlayerController')
export class PlayerController extends Component {
    private cooldown;
    private time;
    private gameStatus;
    private numberOfKnife;
    private endGame;
    private gameStart;
    private result;
    private timeCooldown;
    private checkEndGame;

    @property({ type: Prefab })
    public knifePrefab: Prefab | null = null;
    speed: any;
    @property({ type: Prefab })
    public playAgainPrefab: Prefab | null = null;
    @property({ type: Prefab })
    public starPrefab: Prefab | null = null;

    @property({ type: RichText })
    public knifeNumber: RichText | null = null;
    @property({ type: RichText })
    public timeLeftRichText: RichText | null = null;
    @property({ type: Label })
    public resultLabel: Label | null = null;



    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        sys.localStorage.setItem("speed", JSON.stringify(3));

        this.cooldown = 0;
        this.time = 10;
        this.timeLeftRichText.string = `<color=#ffffff>Time left: ${this.time}</color>`;

        sys.localStorage.setItem("gameStatus", JSON.stringify(1));

        this.numberOfKnife = randomRangeInt(5, 11);

        this.endGame = false;
        this.checkEndGame = false;
        this.gameStart = false;
        this.timeCooldown = 60;

    }


    update(deltaTime: number) {
        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (this.cooldown == 0) {
            this.checkendGame();
        }

        this.knifeNumber.string = `<color=#ffffff>${this.numberOfKnife}🔪</color>`;

        if (this.timeCooldown > 0) {
            this.timeCooldown--;
        }
        if (this.gameStart && this.time >= 0 && this.timeCooldown == 0 && !this.endGame) {
            this.time--;
            this.timeLeftRichText.string = `<color=#ffffff>Time left: ${this.time}</color>`;

            this.timeCooldown = 60;
        }
        if (this.time == 0) {
            sys.localStorage.setItem("speed", JSON.stringify(0));

        }
    }


    onKeyDown(event: EventKeyboard) {
        this.gameStart = true;
        this.gameStatus = JSON.parse(sys.localStorage.getItem("gameStatus"));
        if (this.gameStatus == 1 && this.numberOfKnife > 0) {
            switch (event.keyCode) {
                case KeyCode.SPACE:
                    if (this.cooldown == 0) {
                        let knife = instantiate(this.knifePrefab);
                        knife.setParent(this.node.parent);
                        knife.position = new Vec3(0, -200, 0);
                        console.log(knife.position)
                        this.cooldown = 10;
                        this.numberOfKnife--;
                        break;
                    }

            }
        }



    }

    checkendGame() {
        if (!this.endGame) {
            this.gameStatus = JSON.parse(sys.localStorage.getItem("gameStatus"));

            if (this.numberOfKnife == 0 && this.gameStatus != 0) {
                if (this.gameStatus == 1) {
                    let playAgain = instantiate(this.playAgainPrefab);
                    playAgain.position = new Vec3(0, 0, 0);
                    playAgain.parent = this.node.parent.parent;
                    this.endGame = true;
                    this.result = "Victory";
                    sys.localStorage.setItem("speed", JSON.stringify(0));

                    sys.localStorage.setItem("gameStatus", JSON.stringify(0));
                }
            }
            if (this.gameStatus == 0) {
                sys.localStorage.setItem("speed", JSON.stringify(0));

                let playAgain = instantiate(this.playAgainPrefab);
                playAgain.position = new Vec3(0, 0, 0);
                playAgain.parent = this.node.parent.parent;
                this.endGame = true;
                this.result = "Loss";

                sys.localStorage.setItem("gameStatus", JSON.stringify(0));
            }
        }

        if (this.endGame && !this.checkEndGame) {
            this.checkEndGame = true;
            this.resultLabel.string = `${this.result}`;
            this.resultLabel.node.position = new Vec3(0, 150, 0);


            console.log(this.time);
            if (this.result == 'Victory') {
                if (this.time > 0) {
                    let star1 = instantiate(this.starPrefab);
                    star1.position = new Vec3(-100, -180, 0);
                    star1.parent = this.node.parent.parent;
                }
                if (this.time >= 2) {
                    let star2 = instantiate(this.starPrefab);
                    star2.position = new Vec3(0, -180, 0);
                    star2.parent = this.node.parent.parent;
                }
                if (this.time >= 5) {
                    let star3 = instantiate(this.starPrefab);
                    star3.position = new Vec3(100, -180, 0);
                    star3.parent = this.node.parent.parent;
                }
            }


        }




    }



}

