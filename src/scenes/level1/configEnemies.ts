import { LevelProperties } from '../../core/LevelProperties';

export const ConfigEnemies = function(props: LevelProperties) {
    props.enemies.create(470, 970, 'enemiiixls');
    props.enemies.create(520, 970, 'enemiiixls');

    props.enemies.children.iterate((enemy: Phaser.Physics.Arcade.Sprite) => {
        enemy.body.velocity.x = -100;
        enemy.anims.play('enemiiixlsLeft', true);
        enemy.setCollideWorldBounds(true);
    }, this);
};
