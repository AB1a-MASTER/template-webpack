import { Scene } from 'phaser';
import Player from "../Player.js";

export class Game extends Scene{
    constructor() {
        super('Game');
    }


    preload(){
        console.log('preload');
        // Loading assets
        Player.preload(this);
        this.load.image('tiles','assets/RPG Nature Tileset.png');
        this.load.tilemapTiledJSON('map','assets/images/map.json')
    }

    create(){
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles',32,32,0,0);
        const layer1 = map.createLayer("L1", tileset,0,0);
        //const layer2 = map.createLayer("L2", tileset,0,0);
        //const layer3 = map.createLayer("L3", tileset,0,0);

        layer1.setCollisionByProperty({collides:true},true);
        this.matter.world.convertTilemapLayer(layer1);

        //Player creation
        this.player = new Player({scene:this,x:400,y:300,texture:'female',frame:'townsfolk_f_idle_1'});
        this.Testplayer = new Player({scene:this,x:500,y:300,texture:'male',frame:'townsfolk_m_idle_1'});
        this.add.existing(this.player);
        this.add.existing(this.Testplayer);
        //set player input
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        this.player.update();
    }
}

