import Phaser from 'phaser';

export const enum VOLUME_TYPE {
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
		this.add.bitmapText(
			width as number / 2,
			height as number / 2 - 110,
			'necro',
			'Necro Dog',
		).setOrigin(0.5);

		const dog = this.add.image( // random ai generated image
			width as number / 2,
			height as number / 2,
			'cursed_dog',
		).setScale(0.25);
		this.add.bitmapText(
			width as number / 6,
			height as number / 1.5,
			'necro',
			'Start',
		).setOrigin(0.5).setInteractive().on('pointerdown', () => {
			this.sound.play('click', { volume: VOLUME_TYPE.VOLUME_SOFT }); // changel volume of ambient noise here
			this.cameras.main.fadeOut(1000, 0, 0, 0);
			this.cameras.main.once(
				Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
				() => {
					this.scene.start('playScene');
				},
			);
		});

		this.add.bitmapText(
			width as number - (width as number / 6),
			height as number / 1.5,
			'necro',
			'credits',
		).setOrigin(0.5).setInteractive().on('pointerdown', () => {
			this.sound.play('click', { volume: VOLUME_TYPE.VOLUME_SOFT });
			this.scene.start('creditScene');
		});
		this.add.tween({
			targets: dog,
			alpha: { from: 1, to: 0.0 },
			ease: 'Sine.InOut',
			duration: 5000,
			repeat: -1,
			yoyo: true,
		});
	}
}
