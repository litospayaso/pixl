import { LevelProperties } from './LevelProperties';

export const ConfigControls = function(props: LevelProperties) {
  props.scene.input.addPointer();
  props.scene.input.addPointer();
  props.scene.input.addPointer();
  props.scene.input.addPointer();
  props.scene.input.addPointer();
  props.scene.add.image(80, Number(props.scene.game.config.height) - 80, 'leftControl').setScrollFactor(0).setScale(1).setInteractive()
    .on('pointerover', () => props.cursors.left.isDown = true)
    .on('pointerout', () => props.cursors.left.isDown = false);
  props.scene.add.image(250, Number(props.scene.game.config.height) - 80, 'rightControl').setScrollFactor(0).setScale(1).setInteractive()
    .on('pointerover', () => props.cursors.right.isDown = true)
    .on('pointerout', () => props.cursors.right.isDown = false);
  props.scene.add.image(Number(props.scene.game.config.width) - 80, Number(props.scene.game.config.height) - 80, 'actionControl').setScrollFactor(0).setScale(1).setInteractive()
    .on('pointerover', () => props.cursors.up.isDown = true)
    .on('pointerout', () => props.cursors.up.isDown = false)
    .on('pointerover', () => {
      // if (this.levelProperties.player.body.blocked.down) {
      //     this.levelProperties.player.setVelocityY(-350);
      // }
    });
};
