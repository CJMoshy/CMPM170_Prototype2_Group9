import Phaser from 'phaser';
import Player from '../prefabs/Player.ts';
import { VOLUME_TYPE } from './Menu.ts';

export default class Play extends Phaser.Scene {
	private player!: Player;
	private boneText!: Phaser.GameObjects.BitmapText;
	private graveText: Map<string, string>;
	private visitedGraves!: Set<string>;
	private vision!: Phaser.GameObjects.Image;
	private rt!: Phaser.GameObjects.RenderTexture;
	private VELOCITY!: number;
	private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
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
		this.VELOCITY = 20;
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
		wallLayer?.setCollisionByProperty({ Collision: true });

		const graveLayer = map.createLayer('Graves', tiles, 0, 0);
		graveLayer?.setCollisionByProperty({ Interactable: true });

		const entrace = map.getObjectLayer('GraveyardEntrance')!;
		const triggerObject = entrace.objects[0]; // Get the first (and only) object

		const bats: Phaser.GameObjects.GameObject[] = [];
		const batLayer = map.getObjectLayer('Bats');
		batLayer?.objects.forEach((e) => {
			bats.push(
				this.physics.add.sprite(e.x as number, e.y as number, 'bat', 0)
					.setScale(0.08).anims.play('bat-anim'),
			);
		});
		// Create an invisible zone for collision
		const zone = this.add.zone(
			triggerObject.x as number,
			triggerObject.y as number,
			triggerObject.width as number,
			triggerObject.height as number,
		);
		this.physics.world.enable(zone);
		zone.body.setAllowGravity(false);
		zone.body.moves = false;

		const { width, height } = this.game.config;

		this.player = new Player(
			this,
			185,
			15,
			'player',
			0,
		);

		this.emitter = this.add.particles(this.player.x, this.player.y, 'boneIMG', { //init emitter
			lifespan: 6000, //how long particles exist
			angle: { min: 180, max: 360 },
			speed: { min: 25, max: 50 }, //starting speed / max speed
			scale: { start: 0.1, end: 0 }, // size of particles
			gravityY: 150,
			emitting: false,
		});

		this.rt = this.make.renderTexture({
			x: 0,
			y: 0,
			width: map.widthInPixels,
			height: map.heightInPixels,
		}, true)
			.setOrigin(0, 0)
			.fill(0xbbc2c9)
			.setAlpha(0);

		this.vision = this.make.image({
			x: 0,
			y: 0,
			key: 'vision',
			alpha: 0,
			add: true,
			scale: 0.8,
		});

		this.boneText = this.add.bitmapText(
			width as number / 4 + 50,
			height as number - 120,
			'bone',
			'Bones: 0',
		)
			.setScale(0.2)
			.setScrollFactor(0);

		this.cameras.main.setBounds(0, 0, width as number, height as number);
		this.cameras.main.setZoom(3);
		this.cameras.main.setFollowOffset(0);
		this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
		this.cameras.main.fadeIn(1000, 0, 0, 0);

		const MAX_GAME_VOLUME = 4.5;

		this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.physics.add.collider(this.player, wallLayer!);
		this.physics.add.collider(this.player, wallLayer!);
		this.physics.add.overlap(this.player, graveLayer!, () => {
			const tile = graveLayer?.getTileAtWorldXY(this.player.x, this.player.y);
			if (tile?.properties.Interactable === true) {
				const key = tile?.x.toString() + ', ' + tile?.y.toString();
				const writerScene = this.scene.get('writerScene');
				writerScene.events.emit('playerEnterGrave', {
					text: this.graveText.get(key),
				});
				if (this.visitedGraves.has(key) === false) {
					this.sound.play('collectBone', { volume: VOLUME_TYPE.VOLUME_SOFT });
					const computed = this.sound.volume + (this.sound.volume * 0.12);
					if (computed > MAX_GAME_VOLUME) {
						this.sound.setVolume(MAX_GAME_VOLUME);
					} else this.sound.setVolume(computed);
					this.cameras.main.shake(1500, 0.0005);
					this.emitter.setX(tile.pixelX);
					this.emitter.setY(tile.pixelY);
					this.emitter.explode(10);
					this.visitedGraves.add(key);
					this.player.bone_count += 1;
					this.boneText.text = `Bones: ${this.player.bone_count}`;
				}
			} else {
				const writerScene = this.scene.get('writerScene');
				writerScene.events.emit('playerLeftGrave');
			}
		});

		// fundamental issue here with the player being able to bob back and forth with left and right and just toggle functions
		this.physics.add.overlap(this.player, zone, () => {
			if (this.player.inGraveyard === false && this.player.flipX === false) {
				this.player.inGraveyard = true;
				this.onEnterGraveyard();
			}
			if (this.player.inGraveyard && this.player.flipX) {
				this.onExitGraveyard();
				this.player.inGraveyard = false;
			}
		});

		this.time.addEvent({
			delay: 1700,
			callback: () => {
				bats.forEach((e) =>
					this.updateMovement(e as Phaser.Physics.Arcade.Sprite)
				);
			},
			callbackScope: this,
			loop: true,
		});
	}

	// deno-lint-ignore no-unused-vars
	override update(time: number, delta: number): void {
		this.player.update();
		if (this.vision) {
			this.vision.x = this.player.x;
			this.vision.y = this.player.y;
		}
	}

	onEnterGraveyard() {
		this.add.tween({
			targets: this.rt,
			alpha: { from: 0, to: 0.4 },
			ease: 'Sine.InOut',
			duration: 2000,
		});
		this.add.tween({
			targets: this.vision,
			alpha: { from: 0, to: 0.9 },
			ease: 'Sine.InOut',
			duration: 2000,
		});
	}

	onExitGraveyard() {
		this.add.tween({
			targets: this.rt,
			alpha: { from: 0.4, to: 0 },
			ease: 'Sine.InOut',
			duration: 2000,
		});
		this.add.tween({
			targets: this.vision,
			alpha: { from: 0.9, to: 0 },
			ease: 'Sine.InOut',
			duration: 2000,
		});
	}

	//------updateMovement
	/**
	 * Takes a  entity and context scene, and randomly updates that entitys movement
	 *
	 * @param {Phaser.Physics.Arcade.Sprite} entity
	 * @returns {void}
	 */
	updateMovement(entity: Phaser.Physics.Arcade.Sprite) {
		const decider = Math.round(Math.random() * 4);
		switch (decider) {
			case 1:
				entity.setVelocityX(this.VELOCITY);
				this.time.delayedCall(750, () => {
					entity.setVelocity(0);
					this.time.delayedCall(500, () => {
						entity.setVelocityX(-this.VELOCITY);
					});
				});
				break;
			case 2:
				entity.setVelocityX(-this.VELOCITY);
				this.time.delayedCall(750, () => {
					entity.setVelocity(0);
					this.time.delayedCall(500, () => {
						entity.setVelocityX(this.VELOCITY);
					});
				});
				break;
			case 3:
				entity.setVelocityY(this.VELOCITY);
				this.time.delayedCall(750, () => {
					entity.setVelocity(0);
					this.time.delayedCall(500, () => {
						entity.setVelocityY(-this.VELOCITY);
					});
				});
				break;
			case 4:
				entity.setVelocityY(-this.VELOCITY);
				this.time.delayedCall(750, () => {
					entity.setVelocity(0);
					this.time.delayedCall(500, () => {
						entity.setVelocityY(this.VELOCITY);
					});
				});
				break;
		}
	}
}
