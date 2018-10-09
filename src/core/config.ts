import { Game } from '../scenes/game';
import { GameOver } from '../scenes/gameOver';
import { MainMenu } from '../scenes/mainMenu';
import { Preloader } from './preloader';

declare const Phaser;

export function Config() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#000000',
        parent: 'phaser-example',
        physics: {
            default: 'matter',
            matter: {
                gravity: {
                    y: 0.3,
                },
            },
        },
        scene: [Preloader, MainMenu, Game, GameOver],
    };
    const game = new Phaser.Game(config);
}
