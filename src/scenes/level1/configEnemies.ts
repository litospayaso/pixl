import { LevelProperties } from '../../core/LevelProperties';

export const configEnemies = function(props: LevelProperties) {
    props.enemies.create(470, 970, 'droid');
    props.enemies.create(520, 970, 'droid');

    props.enemies.children.iterate((enemy: Phaser.Physics.Arcade.Sprite) => {
        enemy.body.velocity.x = -100;
        enemy.anims.play('droidLeft', true);
        enemy.setCollideWorldBounds(true);
    }, this);
};
