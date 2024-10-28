import Phaser from 'phaser';
import tileset from '../assets/TilesetGraveyard.png'
import mapData from '../assets/Graveyard_Scene.json' with { type: "json" };

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'playScene' });
    }

    init() {

    }

    preload(){
        this.load.image('base-tileset', tileset);
        this.load.tilemapTiledJSON('Graveyard_Scene', mapData);
        this.load.spritesheet("tilemap_sheet", tileset, {frameWidth:16, frameHeight:16});
    }

    create(){
        const map = this.add.tilemap('Graveyard_Scene');
        const tiles = map.addTilesetImage('TilesetGraveyard', 'base-tileset');

        const groundLayer = map.createLayer('Ground', tiles, 0, 0);
        const grassLayer = map.createLayer("grass", tiles, 0, 0); 
        const roadLayer = map.createLayer("Road", tiles, 0, 0);
        const wallLayer = map.createLayer("obstacle", tiles, 0, 0); 
        const graveLayer = map.createLayer("Graves", tiles, 0, 0);
        wallLayer?.setCollisionByProperty({ Collision: true });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    override update(time: number, delta: number): void {
        
    }
}