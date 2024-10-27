import Phaser from "phaser";
import Play from '../scenes/Play';
export default class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath(".././assets/");

        // Load player
        this.load.image("player", "blue_townie.png");
        this.load.image("bones", "bonepile.png");
        this.load.image("stash", "stash.png");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
    }

    create() {
        this.scene.start("playScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}