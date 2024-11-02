import Phaser from 'phaser';
export default class Player extends Phaser.Physics.Arcade.Sprite {
	private keys: Phaser.Types.Input.Keyboard.CursorKeys;
	private velocity: number;
	public bone_count: number;
	private moveStatus!: string;
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
		this.setCollideWorldBounds(true);
		this.setImmovable(true);
		this.setOrigin(0.5);
		this.setScale(0.25);
		this.setSize(32, 20);
		this.setOffset(12, 40);

		this.velocity = 40;
		this.moveStatus = '';
		// maybe change in the future to something more complex
		this.bone_count = 0;

		this.keys = scene.input.keyboard
			?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
		this.keys.left.on('down', () => {
			this.anims.play('necroDog-run-anim');
		});
		this.keys.right.on('down', () => {
			this.anims.play('necroDog-run-anim');
		});
	}

	override update() {
		this.handleMovement();
		this.handleIdle();
	}

	//pulled from https://github.com/CJMoshy/Gemetic-Dungeon/blob/main/src/prefabs/Player.ts lines 36 to 63
	handleMovement() {
		const vector = new Phaser.Math.Vector2(0, 0);
		if (this.keys.down.isDown) {
			vector.y = 1;
			this.moveStatus = 'down';
		}
		if (this.keys.up.isDown) {
			vector.y = -1;
			this.moveStatus = 'up';
		}
		if (this.keys.left.isDown) {
			vector.x = -1;
			this.moveStatus = 'left';
			if (!this.flipX) {
				this.flipX = !this.flipX;
			}
		}
		if (this.keys.right.isDown) {
			vector.x = 1;
			this.moveStatus = 'right';
			if (this.flipX) {
				this.flipX = !this.flipX;
			}
		}
		if (
			vector.x === 0 && vector.y === 0 && this.anims &&
			this.moveStatus !== 'none'
		) {
			this.anims.isPlaying = false;
			this.anims.stop();
			this.moveStatus = 'none';
		}

		vector.normalize();
		this.setVelocity(this.velocity * vector.x, this.velocity * vector.y);
	}

	handleIdle() {
		if (!this.anims.isPlaying && this.moveStatus === 'none') {
			this.anims.play('necroDog-idle-anim');
		}
	}
}
