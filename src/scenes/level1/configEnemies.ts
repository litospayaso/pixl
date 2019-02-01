import { LevelProperties } from '../../core/LevelProperties';

export const ConfigEnemies = function(props: LevelProperties) {
    props.enemies.create(470, 970, 'enemiiixls');
    props.enemies.create(520, 970, 'enemiiixls');

    props.spikes.create(900, 1164, 'spikes');
    props.spikes.create(930, 1164, 'spikes');
    props.spikes.create(960, 1164, 'spikes');
    props.spikes.create(990, 1164, 'spikes');
    props.spikes.create(1020, 1164, 'spikes');

    props.enemies.children.iterate((enemy: Phaser.Physics.Arcade.Sprite) => {
        enemy.body.velocity.x = -100;
        enemy.anims.play('enemiiixlsLeft', true);
        enemy.setCollideWorldBounds(true);
        enemy.on('animationcomplete', (anim, frame) => {
            if (anim.key === 'enemiiixlsDie') {
                enemy.disableBody(true, true);
                enemy.destroy();
            }
        }, enemy);
    }, this);
};
