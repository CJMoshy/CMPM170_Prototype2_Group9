import Phaser from 'phaser';
export default class Loader extends Phaser.Scene {
	constructor() {
		super({ key: 'loaderScene' });
	}
	preload() {
		// image
		this.load.image('cursed_dog', '../../assets/img/Cursed_Dog.png');

		// audio
		this.load.audio('abyss', '../../assets/audio/abyss.wav');
		this.load.audio('click', '../../assets/audio/click.wav');

		this.load.image('player', '../../assets/img/blue_townie.png');
		this.load.image('bones', '../../assets/img/bonepile.png');
		this.load.image('stash', '../../assets/img/stash.png');
		this.load.bitmapFont(
			'rocketSquare',
			'../../assets/font/KRS/KennyRocketSquare_0.png',
			'../../assets/font/KRS/KennyRocketSquare.fnt',
		);
	}
	create() {
		this.scene.start('menuScene');
	}
}
