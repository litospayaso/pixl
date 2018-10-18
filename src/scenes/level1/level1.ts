import { createLevel } from './createLevel';

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

        this.add.sprite(770, 30, 'uiButtons').setScrollFactor(0).setScale(2.5).setFrame(11).setInteractive().on('pointerup', () => {
            this.scene.launch('dialogsModal', {text: 'hola'});
            this.scene.pause();
        });

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
            if (Math.round(enemy.y + (enemy.height / 2)) === Math.round(this.player.y) + (this.player.height / 2)) {
                if (!enemy.hasShotted) {
                    enemy.hasShotted = true;
                    const ball = this.fireballs.create(enemy.x, enemy.y, 'ball').setScale(0.5);
                    ball.setVelocityX(enemy.body.velocity.x * 2);
                    ball.setCollideWorldBounds(true);
                    ball.body.onWorldBounds = true;
                    ball.remove = ball.destroy;
                    setTimeout(() => enemy.hasShotted = false, 1500);
                }
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

    collectStar(pl: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        if (this.score === 120) {
            this.scene.start('gameover');
        }
    }

    setBottomBlocked(player: Phaser.Physics.Arcade.Sprite, platform: Phaser.Physics.Arcade.Sprite) {
        if (player.body.touching.down) {
            player.body.velocity.y = Math.abs(platform.body['speed']);
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

        this.enemies.children.iterate((enemy: Phaser.Physics.Arcade.Sprite) => {
            enemy.body.velocity.x = -100;
            enemy.anims.play('droidLeft', true);
            enemy.setCollideWorldBounds(true);
        }, this);
    }

    changeSpriteDirection(sprite: Phaser.Physics.Arcade.Sprite) {
        if (sprite.body.touching.right || sprite.body.blocked.right) {
            sprite.setVelocityX(-100);
        } else if (sprite.body.touching.left || sprite.body.blocked.left) {
            sprite.setVelocityX(100);
        }
    }

    flashSprite(sprite: Phaser.Physics.Arcade.Sprite) {
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

    hitAFireball(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
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

    hitAnEnemy(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
        if (enemy.body.touching.up && player.body.touching.down) {
            this.player.setVelocityY(this.cursors.up.isDown ? -470 : -220);
            enemy.destroy();
            // enemy.disableBody(true, true);
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
        this.elevators = this.physics.add.group({ allowGravity: false });
        createLevel(this.platforms, this.enemyWalls, this.elevators, this);
    }

}
