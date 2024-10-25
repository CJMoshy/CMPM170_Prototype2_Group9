import './styles/style.css';
import Loader from './scenes/Loader.ts';
import Menu from './scenes/Menu.ts';
import Phaser from 'phaser';

const GAME_CONFIG = {
	type: Phaser.CANVAS,
	parent: 'phaser-game',
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		size: Phaser.Scale.FIT,
		zoom: 0.75,
	},
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {},
	},
	zoom: 1,
	scene: [Loader, Menu],
};

document.addEventListener('DOMContentLoaded', () => {
	new Phaser.Game(GAME_CONFIG);
});
