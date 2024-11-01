export default class Credits extends Phaser.Scene {
	constructor() {
		super({ key: 'creditScene' });
	}

	init() {}
	preload() {}
	create() {
		const { width, height } = this.game.config;

		this.add.text(width as number / 2, height as number / 2 + 50, 'Return')
			.setOrigin(0.5).setInteractive().on(
				'pointerdown',
				() => this.scene.start('menuScene'),
			);
	}
	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
	}
}
