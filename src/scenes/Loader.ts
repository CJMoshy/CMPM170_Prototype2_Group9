import Phaser from 'phaser';
import cursed_dog from '../../assets/img/Cursed_Dog.png';
import abyss from '../../assets/audio/abyss.wav';
export default class Loader extends Phaser.Scene {
	constructor() {
		super({ key: 'loaderScene' });
	}

	// custom_text() {
	// 	//  1) Decode the xml
	// 	const xml = Phaser.DOM.ParseXML(atob(Blood_Moon_b64.encoded));

	// 	//  2) Create an Image element from the encoded png:
	// 	const image = new Image();
	// 	const _this = this;
	// 	image.onload = () => {
	// 		//  4) Successful decode? Then create the texture:
	// 		 _this.textures.addImage('BloodMoon', image);

	// 		//  5) Create the Bitmap Font data
	// 		const data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
	// 			xml,
	// 			_this.textures.getFrame('BloodMoon'),
	// 			0,
	// 			0,
	// 		);

	// 		//  6) Add the bitmap font entry - the structure of the object is important
	// 		_this.cache.bitmapFont.add('BloodMoon', {
	// 			data: data,
	// 			texture: 'BloodMoon',
	// 			frame: null,
	// 		});
	//         _this.add.bitmapText(0, 0, 'BloodMoon', 'Bitmap Text Decoded from base64');
	// 	};

	//     image.src = Blood_Moon_img.png
	// }

	preload() {
		this.load.image('cursed_dog', cursed_dog);

		this.load.audio('abyss', abyss);
	}
	create() {
		this.scene.start('menuScene');
	}
}
