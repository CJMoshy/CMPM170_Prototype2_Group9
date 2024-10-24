import './styles/style.css';

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
	scene: [],
};

document.addEventListener('DOMContentLoaded', () => {
	new Phaser.Game(GAME_CONFIG);
});
