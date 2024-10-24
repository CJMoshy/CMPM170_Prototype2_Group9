import Phaser from 'phaser';

const text_config = { fontSize: '30px', fontFamily: 'courrier' };
export default class Menu extends Phaser.Scene {
	constructor() {
		super({ key: 'menuScene' });
	}

	preload() {
	}

	create() {
		const { width, height } = this.game.config;
		this.add.text(
			width as number / 2,
			height as number / 3,
			'Menu',
			text_config,
		).setOrigin(0.5);
		this.add.text(
			width as number / 4,
			height as number / 1.5,
			'Start',
			text_config,
		).setOrigin(0.5);
		this.add.text(
			width as number / 2 + (width as number / 4),
			height as number / 1.5,
			'Credits',
			text_config,
		).setOrigin(0.5);
		// start_btn.on('pointerdown', () => this.scene.start(''))
	}
}
