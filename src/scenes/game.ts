declare const Phaser;

export const Game = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game() {
            Phaser.Scene.call(this, { key: 'game' });
            window['GAME'] = this;

            this.controls;
        },

    create: function () {
        console.log('%c Game ', 'background: green; color: white; display: block;');

        this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);

        //  Add in a stack of balls

        for (var i = 0; i < 64; i++) {
            var ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-600, 0), 'ball');
            ball.setCircle();
            ball.setFriction(0.005);
            ball.setBounce(1);
        }

        var cursors = this.input.keyboard.createCursorKeys();

        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.add.text(0, 0, 'Use Cursors to scroll camera.\nClick to Quit', { font: '18px Courier', fill: '#00ff00' }).setScrollFactor(0);

        this.input.once('pointerup', function () {

            this.scene.start('gameover');

        }, this);
    },

    update: function (time, delta) {
        this.controls.update(delta);
    }

});
