declare const Phaser;

export const Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    platform: undefined,
    cursors: undefined,
    player: undefined,
    stars: undefined,
    scoreText: undefined,
    positionText: undefined,
    score: 0,
    elevators: undefined,

    initialize() {
        Phaser.Scene.call(this, { key: 'level1' });
        window['GAME'] = this;
    },

    preload() {
        this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
    },

    create() {
        this.score = 0;
        this.createBounds();
        this.createPlatforms();

        this.player = this.physics.add.sprite(100, 1100, 'dude');

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 22,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((child) => {

            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.positionText = this.add.text(16, 50, 'x: 0; y: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.elevators, this.setBottomBlocked, null, this);
        this.physics.add.collider(this.stars, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        // this.physics.add.overlap(this.player, this.elevators, this.setBottomBlocked, null, this);
        this.inputKeyboard();
    },

    update() {
        this.positionText.setText(`x: ${this.player.x};y: ${this.player.y};`);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
    },

    inputKeyboard() {
        this.input.keyboard.on('keydown', (key) => {
            if (key.key === 'ArrowUp' && this.player.body.blocked.down) {
                this.player.setVelocityY(-470);
            }
            console.log(key);
        });
    },

    collectStar(pl, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.score === 120) {
            this.scene.start('gameover');
        }
    },

    setBottomBlocked(player) {
        if (player.body.touching.down) {
            this.player.body.blocked.down = true;
            // console.log(this.player);
        }
    },

    createBounds() {
        this.cameras.main.setBounds(0, 0, 2400, 1200);
        this.physics.world.setBounds(0, 0, 2400, 1200);

        this.add.group({
            key: 'sky',
            repeat: 6,
            setXY: { x: 400, y: 300, stepX: 400 },
        });
        this.add.group({
            key: 'sky',
            repeat: 6,
            setXY: { x: 400, y: 900, stepX: 400 },
        });
    },

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        for (let index = 200; index < 2400; index += 400) {
            this.platforms.create(index, 1185, 'ground');
        }
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(600, 1025, 'ground');
        this.platforms.create(1200, 900, 'ground');
        this.platforms.create(1800, 800, 'ground');
        this.platforms.create(1200, 700, 'ground');
        this.platforms.create(600, 600, 'ground');
        this.platforms.create(200, 500, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.elevators = this.physics.add.group({ allowGravity: false });

        this.elevators.create(300, 700, 'ground').setScale(0.25).setImmovable(true).setVelocityY(100);

        this.elevators.children.iterate((child) => {
            this.time.addEvent({
                delay: 4000,
                loop: true,
                callback() {
                    child.body.velocity.y *= -1;
                },
            });
        });
    },

});
