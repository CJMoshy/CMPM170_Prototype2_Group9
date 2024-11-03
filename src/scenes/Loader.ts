import Phaser from 'phaser';
import cursed_dog from '../../assets/img/Cursed_Dog.png';
import abyss from '../../assets/audio/abyss.wav';
import click from '../../assets/audio/click.wav';
import collectBone from '../../assets/audio/collect-bone.mp3';
import bloodMoonPNG from '../../assets/font/BloodMoon/BloodMoon.png';
import bloodMoonXML from '../../assets/font/BloodMoon/BloodMoon.xml';
import boneFontPNG from '../../assets/font/Bone/bone.png';
import boneFontXML from '../../assets/font/Bone/bone.xml';
import boneFontWhitePNG from '../../assets/font/boneswhite/boneswhite.png';
import boneFontWhiteXML from '../../assets/font/boneswhite/boneswhite.xml';
import necroAnims from '../../assets/img/NecroDogAnimations.png';
import necroRunning from '../../assets/img/NecroDogRunning.png';
import tileset from '../../assets/tilemap/TilesetGraveyard.png';
import vision from '../../assets/img/vision.png';
import mapData from '../../assets/tilemap/Graveyard_Scene.json' with {
	type: 'json',
};
import dBox from '../../assets/img/DialogueBox2.png';
import bat from '../../assets/img/atlas/batSpritesheet.png';
import batlas from '../../assets/img/atlas/batSprites.json' with {
	type: 'json',
};
import bone from '../../assets/img/bone.png';

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
		this.load.audio('collectBone', collectBone);

		this.load.image('dBox', dBox);
		this.load.image('vision', vision);
		this.load.image('boneIMG', bone);
		// fonts
		this.load.bitmapFont(
			'bone',
			boneFontPNG,
			boneFontXML,
		);
		this.load.bitmapFont(
			'bonewhite',
			boneFontWhitePNG,
			boneFontWhiteXML,
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

		this.load.spritesheet('necroDog-run', necroRunning, {
			frameWidth: 64,
			frameHeight: 64,
		});

		this.load.atlas('bat', bat, batlas);
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

		this.anims.create({
			key: 'necroDog-run-anim',
			frames: this.anims.generateFrameNumbers('necroDog-run', {
				start: 0,
				end: 7,
			}),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: 'bat-anim',
			frames: this.anims.generateFrameNames('bat', {
				prefix: 'Bat',
				start: 1,
				end: 4,
			}),
			frameRate: 12,
			repeat: -1,
		});
		this.scene.start('menuScene');
	}
}
