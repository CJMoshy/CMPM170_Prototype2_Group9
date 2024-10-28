import Phaser from 'phaser';
import cursed_dog from '../../assets/img/Cursed_Dog.png';
import abyss from '../../assets/audio/abyss.wav';
import click from '../../assets/audio/click.wav';

import player from '../../assets/img/blue_townie.png';
import bones from '../../assets/img/bonepile.png';
import stash from '../../assets/img/stash.png';

// import KRSP from '../../assets/font/KRS/KennyRocketSquare_0.png';
// import KRSF from '../../assets/font/KRS/KennyRocketSquare.fnt';

export default class Loader extends Phaser.Scene {
	constructor() {
		super({ key: 'loaderScene' });
	}
	preload() {
		// image
		this.load.image('cursed_dog', cursed_dog);

		// audio
		this.load.audio('abyss', abyss);
		this.load.audio('click', click);

		this.load.image('player', player);
		this.load.image('bones', bones);
		this.load.image('stash', stash);
		// this.load.bitmapFont(
		// 	'rocketSquare',
		// 	KRSP,
		// 	KRSF,
		// );
	}
	create() {
		this.scene.start('menuScene');
	}
}
