import Phaser from 'phaser';
import Player from '../prefabs/Player.ts';
import tileset from '../../assets/tilemap/TilesetGraveyard.png';
import mapData from '../../assets/tilemap/Graveyard_Scene.json' with {
	type: 'json',
};

export default class Play extends Phaser.Scene {
	private player!: Player;
	private bones!: Phaser.Physics.Arcade.Sprite;
	private stash!: Phaser.Physics.Arcade.Sprite;
	// private boneCountText!: Phaser.GameObjects.BitmapText;
	// private stashCountText!: Phaser.GameObjects.BitmapText;
	private boneCount: number;
	private stashCount: number;
	private boneBuffer: number;

	constructor() {
		super({ key: 'playScene' });
		this.boneCount = 0;
		this.stashCount = 0;
		this.boneBuffer = 0;
	}

	init() {
	}

	preload() {
		this.load.image('base-tileset', tileset);
		this.load.tilemapTiledJSON('Graveyard_Scene', mapData);
		this.load.spritesheet('tilemap_sheet', tileset, {
			frameWidth: 16,
			frameHeight: 16,
		});
	}

	create() {
		const map = this.add.tilemap('Graveyard_Scene');
		const tiles = map.addTilesetImage('TilesetGraveyard', 'base-tileset')!;

		map.createLayer('Ground', tiles, 0, 0);
		map.createLayer('grass', tiles, 0, 0);
		map.createLayer('Road', tiles, 0, 0);
		const wallLayer = map.createLayer('obstacle', tiles, 0, 0);
		map.createLayer('Graves', tiles, 0, 0);
		wallLayer?.setCollisionByProperty({ Collision: true });
		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

		const { width, height } = this.game.config;

		this.player = new Player(
			this,
			width as number / 2,
			height as number / 2,
			'player',
			0,
		);

		this.cameras.main.setBounds(0, 0, width as number, height as number);
		this.cameras.main.setZoom(2);
		this.cameras.main.setFollowOffset(0);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		this.physics.add.collider(this.player, wallLayer!);
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
	}
}
