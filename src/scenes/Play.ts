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
	private graveText: Map<string, string>;
	constructor() {
		super({ key: 'playScene' });
		this.boneCount = 0;
		this.stashCount = 0;
		this.boneBuffer = 0;
		this.graveText = new Map<string, string>([
			['12, 6', 'Here lies Sir Barksalot, loyal till the end'],
			['15, 16', 'Here rests Fido, always chasing tails in the afterlife'],
			['16, 4', 'Beloved companion: Rufus, forever fetching in spirit'],
			['17, 15', 'In memory of Luna, who howled at the moon one last time'],
			['18, 7', 'Here lies Max, who finally found the ultimate chew toy'],
			['20, 10', 'RIP Bella, the queen of the backyard'],
			[
				'21, 5',
				'Here rests Sparky, who followed every squirrel to the great beyond',
			],
			[
				'21, 12',
				'In loving memory of Charlie, who ran free at the Rainbow Bridge',
			],
			[
				'22, 8',
				'Here lies Daisy, who gave more kisses than any dog could count',
			],
			['22, 14', 'Forever in our hearts: Zeus, the thunderous bark'],
			['23, 3', 'Here sleeps Coco, the fluffiest guardian of dreams'],
			['24, 9', 'In memory of Gus, who never met a bone he didn’t like'],
			['25, 5', 'Here lies Trixie, who outsmarted the vacuum until the end'],
			['26, 7', 'Rest in peace, Benny, who always believed he was a lap dog'],
			['26, 9', 'Here lies Nala, who made every car ride an adventure'],
			['18, 15', 'In loving memory of Duke, the proud protector of the yard'],
		]);
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

		this.add.bitmapText(200, 200, 'bone', 'Bones: 0').setScale(0.5)
			.setScrollFactor(0);

		this.cameras.main.setBounds(0, 0, width as number, height as number);
		this.cameras.main.setZoom(2);
		this.cameras.main.setFollowOffset(0);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		const window = this.add.graphics();
		window.fillStyle(0x000000, 1); // Color and alpha (transparency)
		window.fillRect(
			this.cameras.main.width / 2 - 100,
			this.cameras.main.height / 2 - 75,
			200,
			30,
		);
		window.setScrollFactor(0, 0);
		window.setVisible(false);

		const epitaph = this.add.text(
			this.cameras.main.width / 2 - 95,
			this.cameras.main.height / 2 - 75,
			'',
			{
				fontFamily: 'Arial',
				fontSize: 10,
				color: '#fff',
				wordWrap: {
					width: 190,
				},
			},
		).setScrollFactor(0, 0);
		epitaph.setVisible(false);

		this.physics.add.collider(this.player, wallLayer!);
		this.physics.add.collider(this.player, wallLayer!);
		graveLayer?.setCollisionByProperty({ Interactable: true });
		this.physics.add.overlap(this.player, graveLayer!, () => {
			const tile = graveLayer?.getTileAtWorldXY(this.player.x, this.player.y);
			if (tile?.properties.Interactable === true) {
				window.setVisible(true);
				epitaph.setVisible(true);
				const key = tile?.x.toString() + ', ' + tile?.y.toString();
				epitaph.text = this.graveText.get(key)!;
			} else {
				window.setVisible(false);
				epitaph.setVisible(false);
			}
		});
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
	}
}
