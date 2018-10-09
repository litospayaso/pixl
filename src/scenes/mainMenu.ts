declare const Phaser;

export const MainMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize() {
            Phaser.Scene.call(this, { key: 'mainmenu' });
            window['MENU'] = this;
        },

    create() {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');

        const bg = this.add.image(0, 0, 'buttonBG');
        const text = this.add.text(-5, -5, 'Play');

        const container = this.add.container(400, 300, [bg, text]);

        bg.setInteractive();

        bg.once('pointerup', function() {

            this.scene.start('game');

        }, this);
    },
});
