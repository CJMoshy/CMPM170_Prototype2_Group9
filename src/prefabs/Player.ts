import Phaser from 'phaser';
export default class Player extends Phaser.Physics.Arcade.Sprite {
	keys: Phaser.Types.Input.Keyboard.CursorKeys;
	velocity: number;
	bone_count: number;
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame: number,
	) {
		super(scene, x, y, texture, frame); // add texture

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.scene.events.on('update', this.update, this);
		this.setCollideWorldBounds(true);
		this.setImmovable(true);

		this.velocity = 100;

		this.keys = scene.input.keyboard
			?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

		// maybe change in the future to something more complex
		this.bone_count = 0;
	}

	override update() {
		this.handleMovement();
	}

	//pulled from https://github.com/CJMoshy/Gemetic-Dungeon/blob/main/src/prefabs/Player.ts lines 36 to 63
	handleMovement() {
		const vector = new Phaser.Math.Vector2(0, 0);
		if (this.keys.down.isDown) {
			vector.y = 1;
		}
		if (this.keys.up.isDown) {
			vector.y = -1;
		}
		if (this.keys.left.isDown) {
			vector.x = -1;
		}
		if (this.keys.right.isDown) {
			vector.x = 1;
		}

		vector.normalize();
		this.setVelocity(this.velocity * vector.x, this.velocity * vector.y);
	}
}
