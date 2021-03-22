import { ILevelInterface, ItemImterface } from '@/assets/levels/IlevelInterface';
// import levelData from '@/assets/levels/level1.json';
import { AnimateSprites } from '@/core/AnimateSprites';
import { ConfigControls } from '@/core/configControls';
import { LevelProperties } from '@/core/LevelProperties';
import { colorWheel } from '@/core/Piiixls';
import { PlayerObject } from '@/core/PlayerObject';
import { ConfigColliders } from './ConfigColliders';
import { ConfigEnemies } from './ConfigEnemies';
import { ConfigItems } from './ConfigItems';
import { ConfigPlatforms } from './ConfigPlatforms';
import { ConfigPlayer } from './ConfigPlayer';

export class Level extends Phaser.Scene {

  private scoreText: Phaser.GameObjects.Text;
  private positionText: Phaser.GameObjects.Text;
  private levelProperties: LevelProperties;
  private map: Phaser.Tilemaps.Tilemap;
  private score = 0;

  private animateSprites = AnimateSprites.bind(this);
  private configColliders = ConfigColliders.bind(this);
  private configEnemies = ConfigEnemies.bind(this);
  private configItems = ConfigItems.bind(this);
  private configPlatforms = ConfigPlatforms.bind(this);
  private configPlayer = ConfigPlayer.bind(this);
  private configControls = ConfigControls.bind(this);
  private lastButtonPressed = 'Right';
  private levelData: ILevelInterface;
  private jumpTimer = 0;

  private itemsAlreadyGetted = {
    palette: false,
    star: false,
    book: false,
  };

  constructor(levelData: ILevelInterface) {

    super({
      key: levelData.properties.find((e) => e.name === 'key').value,
    });
    this.levelData = levelData;
  }
  // initialize() {}

  preload() {
    this.levelProperties = new LevelProperties(this, this.levelData);
  }

  initLevel() {
    this.animateSprites(this.levelProperties);
    this.setLevelProperties(this.levelProperties);
    this.configPlatforms(this.levelProperties);
    this.configEnemies(this.levelProperties);
    this.configItems(this.levelProperties);
    this.configPlayer(this.levelProperties);
    this.configColliders(this.levelProperties);
    this.configControls(this.levelProperties);
    // this.handleBrowserFocus();
  }

  setLevelProperties(props: LevelProperties) {
    props.scene.cameras.main.setBounds(0, 0, props.levelData.width * props.levelData.tilewidth, props.levelData.height * props.levelData.tileheight + 100);
    props.scene.physics.world.setBounds(0, 0, props.levelData.width * props.levelData.tilewidth, props.levelData.height * props.levelData.tileheight);
  }

  create() {
    const levelName = this.levelData.properties.find((e) => e.name === 'key').value;
    this.cameras.main.fadeIn(1000);
    this.score = 0;
    this.initLevel();

    this.add.sprite(Number(this.game.config.width) - 30, 30, 'uiButtons').setScrollFactor(0).setScale(2.5).setFrame(11).setInteractive().on('pointerup', () => {
      this.scene.launch('pauseModal', { scene: levelName });
      this.scene.pause();
    });

    this.cameras.main.startFollow(this.levelProperties.player, true, 0.09, 0.09);
    // // this.cameras.main.startFollow(this.levelProperties.player, true, 0.09, 0.09).zoom = 1.7;

    // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#0000FF', fontFamily: 'pixel' }).setScrollFactor(0);
    // this.positionText = this.add.text(16, 50, 'x: 0; y: 0', { fontSize: '32px', fill: '#0000FF' }).setScrollFactor(0);

    this.inputKeyboard();

    this.cameras.main.on('camerafadeoutcomplete', () => this.scene.start(this.levelData.properties.find((e) => e.name === 'key').value));
  }

  update() {
    // this.positionText.setText(`x: ${this.levelProperties.player.x};y: ${this.levelProperties.player.y};`);
    this.handleKeyboardDownInput();
    this.enemyShotFireball();
  }

  enemyShotFireball() {
    this.levelProperties.enemies.children.iterate((enemy) => {
      // if (Math.round(enemy.y + (enemy.height / 2)) > 900)
      //     console.log(`%c enemy`, `background: #df03fc; color: #f8fc03`, Math.round(enemy.y + (enemy.height / 2)));
      // console.log(`%c player`, `background: #df03fc; color: #f8fc03`, Math.floor((this.levelProperties.player.y) + (this.levelProperties.player.height / 2));
      if (Math.round(enemy.y + (enemy.height / 2)) === Math.floor((this.levelProperties.player.y) + (this.levelProperties.player.height / 2)) - 2) {
        if (!enemy.hasShotted) {
          enemy.hasShotted = true;
          const ball = this.levelProperties.fireballs.create(enemy.x, enemy.y, 'pixelBall').setScale(1.5);
          ball.anims.play('shootPixelBall');
          ball.setVelocityX(enemy.body.velocity.x * 2);
          ball.setCollideWorldBounds(true);
          ball.body.onWorldBounds = true;
          ball.remove = ball.destroy;
          this.levelProperties.scene.time.addEvent({
            delay: 1500,
            loop: false,
            callback() {
              enemy.hasShotted = false;
            },
          });
        }
      }
    }, this);
  }

  handleKeyboardDownInput() {
    if (!this.levelProperties.player.blockPlayer) {
      if (this.levelProperties.cursors.up.isDown) {
        if (this.levelProperties.player.body.blocked.down && this.jumpTimer === 0) {
          this.jumpTimer = 1;
          this.levelProperties.player.setVelocityY(-250);
        } else if (this.jumpTimer > 0 && this.jumpTimer < 14) {
          this.jumpTimer++;
          this.levelProperties.player.setVelocityY(-250 + (this.jumpTimer * -7));
        } else {
          this.jumpTimer = 0;
        }
      } else {
        this.jumpTimer = 0;
      }
      if (this.levelProperties.cursors.left.isDown) {
        this.lastButtonPressed = 'Left';
        this.levelProperties.player.setVelocityX(-160);
        this.levelProperties.player.anims.play('piiixlsLeft', true);
      } else if (this.levelProperties.cursors.right.isDown) {
        this.lastButtonPressed = 'Right';
        this.levelProperties.player.setVelocityX(160);
        this.levelProperties.player.anims.play('piiixlsRight', true);
      } else {
        if (!this.levelProperties.player.isInAPlatform) {
          this.levelProperties.player.setVelocityX(0);
        }
        this.levelProperties.player.anims.play(`piiixlsTurn${this.lastButtonPressed}`, true);
      }
    }
  }

  inputKeyboard() {
    this.input.keyboard.on('keydown', (key) => {
      if (key.key === 'ArrowUp') {
        this.levelProperties.cursors.up.isDown = true;
      }
    });
    this.input.keyboard.on('keyup', (key) => {
      if (key.key === 'ArrowUp') {
        this.levelProperties.cursors.up.isDown = false;
      }
    });
  }

  itemCollision(pl: PlayerObject, item: ItemImterface) {
    const levelName = this.levelData.properties.find((e) => e.name === 'key').value;
    switch (item.itemType) {
      case 'bucket':
        pl.piiixls.paint(item.color);
        this.updateColorWalls();
        break;
      case 'pixel':
        item.disableBody(true, true);
        pl.piiixls.addColor(item.color);
        this.updateColorWalls();
        break;
      case 'star':
        item.disableBody(true, true);
        if (!this.itemsAlreadyGetted.star) {
          const authorInfo = JSON.parse(this.levelData.properties.find((e) => e.name === 'authorInfo').value);
          this.scene.launch('dialogsModal', { text: authorInfo, scene: levelName });
          this.levelProperties.cursors.left.isDown = false;
          this.levelProperties.cursors.right.isDown = false;
          this.scene.pause();
        }
        this.itemsAlreadyGetted.star = true;
        break;
      case 'book':
        item.disableBody(true, true);
        if (!this.itemsAlreadyGetted.book) {
          const periodInfo = JSON.parse(this.levelData.properties.find((e) => e.name === 'periodInfo').value);
          this.scene.launch('dialogsModal', { text: periodInfo, scene: levelName });
          this.levelProperties.cursors.left.isDown = false;
          this.levelProperties.cursors.right.isDown = false;
          this.scene.pause();
        }
        this.itemsAlreadyGetted.book = true;
        break;
      case 'palette':
        item.disableBody(true, true);
        if (!this.itemsAlreadyGetted.palette) {
          const pieceInfo = JSON.parse(this.levelData.properties.find((e) => e.name === 'pieceInfo').value);
          this.scene.launch('dialogsModal', { text: pieceInfo, scene: levelName });
          this.levelProperties.cursors.left.isDown = false;
          this.levelProperties.cursors.right.isDown = false;
          this.scene.pause();
        }
        this.itemsAlreadyGetted.palette = true;
        break;
    }
  }

  collideFinishPlatform(player: PlayerObject, platform: Phaser.Physics.Arcade.Sprite) {
    if (player.piiixls.getColor() === parseInt(platform.body['color'], 10)) {
      this.scene.start('gameover');
    }
  }

  setBottomBlocked(player: Phaser.Physics.Arcade.Sprite, platform: Phaser.Physics.Arcade.Sprite) {
    if (player.body.touching.down) {
      player.body.velocity.y = Math.abs(platform.body['speed']);
      this.levelProperties.player.body.blocked.down = true;
    }
  }

  removeLeftRightSpeed(player: Phaser.Physics.Arcade.Sprite, platform: Phaser.Physics.Arcade.Sprite) {
    if (player.body.touching.left || player.body.touching.right) {
      this.levelProperties.player.setVelocityX(0);
    }
    // setTimeout(() => this.levelProperties.player.isInAPlatform = false, 500);
  }

  directionBlocked(player: Phaser.Physics.Arcade.Sprite, platform: Phaser.Physics.Arcade.Sprite) {
    if (player.body.touching.down) {
      this.levelProperties.player.isInAPlatform = true;
      this.levelProperties.player.setVelocityX(Number(platform.body.velocity.x));
      this.levelProperties.player.body.blocked.down = true;
    }
    this.levelProperties.scene.time.addEvent({
      delay: 500,
      loop: false,
      callbackScope: this,
      callback() {
        this.levelProperties.player.isInAPlatform = false;
      },
    });
  }

  changeSpriteDirection(sprite: Phaser.Physics.Arcade.Sprite) {
    if (sprite.body.touching.right || sprite.body.blocked.right) {
      sprite.setVelocityX(-100);
      if (sprite.texture.key === 'enemiiixls' && sprite.anims.currentFrame.textureFrame < 10) {
        sprite.anims.play('enemiiixlsLeft', true);
      }
    } else if (sprite.body.touching.left || sprite.body.blocked.left) {
      sprite.setVelocityX(100);
      if (sprite.texture.key === 'enemiiixls' && sprite.anims.currentFrame.textureFrame < 10) {
        sprite.anims.play('enemiiixlsRight', true);
      }
    }
  }

  flashSprite(sprite: Phaser.Physics.Arcade.Sprite) {
    let alfa = 0;
    const interval = setInterval(() => {
      sprite.setAlpha(alfa);
      alfa = alfa ? 0 : 1;
    }, 100);
    this.levelProperties.scene.time.addEvent({
      delay: 2500,
      loop: false,
      callbackScope: this,
      callback() {
        clearInterval(interval);
        this.levelProperties.player.playerHitted = false;
        sprite.setAlpha(1);
      },
    });
  }

  hitAFireball(player: PlayerObject, enemy: Phaser.Physics.Arcade.Sprite) {
    enemy.disableBody(true, true);
    if (enemy.body.touching.up && player.body.touching.down) {
      this.levelProperties.player.setVelocityY(this.levelProperties.cursors.up.isDown ? -350 : -220);
    } else {
      if (player.piiixls.getColor() === -1) {
        player.anims.play('piiixlsDie');
        // player.disableBody(true);
        // this.cameras.main.fadeOut(1500);
      } else {
        player.anims.play('piiixlsHit');
        this.levelProperties.player.piiixls.paint(-1);
        player.blockPlayer = player.playerHitted = true;
        this.changeSpriteDirection(player);
        player.setVelocityY(-300);
        this.flashSprite(player);
        this.levelProperties.scene.time.addEvent({
          delay: 1000,
          loop: false,
          callbackScope: this,
          callback() {
            player.blockPlayer = false;
          },
        });
        this.updateColorWalls();
        // this.scene.start('level1');
      }
    }
  }

  hitSpikes(player: PlayerObject, spikes: Phaser.Physics.Arcade.Sprite) {
    if (player.piiixls.getColor() === -1) {
      player.anims.play('piiixlsHit');
      player.piiixls.paint(-1);
      player.blockPlayer = player.playerHitted = true;
      this.changeSpriteDirection(player);
      player.setVelocityY(-300);
      this.flashSprite(player);
      this.levelProperties.scene.time.addEvent({
        delay: 200,
        loop: false,
        callbackScope: this,
        callback() {
          player.disableBody(true);
          this.cameras.main.fadeOut(1500);
          },
      });
    } else {
      player.anims.play('piiixlsHit');
      this.levelProperties.player.piiixls.paint(-1);
      player.blockPlayer = player.playerHitted = true;
      this.changeSpriteDirection(player);
      player.setVelocityY(-300);
      this.flashSprite(player);
      this.levelProperties.scene.time.addEvent({
        delay: 1000,
        loop: false,
        callback() {
          player.blockPlayer = false;
        },
      });
      // setTimeout(() => player.blockPlayer = false, 1000);
      this.updateColorWalls();
      // this.scene.start('level1');
    }
  }

  hitAnEnemy(player: PlayerObject, enemy: Phaser.Physics.Arcade.Sprite) {
    if (enemy.body.touching.up && player.body.touching.down) {
      player.setVelocityY(this.levelProperties.cursors.up.isDown ? -350 : -220);
      enemy.anims.play('enemiiixlsDie');
      // enemy.destroy();
      // enemy.disableBody(true, true);
    } else {
      if (player.piiixls.getColor() === -1) {
        player.anims.play('piiixlsHit');
        player.piiixls.paint(-1);
        player.blockPlayer = player.playerHitted = true;
        this.changeSpriteDirection(enemy);
        this.changeSpriteDirection(player);
        player.setVelocityY(-300);
        this.flashSprite(player);
        this.levelProperties.scene.time.addEvent({
          delay: 200,
          loop: false,
          callbackScope: this,
          callback() {
            player.disableBody(true);
            this.cameras.main.fadeOut(1500);
            },
        });
      } else {
        player.anims.play('piiixlsHit');
        player.piiixls.paint(-1);
        player.blockPlayer = player.playerHitted = true;
        this.changeSpriteDirection(enemy);
        this.changeSpriteDirection(player);
        player.setVelocityY(-300);
        this.flashSprite(player);
        this.levelProperties.scene.time.addEvent({
          delay: 1000,
          loop: false,
          callbackScope: this,
          callback() {
            player.blockPlayer = false;
          },
        });
        this.updateColorWalls();
        // this.scene.start('level1');
      }
    }
  }

  handleBrowserFocus() {
    const levelName = this.levelData.properties.find((e) => e.name === 'key').value;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.scene.launch('pauseModal', { scene: levelName });
        this.scene.pause();
      }
    }, false);
  }

  updateColorWalls() {
    if (this.levelProperties.levelData.layers.find((e) => e.name === 'colorWalls')) {
      const minData = this.levelProperties.levelData.layers.find((e) => e.name === 'colorWalls').data.filter((e) => e !== 0).sort((a, b) => a - b).filter((value, index, array) => array.indexOf(value) === index);
      minData.forEach((tile) => {
        (this.levelProperties.colorWalls as any).setCollision(tile, tile !== minData[0] + this.levelProperties.player.piiixls.getColor());
      });
    }
  }

}
