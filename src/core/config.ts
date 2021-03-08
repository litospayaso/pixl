import levelData from '@/assets/levels/level1/level1.json';
import { DialogsModal } from '@/scenes/dialogsModal';
import { Example } from '@/scenes/example';
import { GameOver } from '@/scenes/gameOver';
import { Level } from '@/scenes/level/level';
import { MainMenu } from '@/scenes/mainMenu';
import { PauseModal } from '@/scenes/pauseModal';
import { Preloader } from './preloader';

export class Config extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.WEBGL,
            width: 800,
            height: 600,
            parent: 'phaser-example',
            backgroundColor: '#4f3a39',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 600 },
                    // debug: true,
                    // debug: false,
                },
            },
            scene: [new Preloader(), MainMenu, new Level(levelData), GameOver, DialogsModal, PauseModal],
            // scene: [new Preloader(), Example ],
        });
    }
}
