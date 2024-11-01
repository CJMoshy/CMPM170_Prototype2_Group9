import Phaser from 'phaser';
import cursed_dog from '../../assets/img/Cursed_Dog.png';
import abyss from '../../assets/audio/abyss.wav';
import click from '../../assets/audio/click.wav';
import player from '../../assets/img/Necrodog.png';
import bones from '../../assets/img/bonepile.png';
import stash from '../../assets/img/stash.png';
import bloodMoonPNG from '../../assets/font/BloodMoon/BloodMoon.png';
import bloodMoonXML from '../../assets/font/BloodMoon/BloodMoon.xml';
import boneFontPNG from '../../assets/font/Bone/bone.png';
import boneFontXML from '../../assets/font/Bone/bone.xml';
import necroAnims from '../../assets/img/NecroDogAnimations.png';
import tileset from '../../assets/tilemap/TilesetGraveyard.png';
import mapData from '../../assets/tilemap/Graveyard_Scene.json' with {
	type: 'json',
};

export default class Loader extends Phaser.Scene {
	constructor() {
		super({ key: 'loaderScene' });
	}
	preload() {
		// image
		this.load.image('cursed_dog', cursed_dog);

		// audio
		this.load.audio('abyss', abyss);
		this.load.audio('click', click);

		this.load.image('player', player);
		this.load.image('bones', bones);
		this.load.image('stash', stash);

		// fonts
		this.load.bitmapFont(
			'bone',
			boneFontPNG,
			boneFontXML,
		);
		this.load.bitmapFont(
			'necro',
			bloodMoonPNG,
			bloodMoonXML,
		);

		this.load.image('base-tileset', tileset);
		this.load.tilemapTiledJSON('Graveyard_Scene', mapData);
		this.load.spritesheet('tilemap_sheet', tileset, {
			frameWidth: 16,
			frameHeight: 16,
		});

		this.load.spritesheet('necroDog-idle', necroAnims, {
			frameWidth: 64,
			frameHeight: 64,
		});
		/**
		 * //player anims----------------------------
        this.anims.create({
            key: 'player-walk-up',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'walking-up-',
                start: 1,
                end: 2
            }),
            frameRate: 10,
            repeat: false
        })

        this.anims.create({
		 */
	}
	create() {
		this.anims.create({
			key: 'necroDog-idle-anim',
			frames: this.anims.generateFrameNumbers('necroDog-idle', {
				start: 0,
				end: 4,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.scene.start('menuScene');
	}
}
