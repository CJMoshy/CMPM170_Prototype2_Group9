import Phaser from "phaser";

export default class Play extends Phaser.Scene {
    private up: Phaser.Input.Keyboard.Key;
    private left: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private dog: any;
    private bones: any;
    private stash: any;
    private boneCount: number;
    private stashCount: number;
    private boneBuffer: number;
    private boneCountText: any;
    private stashCountText: any;
    constructor() {
        super({key: 'playScene'});
    }

    preload() {
    }

    init() {
        
    }


    create() {
        this.boneCount = 0;
        this.stashCount = 0;
        this.boneBuffer = 0;
        const {width, height} = this.game.config
        this.bones = this.physics.add.sprite((width as number / 2) + 400 , height as number / 2, "bones").setOrigin(0.5);
        this.bones.setScale(0.25);
        this.stash = this.physics.add.sprite((width as number / 2) - 400 , height as number / 2, "stash").setOrigin(0.5);
        this.stash.setScale(0.5);
        this.dog = this.physics.add.sprite(width as number / 2 , height as number / 2, "player").setOrigin(0.5);
        this.dog.setScale(4);

        this.up = this.input.keyboard?.addKey('W') as Phaser.Input.Keyboard.Key;
        this.left = this.input.keyboard?.addKey('A') as Phaser.Input.Keyboard.Key;
        this.down = this.input.keyboard?.addKey('S') as Phaser.Input.Keyboard.Key;
        this.right = this.input.keyboard?.addKey('D') as Phaser.Input.Keyboard.Key;


        this.boneCountText = this.add.bitmapText(this.dog.x, this.dog.y-100, 
            "rocketSquare",this.boneCount.toString(), 50, 1);

        this.stashCountText = this.add.bitmapText(this.stash.x, this.stash.y-150, 
            "rocketSquare",this.stashCount.toString(), 50, 1);

        console.log(this.boneCount.toString(), this.stashCount.toString());

        this.physics.add.overlap(this.bones, this.dog, ()=> {
            if(this.boneBuffer > 60 && this.boneCount < 3){
                this.boneCount += 1;
                this.boneBuffer = 0;
                this.boneCountText.text = this.boneCount.toString();
                console.log(this.boneCount);
            }   
        })

        this.physics.add.overlap(this.stash, this.dog, ()=> {
            this.stashCount += this.boneCount;
            this.boneCount = 0;
            this.boneCountText.text = this.boneCount.toString();
            this.stashCountText.text = this.stashCount.toString();
        })
    }

    update() {
        this.handleMovement();
        this.boneBuffer = Math.min(this.boneBuffer + 1, 62);
    }

    handleMovement(){
        this.dog.setVelocityY(0);
        this.dog.setVelocityX(0);
        if(this.up.isDown){
            this.dog.setVelocityY(-400 + (this.boneCount * 50));
        }
        if(this.left.isDown){
            this.dog.setVelocityX(-400 + (this.boneCount * 50));
        }
        if(this.down.isDown){
            this.dog.setVelocityY(400 - (this.boneCount * 50));
        }
        if(this.right.isDown){
            this.dog.setVelocityX(400 - (this.boneCount * 50));
        }
        this.boneCountText.x = this.dog.x;
        this.boneCountText.y = this.dog.y - 100;
    }


    

}
