import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 608,
    backgroundColor: '#9C9C9C',
    parent: 'game-container',
    scene: [
        Game,
        Boot,
        Preloader,
        MainMenu,
        GameOver
    ],
    scale: {
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH
        zoom:2,
    },
    physics:{
        default: 'matter',
        matter: {
            debug: true,
            gravity: {y:0}
        },

    }
    
};

export default new Phaser.Game(config);
