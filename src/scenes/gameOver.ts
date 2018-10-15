export class GameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameover',
        });
    }

    create() {
        console.log('%c GameOver ', 'background: green; color: white; display: block;');

        this.add.sprite(400, 300, 'ayu');

        this.add.text(300, 500, 'Game Over - Click to start restart', { font: '16px Courier', fill: '#00ff00' });

        this.input.once('pointerup', (event) => {
            this.scene.start('mainmenu');
        }, this);
    }

}
