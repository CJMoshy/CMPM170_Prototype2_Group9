/**
 * Utility function for loading bitmap fonts in the game.
 * Call this function if you want to add a bitmap font to your game.
 * @param scene the scene to add the text to
 * @param text the text to add to scene
 * @param _text_cache_id unique id to register each text instance to
 * @param xml base64 encoded string of the fonts xml file
 * @param png base64 encoded strong of the fonts png file
 * @param x number location to place on the screen
 * @param y number location to place on the screen
 */
export default function custom_text(
	scene: Phaser.Scene,
	_text_cache_id: string,
	text: string,
	xml: string,
	png: string,
	x: number,
	y: number,
) {
	const _xml = Phaser.DOM.ParseXML(atob(xml));
	const image = new Image();
	image.onload = () => {
		if (!scene.textures.exists(_text_cache_id)) {
			scene.textures.addImage(_text_cache_id, image);
		}
		const _data = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(
			// @ts-ignore: type alias
			_xml,
			scene.textures.getFrame(_text_cache_id),
			0,
			0,
		);
		scene.cache.bitmapFont.add(_text_cache_id, {
			data: _data,
			texture: _text_cache_id,
			frame: null,
		});
		scene.add.bitmapText(
			x,
			y,
			_text_cache_id,
			text,
		).setOrigin(0.5).setScale(0.5);
	};
	image.src = png;
}
