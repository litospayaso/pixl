import { LevelProperties } from './LevelProperties';

export const ConfigControls = function(props: LevelProperties) {
    props.scene.add.image(50, 550, 'leftControl').setScrollFactor(0).setScale(0.5).setInteractive()
        .on('pointerover', () => props.cursors.left.isDown = true)
        .on('pointerout', () => props.cursors.left.isDown = false);
    props.scene.add.image(150, 550, 'rightControl').setScrollFactor(0).setScale(0.5).setInteractive()
        .on('pointerover', () => props.cursors.right.isDown = true)
        .on('pointerout', () => props.cursors.right.isDown = false);
    props.scene.add.image(750, 550, 'actionControl').setScrollFactor(0).setScale(0.5).setInteractive()
        .on('pointerover', () => props.cursors.up.isDown = true)
        .on('pointerout', () => props.cursors.up.isDown = false)
        .on('pointerup', () => {
            if (this.levelProperties.player.body.blocked.down) {
                this.levelProperties.player.setVelocityY(-470);
            }
        });
};
