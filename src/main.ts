import './styles/style.css';
import Loader from './scenes/Loader.ts';
import Menu from './scenes/Menu.ts';
import Play from './scenes/Play.ts';
import Phaser from 'phaser';

const GAME_CONFIG = {
	type: Phaser.CANVAS,
	parent: 'phaser-game',
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		zoom: 2,
	},
	width: 480,
	height: 320,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {},
	},
	scene: [Loader, Menu, Play],
};

document.addEventListener('DOMContentLoaded', () => {
	new Phaser.Game(GAME_CONFIG);
});
