import Phaser from 'phaser';
import Blood_Moon_img from '../../assets/font/BloodMoon/BloodMoonPng.json';
import Blood_Moon_b64 from '../../assets/font/BloodMoon/BloodMoon.json';
const text_config = { fontSize: '30px', fontFamily: 'courrier' };

export default class Menu extends Phaser.Scene {
	constructor() {
		super({ key: 'menuScene' });
	}

	preload() {
	}

	create() {

		//spooky
		this.sound.play('abyss', {loop: true})

		const { width, height } = this.game.config;
		const dog = this.add.image(
			width as number / 2,
			height as number / 2,
			'cursed_dog',
		);
		this.add.text(
			width as number / 6,
			height as number / 1.5,
			'Start',
			text_config,
		).setOrigin(0.5);
		this.add.text(
			width as number - (width as number / 6),
			height as number / 1.5,
			'Credits',
			text_config,
		).setOrigin(0.5);
		// start_btn.on('pointerdown', () => this.scene.start(''))

		this.add.tween({
			targets: dog,
			alpha: { from: 1, to: 0.0 },
			ease: 'Sine.InOut',
			duration: 5000,
			repeat: -1,
			yoyo: true,
		});

		this.custom_text("Necro Dog")
	}
	// https://phaser.io/examples/v3.85.0/loader/base64/view/bitmap-text
	custom_text(text: string) {
		const xml = Phaser.DOM.ParseXML(atob(Blood_Moon_b64.xml));
		const image = new Image();
		// deno-lint-ignore no-this-alias
		const _this = this;
		image.onload = () => {
			 _this.textures.addImage('BloodMoon', image);
			const data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
				xml,
				_this.textures.getFrame('BloodMoon'),
				0,
				0,
			);
			_this.cache.bitmapFont.add('BloodMoon', {
				data: data,
				texture: 'BloodMoon',
				frame: null,
			});
			const { width, height } = this.game.config;
            _this.add.bitmapText(width as number /2, height as number / 2 -200, 'BloodMoon', text).setOrigin(0.5)
		}; 
        image.src = Blood_Moon_img.png
	}

}
