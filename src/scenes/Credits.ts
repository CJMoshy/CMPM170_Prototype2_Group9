import custom_text from '../util/XMLText';
import Blood_Moon_img from '../../assets/font/BloodMoon/BloodMoonPng.json' with {
	type: 'json',
};
import Blood_Moon_xml from '../../assets/font/BloodMoon/BloodMoon.json' with {
	type: 'json',
};
export default class Credits extends Phaser.Scene {
	constructor() {
		super({ key: 'creditScene' });
	}

	init() {}
	preload() {}
	create() {
		const { width, height } = this.game.config;
		custom_text(
			this,
			'Created',
			'credits-txt',
			Blood_Moon_xml.xml,
			Blood_Moon_img.png,
			width as number / 2,
			height as number / 2,
		);

		this.add.text(width as number / 2, height as number / 2 + 50, 'Return')
			.setOrigin(0.5).setInteractive().on(
				'pointerdown',
				() => this.scene.start('menuScene'),
			);
	}
	override update(time: number, delta: number): void {
	}
}
