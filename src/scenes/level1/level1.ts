import { animateSprites } from '../../core/animateSprites';
import { LevelProperties } from '../../core/LevelProperties';
import { PlayerObject } from '../../core/PlayerObject';
import { configColliders } from './configColliders';
import { configEnemies } from './configEnemies';
import { configItems } from './configItems';
import { configPlatforms } from './configPlatforms';
import { configPlayer } from './configPlayer';

export class Level1 extends Phaser.Scene {

    private scoreText: Phaser.GameObjects.Text;
    private positionText: Phaser.GameObjects.Text;
    private levelProperties: LevelProperties;
    private score = 0;

    private animateSprites = animateSprites.bind(this);
    private configColliders = configColliders.bind(this);
    private configEnemies = configEnemies.bind(this);
    private configItems = configItems.bind(this);
    private configPlatforms = configPlatforms.bind(this);
    private configPlayer = configPlayer.bind(this);

    constructor() {
        super({
            key: 'level1',
        });
    }

    // initialize() {}

    preload() {
        this.levelProperties = new LevelProperties(this);
    }

    initLevel() {
        this.animateSprites();
        this.configPlatforms(this.levelProperties);
        this.configEnemies(this.levelProperties);
        this.configPlayer(this.levelProperties);
        this.configItems(this.levelProperties);
        this.configColliders(this.levelProperties);
    }

    create() {
        this.score = 0;
        this.initLevel();

        this.add.sprite(770, 30, 'uiButtons').setScrollFactor(0).setScale(2.5).setFrame(11).setInteractive().on('pointerup', () => {
            this.scene.launch('dialogsModal', {text: 'hola'});
            this.scene.pause();
        });

        this.cameras.main.startFollow(this.levelProperties.player, true, 0.09, 0.09);

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
        this.positionText = this.add.text(16, 50, 'x: 0; y: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);

        this.inputKeyboard();
    }

    update() {
        this.positionText.setText(`x: ${this.levelProperties.player.x};y: ${this.levelProperties.player.y};`);
        this.handleKeyboardDownInput();
        this.enemyShotFireball();
    }

    enemyShotFireball() {
        this.levelProperties.enemies.children.iterate( (enemy) => {
            if (Math.round(enemy.y + (enemy.height / 2)) === Math.round(this.levelProperties.player.y) + (this.levelProperties.player.height / 2)) {
                if (!enemy.hasShotted) {
                    enemy.hasShotted = true;
                    const ball = this.levelProperties.fireballs.create(enemy.x, enemy.y, 'ball').setScale(0.5);
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
        if (!this.levelProperties.player.blockPlayer) {
            if (this.levelProperties.cursors.left.isDown) {
                this.levelProperties.player.setVelocityX(-160);
                this.levelProperties.player.anims.play('playerLeft', true);
            } else if (this.levelProperties.cursors.right.isDown) {
                this.levelProperties.player.setVelocityX(160);

                this.levelProperties.player.anims.play('playerRight', true);
            } else {
                this.levelProperties.player.setVelocityX(0);

                this.levelProperties.player.anims.play('playerTurn');
            }
        }
    }

    inputKeyboard() {
        this.input.keyboard.on('keydown', (key) => {
            if (key.key === 'ArrowUp' && this.levelProperties.player.body.blocked.down) {
                this.levelProperties.player.setVelocityY(-470);
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
            this.levelProperties.player.body.blocked.down = true;
        }
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
            this.levelProperties.player.playerHitted = false;
            sprite.setAlpha(1);
        }, 2500);
    }

    hitAFireball(player: PlayerObject, enemy: Phaser.Physics.Arcade.Sprite) {
        enemy.disableBody(true, true);
        if (enemy.body.touching.up && player.body.touching.down) {
            this.levelProperties.player.setVelocityY(this.levelProperties.cursors.up.isDown ? -470 : -220);
        } else {
            player.blockPlayer = player.playerHitted = true;
            this.changeSpriteDirection(player);
            player.setVelocityY(-300);
            this.flashSprite(player);
            setTimeout(() => player.blockPlayer = false, 1000);
            // this.scene.start('level1');
        }
    }

    hitAnEnemy(player: PlayerObject, enemy: Phaser.Physics.Arcade.Sprite) {
        if (enemy.body.touching.up && player.body.touching.down) {
            player.setVelocityY(this.levelProperties.cursors.up.isDown ? -470 : -220);
            enemy.destroy();
            // enemy.disableBody(true, true);
        } else {
            player.blockPlayer = player.playerHitted = true;
            this.changeSpriteDirection(enemy);
            this.changeSpriteDirection(player);
            player.setVelocityY(-300);
            this.flashSprite(player);
            setTimeout(() => player.blockPlayer = false, 1000);
            // this.scene.start('level1');
        }
    }

}
