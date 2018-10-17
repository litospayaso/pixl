export class Level1 extends Phaser.Scene {

    private platforms: Phaser.GameObjects.Group;
    private cursors: Phaser.Input.Keyboard.CursorKeys;
    private player: Phaser.Physics.Arcade.Sprite;
    private stars: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.Text;
    private positionText: Phaser.GameObjects.Text;
    private elevators: Phaser.GameObjects.Group;
    private enemies: Phaser.GameObjects.Group;
    private fireballs: Phaser.GameObjects.Group;
    private enemyWalls: Phaser.Physics.Arcade.StaticGroup;
    private blockPlayer = false;
    private playerHitted = false;
    private score = 0;

    constructor() {
        super({
            key: 'level1',
        });
    }

    // initialize() {}

    // preload() {}

    create() {
        this.score = 0;
        this.createBounds();
        this.createPlatforms();

        this.player = this.physics.add.sprite(100, 1100, 'dude');

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);

        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'playerLeft',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'playerTurn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'droidLeft',
            frames: this.anims.generateFrameNumbers('droid', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'playerRight',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.createEnemies();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 22,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((child) => {

            // child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        }, this);

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.positionText = this.add.text(16, 50, 'x: 0; y: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.elevators, this.setBottomBlocked, null, this);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.enemies, this.enemyWalls, this.changeSpriteDirection);
        this.physics.add.collider(this.player, this.enemies, this.hitAnEnemy, () => !this.playerHitted, this);
        this.physics.add.collider(this.player, this.fireballs, this.hitAFireball, () => !this.playerHitted, this);

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.world.on('worldbounds', (body) => body.gameObject.destroy(), this);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.inputKeyboard();
    }

    update() {
        this.positionText.setText(`x: ${this.player.x};y: ${this.player.y};`);
        this.handleKeyboardDownInput();
        this.enemyShotFireball();
    }

    enemyShotFireball() {
        this.enemies.children.iterate( (enemy) => {
            if (Math.round(enemy.y) === Math.round(this.player.y)) {
                const ball = this.fireballs.create(enemy.x, enemy.y, 'ball').setScale(0.5);
                ball.setVelocityX(enemy.body.velocity.x * 2);
                ball.setCollideWorldBounds(true);
                ball.body.onWorldBounds = true;
                ball.remove = ball.destroy;
            }
        }, this);
    }

    handleKeyboardDownInput() {
        if (!this.blockPlayer) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('playerLeft', true);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);

                this.player.anims.play('playerRight', true);
            } else {
                this.player.setVelocityX(0);

                this.player.anims.play('playerTurn');
            }
        }
    }

    inputKeyboard() {
        this.input.keyboard.on('keydown', (key) => {
            if (key.key === 'ArrowUp' && this.player.body.blocked.down) {
                this.player.setVelocityY(-470);
            }
        });
    }

    collectStar(pl, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.score === 120) {
            this.scene.start('gameover');
        }
    }

    setBottomBlocked(player, platform) {
        if (player.body.touching.down) {
            player.body.velocity.y = Math.abs(platform.body.speed);
            this.player.body.blocked.down = true;
        }
    }

    createBounds() {
        this.cameras.main.setBounds(0, 0, 2400, 1200);
        this.physics.world.setBounds(0, 0, 2400, 1200);

        this.physics.add.group({
            key: 'sky',
            repeat: 6,
            setXY: { x: 400, y: 300, stepX: 400 },
            allowGravity: false,
        });
        this.physics.add.group({
            key: 'sky',
            repeat: 6,
            setXY: { x: 400, y: 900, stepX: 400 },
            allowGravity: false,
        });
    }

    createEnemies() {
        this.enemies = this.physics.add.group();
        this.fireballs = this.physics.add.group({ allowGravity: false });
        this.enemies.create(470, 970, 'droid');
        this.enemies.create(520, 970, 'droid');

        this.enemies.children.iterate((enemy) => {
            enemy.body.velocity.x = -100;
            enemy.anims.play('droidLeft', true);
            enemy.setCollideWorldBounds(true);
        }, this);
    }

    changeSpriteDirection(enemy) {
        if (enemy.body.touching.right || enemy.body.blocked.right) {
            enemy.setVelocityX(-100);
        } else if (enemy.body.touching.left || enemy.body.blocked.left) {
            enemy.setVelocityX(100);
        }
    }

    flashSprite(sprite) {
        let alfa = 0;
        const interval = setInterval(() => {
            sprite.setAlpha(alfa);
            alfa = alfa ? 0 : 1;
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
            this.playerHitted = false;
            sprite.setAlpha(1);
        }, 2500);
    }

    hitAFireball(player, enemy) {
        enemy.disableBody(true, true);
        if (enemy.body.touching.up && player.body.touching.down) {
            this.player.setVelocityY(-470);
        } else {
            this.blockPlayer = this.playerHitted = true;
            this.changeSpriteDirection(player);
            player.setVelocityY(-300);
            this.flashSprite(player);
            setTimeout(() => this.blockPlayer = false, 1000);
            // this.scene.start('level1');
        }
    }

    hitAnEnemy(player, enemy) {
        if (enemy.body.touching.up && player.body.touching.down) {
            this.player.setVelocityY(-470);
            enemy.disableBody(true, true);
        } else {
            this.blockPlayer = this.playerHitted = true;
            this.changeSpriteDirection(enemy);
            this.changeSpriteDirection(player);
            player.setVelocityY(-300);
            this.flashSprite(player);
            setTimeout(() => this.blockPlayer = false, 1000);
            // this.scene.start('level1');
        }
    }

    createPlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.enemyWalls = this.physics.add.staticGroup();
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

        const offsetx = 200 + 16;
        const offsety = - 32;

        this.enemyWalls.create(600 - offsetx, 400 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(600 - offsetx, 1025 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1200 - offsetx, 900 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1800 - offsetx, 800 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1200 - offsetx, 700 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(600 - offsetx, 600 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(200 - offsetx, 500 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(50 - offsetx, 250 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(750 - offsetx, 220 + offsety, 'transparent').visible = false;

        this.enemyWalls.create(600 + offsetx, 400 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(600 + offsetx, 1025 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1200 + offsetx, 900 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1800 + offsetx, 800 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(1200 + offsetx, 700 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(600 + offsetx, 600 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(200 + offsetx, 500 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(50 + offsetx, 250 + offsety, 'transparent').visible = false;
        this.enemyWalls.create(750 + offsetx, 220 + offsety, 'transparent').visible = false;

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
        }, this);
    }

}
