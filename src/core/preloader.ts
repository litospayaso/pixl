export class Preloader extends Phaser.Scene {

    constructor() {
        super({
            key: 'preloader',
        });
    }

    preload() {
        this.load.image('buttonBG', 'assets/sprites/button-bg.png');
        this.load.image('ayu', 'assets/sprites/rick.png');
        // this.load.image('ball', 'assets/sprites/pangball.png');
        this.load.image('level1-background', 'assets/levels/level1/level1-background-image.png');
        this.load.image('level3-background', 'assets/levels/level3/level3-background-image.png');
        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('spikes', 'assets/sprites/spikes.png');
        this.load.image('player', 'assets/sprites/player.png');
        this.load.image('transparent', 'assets/sprites/transparent.png');
        this.load.image('leftControl', 'assets/sprites/controllers/left.png');
        this.load.image('rightControl', 'assets/sprites/controllers/right.png');
        this.load.image('actionControl', 'assets/sprites/controllers/action.png');
        this.load.image('pause_menu', 'assets/sprites/pause_menu.png');
        this.load.spritesheet('all_tiles', 'assets/tiles/new-tiles.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('items_tiles', 'assets/sprites/items.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('pixelBall', 'assets/sprites/ball.png', { frameWidth: 9, frameHeight: 10 });
        this.load.spritesheet('sparkles', 'assets/sprites/sparkles.png', { frameWidth: 90, frameHeight: 76 });
        this.load.spritesheet('uiButtons', 'assets/tiles/buttonsUI.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enemiiixls', 'assets/sprites/enemiiixls.png', { frameWidth: 20, frameHeight: 24 });
        // this.load.image('ground_tiles', 'assets/tiles/new-tiles.png');
        this.load.image('ground_tiles', 'assets/tiles/ground-pixl.png');

        this.load.image('ground_1x1', 'assets/example/ground_1x1.png');
        this.load.spritesheet('coin', 'assets/example/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'assets/example/tile-collision-test.json');
        // this.load.tilemapTiledJSON(`level1-map`, 'assets/levels/level1/level1.json');
        this.load.tilemapTiledJSON(`level3-map`, 'assets/levels/level3/level3.json');
        // this.load.image('player', 'assets/example/phaser-dude.png');
    }

    create() {
        this.scene.start('level3');
        // this.scene.start('level1');
        // this.scene.start('example');
    }

}
