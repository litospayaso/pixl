export class Preloader extends Phaser.Scene {

    constructor() {
        super({
            key: 'preloader',
        });
    }

    preload() {
        this.load.image('buttonBG', 'assets/sprites/button-bg.png');
        this.load.image('ayu', 'assets/sprites/rick.png');
        this.load.image('ball', 'assets/sprites/pangball.png');
        this.load.image('level1-background', 'assets/arts/level1-background.png');
        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('star', 'assets/sprites/star.png');
        this.load.image('player', 'assets/sprites/player.png');
        this.load.image('transparent', 'assets/sprites/transparent.png');
        this.load.image('bucket', 'assets/sprites/bucket.png');
        this.load.spritesheet('pixelBall', 'assets/sprites/ball.png', { frameWidth: 9, frameHeight: 10 });
        this.load.spritesheet('uiButtons', 'assets/tiles/buttonsUI.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enemiiixls', 'assets/sprites/enemiiixls.png', { frameWidth: 20, frameHeight: 24 });
        this.load.spritesheet('droid', 'assets/sprites/droid.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.scene.start('level1');
    }

}
