import Phaser from 'phaser';
import cursed_dog from '../../assets/img/Cursed_Dog.png';
import abyss from '../../assets/audio/abyss.wav';
import click from '../../assets/audio/click.wav';
import player from '../../assets/img/Necrodog.png';
import bones from '../../assets/img/bonepile.png';
import stash from '../../assets/img/stash.png';
import bloodMoonPNG from '../../assets/font/BloodMoon/BloodMoon.png';
import bloodMoonXML from '../../assets/font/BloodMoon/BloodMoon.xml';
import boneFontPNG from '../../assets/font/Bone/bone.png';
import boneFontXML from '../../assets/font/Bone/bone.xml';

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

		// fonts
		this.load.bitmapFont(
			'bone',
			boneFontPNG,
			boneFontXML,
		);
		this.load.bitmapFont(
			'necro',
			bloodMoonPNG,
			bloodMoonXML,
		);
	}
	create() {
		this.scene.start('menuScene');
	}
}
