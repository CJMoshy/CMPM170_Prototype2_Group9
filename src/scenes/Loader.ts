import Phaser from 'phaser';
export default class Loader extends Phaser.Scene {
	constructor() {
		super({ key: 'loaderScene' });
	}
	preload() {
		this.load.image('cursed_dog', '../../assets/img/Cursed_Dog.png');

		this.load.audio('abyss', '../../assets/audio/abyss.wav');
	}
	create() {
		this.scene.start('menuScene');
	}
}
