declare const Phaser;

export const Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize() {
        Phaser.Scene.call(this, { key: 'preloader' });
    },

    preload() {
        this.load.image('buttonBG', 'assets/sprites/button-bg.png');
        this.load.image('ayu', 'assets/sprites/rick.png');
        this.load.image('ball', 'assets/sprites/pangball.png');
    },

    create() {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.scene.start('mainmenu');
    },

});
