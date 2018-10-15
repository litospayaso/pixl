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
        this.load.image('tiles-1', 'assets/sprites/tiles-1.png');
        this.load.image('starSmall', 'assets/sprites/star.png');
        this.load.image('starBig', 'assets/sprites/star2.png');
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('sky', 'assets/sprites/sky.png');
        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('star', 'assets/sprites/star.png');
        this.load.image('bomb', 'assets/sprites/bomb.png');
        this.load.image('transparent', 'assets/sprites/transparent.png');
        this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('droid', 'assets/sprites/droid.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.scene.start('level1');
    }

}
