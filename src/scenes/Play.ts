import Phaser from "phaser";

export default class Play extends Phaser.Scene {
    private up: Phaser.Input.Keyboard.Key;
    private left: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private dog: any;
    constructor() {
        super({key: 'playScene'});
    }

    preload() {
    }

    init() {
        
    }


    create() {
        const {width, height} = this.game.config
        this.dog = this.physics.add.sprite(width as number / 2 , height as number / 2, "player").setOrigin(0.5);
        const bones = this.physics.add.sprite((width as number / 2) + 200 , height as number / 2, "bones").setOrigin(0.5);

        this.up = this.input.keyboard?.addKey('W') as Phaser.Input.Keyboard.Key;
        this.left = this.input.keyboard?.addKey('A') as Phaser.Input.Keyboard.Key;
        this.down = this.input.keyboard?.addKey('S') as Phaser.Input.Keyboard.Key;
        this.right = this.input.keyboard?.addKey('D') as Phaser.Input.Keyboard.Key;


        /**
         * 
         * 
         * 
         * this.physics.add.collider(bones, player, ()=> {
         * 
         * })
         */
    }

    update() {
        this.dog.setVelocityY(0);
        this.dog.setVelocityX(0);
        if(this.up.isDown){
            this.dog.setVelocityY(-100);
        }
        if(this.left.isDown){
            this.dog.setVelocityX(-100);
        }
        if(this.down.isDown){
            this.dog.setVelocityY(100);
        }
        if(this.right.isDown){
            this.dog.setVelocityX(100);
        }
    }

    

}
