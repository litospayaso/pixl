import { DialogsModal } from '../scenes/dialogsModal';
import { GameOver } from '../scenes/gameOver';
import { Level1 } from '../scenes/level1/level1';
import { MainMenu } from '../scenes/mainMenu';
import { PauseModal } from '../scenes/pauseModal';
import { Preloader } from './preloader';

export class Config extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-example',
            backgroundColor: '#c7bdb8',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 600 },
                    debug: false,
                },
            },
            scene: [Preloader, MainMenu, Level1, GameOver, DialogsModal, PauseModal],
        });
    }
}
