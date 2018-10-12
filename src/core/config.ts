import { GameOver } from '../scenes/gameOver';
import { Level1 } from '../scenes/level1';
import { MainMenu } from '../scenes/mainMenu';
import { Preloader } from './preloader';

export function Config() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-example',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false,
            },
        },
        scene: [Preloader, MainMenu, Level1, GameOver],
    };
    window['game'] = new Phaser.Game(config);
}
