import { VOLUME_TYPE } from './Menu.ts';
export default class Credits extends Phaser.Scene {
	constructor() {
		super({ key: 'creditScene' });
	}

	init() {}
	preload() {}
	create() {
		const { width, height } = this.game.config;

		const textData = [
			{ offsetY: -100, content: 'Created by group 9', textSize: 0.5 },
			{ offsetY: -50, content: 'CJ Moshy, Elton Zeng', textSize: 0.4 },
			{ offsetY: 0, content: 'Zeke Davidson, Henry Christoper', textSize: 0.4 },
			{ offsetY: 50, content: 'Lingtian He', textSize: 0.4 },
		];

		textData.forEach((data) => {
			this.add.bitmapText(
				width as number / 2,
				height as number / 2 + data.offsetY,
				'necro',
				data.content,
			).setOrigin(0.5);
		});

		const ret = this.add.bitmapText(
			width as number / 2,
			height as number / 2 + 100,
			'necro',
			'return',
		)
			.setOrigin(0.5).setInteractive().on(
				'pointerdown',
				() => {
					this.sound.play('click', { volume: VOLUME_TYPE.VOLUME_SOFT });
					this.scene.start('menuScene');
				},
			);

		this.add.tween({
			targets: ret,
			alpha: { from: 1, to: 0.0 },
			ease: 'Sine.InOut',
			duration: 1000,
			repeat: -1,
			yoyo: true,
		});
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
	}
}
