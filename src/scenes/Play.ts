import Phaser from 'phaser';
import Player from '../prefabs/Player.ts';

export default class Play extends Phaser.Scene {
	private player!: Player;
	private boneText!: Phaser.GameObjects.BitmapText;
	private graveText: Map<string, string>;
	private visitedGraves!: Set<string>;
	private vision: any;
	constructor() {
		super({ key: 'playScene' });
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
			['24, 9', 'In memory of Gus, who never met a bone he didnt like'],
			['25, 5', 'Here lies Trixie, who outsmarted the vacuum until the end'],
			['26, 7', 'Rest in peace, Benny, who always believed he was a lap dog'],
			['26, 9', 'Here lies Nala, who made every car ride an adventure'],
			['18, 15', 'In loving memory of Duke, the proud protector of the yard'],
		]);
		this.visitedGraves = new Set<string>();
	}

	init() {
	}

	preload() {}

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
			185,
			15,
			'player',
			0,
		);
		this.player.anims.play('necroDog-idle-anim');

		const rt = this.make.renderTexture({ 
			x: 0,
			y: 0,
			width: map.widthInPixels, 
			height: map.heightInPixels
		}, true);
		rt.setOrigin(0, 0);
		rt.fill(0xbbc2c9);
		rt.setAlpha(.4);

		this.vision = this.make.image({
			x: 0,
			y: 0,
			key: 'vision',
			alpha: 0.9,
			add: true
		});
		this.vision.scale = .8;
		this.vision.visible = false;
		
		this.cameras.main.setBounds(0, 0, width as number, height as number);
		this.cameras.main.setZoom(3);
		this.cameras.main.setFollowOffset(0);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		this.physics.add.collider(this.player, wallLayer!);
		this.physics.add.collider(this.player, wallLayer!);
		graveLayer?.setCollisionByProperty({ Interactable: true });
		this.physics.add.overlap(this.player, graveLayer!, () => {
			const tile = graveLayer?.getTileAtWorldXY(this.player.x, this.player.y);
			if (tile?.properties.Interactable === true) {
				const key = tile?.x.toString() + ', ' + tile?.y.toString();
				const writerScene = this.scene.get('writerScene');
				writerScene.events.emit('playerEnterGrave', {
					text: this.graveText.get(key),
				});
				if (this.visitedGraves.has(key) === false) {
					this.visitedGraves.add(key);
					this.player.bone_count += 1;
					this.boneText.text = `Bones: ${this.player.bone_count}`;
				}
			} else {
				const writerScene = this.scene.get('writerScene');
				writerScene.events.emit('playerLeftGrave');
			}
		});
		this.boneText = this.add.bitmapText(
			width as number / 4 + 50,
			height as number - 120,
			'bone',
			'Bones: 0',
		)
			.setScale(0.2)
			.setScrollFactor(0);
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
		this.player.update();
		if (this.vision){
			//TODO: change the vision circle based on when in graveyard
			this.vision.visible = true;
			this.vision.x = this.player.x;
			this.vision.y = this.player.y;
		}
	}
}
