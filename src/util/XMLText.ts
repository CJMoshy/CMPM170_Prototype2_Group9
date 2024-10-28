/**
 * Utility function for loading bitmap fonts in the game.
 * Call this function if you want to add a bitmap font to your game.
 * @param scene the scene to add the text to
 * @param text the text to add to scene
 * @param xml base64 encoded string of the fonts xml file
 * @param png base64 encoded strong of the fonts png file
 * @param x number location to place on the screen
 * @param y number location to place on the screen
 */
export default function custom_text(
	scene: Phaser.Scene,
	name: string,
	text: string,
	xml: string,
	png: string,
	x: number,
	y: number,
) {
	const _xml = Phaser.DOM.ParseXML(atob(xml));
	const image = new Image();
	image.onload = () => {
		if(!scene.textures.exists(name)){
			scene.textures.addImage(name, image);
		}
		// scene.textures.addImage(name, image);
		const _data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
			// @ts-ignore: type alias
			_xml,
			scene.textures.getFrame(name),
			0,
			0,
		);
		scene.cache.bitmapFont.add(name, {
			data: _data,
			texture: name,
			frame: null,
		});
		scene.add.bitmapText(
			x,
			y,
			name,
			text,
		).setOrigin(0.5).setScale(0.5);
	};
	image.src = png;
}
