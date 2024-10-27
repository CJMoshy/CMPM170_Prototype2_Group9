import './styles/style.css';
import Load from './scenes/Loader';
import Play from './scenes/Play';
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
	scene: [Load, Play],
	fps: { forceSetTimeOut: true, target: 60 }
};

document.addEventListener('DOMContentLoaded', () => {
	new Phaser.Game(GAME_CONFIG);
});
