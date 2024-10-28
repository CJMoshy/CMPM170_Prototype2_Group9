import Phaser from 'phaser';
import Blood_Moon_img from '../../assets/font/BloodMoon/BloodMoonPng.json' with {
	type: 'json',
};
import Blood_Moon_xml from '../../assets/font/BloodMoon/BloodMoon.json' with {
	type: 'json',
};
import custom_text from '../util/XMLText.ts';

const text_config = { fontSize: '30px', fontFamily: 'courrier' };

const enum VOLUME_TYPE {
	VOLUME_MUTED = 0,
	VOLUME_SOFT = 0.02,
	VOLUME_NORMAL = 0.1,
	VOLUME_LOUD = 1,
}

export default class Menu extends Phaser.Scene {
	constructor() {
		super({ key: 'menuScene' });
	}

	preload() {
	}

	create() {
		//spooky
		this.sound.play('abyss', { loop: true, volume: VOLUME_TYPE.VOLUME_SOFT });

		const { width, height } = this.game.config;
		console.log(width, height);
		const dog = this.add.image( // random ai generated image
			width as number / 2,
			height as number / 2,
			'cursed_dog',
		).setScale(0.25);
		this.add.text(
			width as number / 6,
			height as number / 1.5,
			'Start',
			text_config,
		).setOrigin(0.5).setScale(0.5).setInteractive().on('pointerdown', () => {
			this.sound.play('click', { volume: VOLUME_TYPE.VOLUME_SOFT }); // changel volume of ambient noise here
			this.cameras.main.fadeOut(1000, 0, 0, 0);
			this.cameras.main.once(
				Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
				() => {
					this.scene.start('playScene');
				},
			);
		});

		this.add.text(
			width as number - (width as number / 6),
			height as number / 1.5,
			'Credits',
			text_config,
		).setOrigin(0.5).setScale(0.5).setInteractive().on('pointerdown', () => {
			this.sound.play('click', { volume: VOLUME_TYPE.VOLUME_SOFT });
		});

		this.add.tween({
			targets: dog,
			alpha: { from: 1, to: 0.0 },
			ease: 'Sine.InOut',
			duration: 5000,
			repeat: -1,
			yoyo: true,
		});

		custom_text(
			this,
			'Necro Dog',
			Blood_Moon_xml.xml,
			Blood_Moon_img.png,
			width as number / 2,
			height as number / 2 - 110,
		);
	}

	/**
	 * crude xml parsing method specific to one type of font
	 * @param text
	 */
	// https://phaser.io/examples/v3.85.0/loader/base64/view/bitmap-text
	// xml string png string, x, y
	// custom_text(text: string) {
	// 	const xml = Phaser.DOM.ParseXML(atob(Blood_Moon_xml.xml));
	// 	const image = new Image();
	// 	// deno-lint-ignore no-this-alias
	// 	const _this = this;
	// 	image.onload = () => {
	// 		_this.textures.addImage('BloodMoon', image);
	// 		const data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
	// 			xml,
	// 			_this.textures.getFrame('BloodMoon'),
	// 			0,
	// 			0,
	// 		);
	// 		_this.cache.bitmapFont.add('BloodMoon', {
	// 			data: data,
	// 			texture: 'BloodMoon',
	// 			frame: null,
	// 		});
	// 		const { width, height } = this.game.config;
	// 		_this.add.bitmapText(
	// 			width as number / 2,
	// 			height as number / 2 - 110,
	// 			'BloodMoon',
	// 			text,
	// 		).setOrigin(0.5).setScale(0.5);
	// 	};
	// 	image.src = Blood_Moon_img.png;
	// }

	// custom_text(scene: Phaser.Scene, text: string, xml: string, png: string, x: number, y: number) {
	// 	const _xml = Phaser.DOM.ParseXML(atob(xml));
	// 	const image = new Image();
	// 	// deno-lint-ignore no-this-alias
	// 	// const _this = this;
	// 	image.onload = () => {
	// 		scene.textures.addImage('BloodMoon', image);
	// 		const data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
	// 			_xml,
	// 			scene.textures.getFrame('BloodMoon'),
	// 			0,
	// 			0,
	// 		);
	// 		scene.cache.bitmapFont.add('BloodMoon', {
	// 			data: data,
	// 			texture: 'BloodMoon',
	// 			frame: null,
	// 		});
	// 		const { width, height } = this.game.config;
	// 		scene.add.bitmapText(
	// 			x,
	// 			y,
	// 			'BloodMoon',
	// 			text,
	// 		).setOrigin(0.5).setScale(0.5);
	// 	};
	// 	image.src = png;
	// }
}
