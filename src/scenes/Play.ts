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
		const graveLayer = map.createLayer('Graves', tiles, 0, 0);
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

		// const { width, height } = this.game.config;
		// this.bones = this.physics.add.sprite(
		// 	(width as number / 2) + 50,
		// 	height as number / 2,
		// 	'bones',
		// ).setOrigin(0.5);
		// this.bones.setScale(0.025);
		// this.stash = this.physics.add.sprite(
		// 	width as number / 2,
		// 	height as number / 2 + 50,
		// 	'stash',
		// ).setOrigin(0.5);
		// this.stash.setScale(0.05);
		// this.player = new Player(
		// 	this,
		// 	width as number / 2,
		// 	height as number / 2,
		// 	'player',
		// 	0,
		// );
		// this.boneCountText = this.add.bitmapText(
		// 	this.player.x,
		// 	this.player.y - 100,
		// 	'rocketSquare',
		// 	this.boneCount.toString(),
		// 	50,
		// 	1,
		// );
		// //
		// this.stashCountText = this.add.bitmapText(
		// 	this.stash.x,
		// 	this.stash.y - 150,
		// 	'rocketSquare',
		// 	this.stashCount.toString(),
		// 	50,
		// 	1,
		// );

		// console.log(this.boneCount.toString(), this.stashCount.toString());

		// this.physics.add.overlap(this.bones, this.player, () => {
		// 	if (this.boneBuffer > 60 && this.boneCount < 3) {
		// 		this.boneCount += 1;
		// 		this.boneBuffer = 0;
		// 		// this.boneCountText.text = this.boneCount.toString();
		// 		console.log(this.boneCount);
		// 	}
		// });

		// this.physics.add.overlap(this.stash, this.player, () => {
		// 	this.stashCount += this.boneCount;
		// 	this.boneCount = 0;
		// 	// this.boneCountText.text = this.boneCount.toString();
		// 	// this.stashCountText.text = this.stashCount.toString();
		// });

		this.physics.add.collider(this.player, wallLayer!);
		graveLayer?.setCollisionByProperty({ Interactable: true });
		this.physics.add.overlap(this.player, graveLayer!, ()=>{
			const tile = graveLayer?.getTileAtWorldXY(this.player.x, this.player.y);
			if(tile?.properties.Interactable === true){
				console.log("dig for bones");
			}
		});
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
		
	}

	// handleMovement(){
	//     this.dog.setVelocityY(0);
	//     this.dog.setVelocityX(0);
	//     if(this.up.isDown){
	//         this.dog.setVelocityY(-400 + (this.boneCount * 50));
	//     }
	//     if(this.left.isDown){
	//         this.dog.setVelocityX(-400 + (this.boneCount * 50));
	//     }
	//     if(this.down.isDown){
	//         this.dog.setVelocityY(400 - (this.boneCount * 50));
	//     }
	//     if(this.right.isDown){
	//         this.dog.setVelocityX(400 - (this.boneCount * 50));
	//     }
	//     this.boneCountText.x = this.dog.x;
	//     this.boneCountText.y = this.dog.y - 100;
	// }
}
