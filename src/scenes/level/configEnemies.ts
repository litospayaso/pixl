import { LevelProperties } from '@/core/LevelProperties';

export const ConfigEnemies = function(props: LevelProperties) {

    props.levelData.layers.find((e) => e.name === 'enemies').objects.forEach((e) => {
        props.enemies.create(e.x, e.y, 'enemiiixls').setScale(1.5);
    });

    let x = 0;
    let y = 0;
    let tilex = props.levelData.tilewidth - 1;
    let tiley = props.levelData.tileheight - 1;
    props.levelData.layers.find((e) => e.name === 'spikes').data.forEach((tile) => {
        if (tile !== 0) {
            if (tile < 40 ||  tile > 41) {
                const pike = props.spikes.create(x + props.levelData.tilewidth / 2, y + props.levelData.tileheight / 2, 'all_tiles').setFrame(tile - 1).setSize(32, 6);
                if (tile === 39) {
                    pike.setOffset(0, 24);
                } else {
                    pike.setOffset(0, 0);
                }
            } else {
                const pike = props.spikes.create(x + props.levelData.tilewidth / 2, y + props.levelData.tileheight / 2, 'all_tiles').setFrame(tile - 1).setSize(6, 32);
                if (tile === 40) {
                    pike.setOffset(0, 0);
                } else {
                    pike.setOffset(24, 0);
                }
            }
        }
        if (tilex === props.levelData.tilewidth * props.levelData.width - 1) {
            tilex = props.levelData.tilewidth - 1;
            x = 0;
            y = tiley;
            tiley += props.levelData.tileheight;
        } else {
            x += props.levelData.tilewidth;
            tilex += props.levelData.tilewidth;
            // y -= tileSize;
        }
    });

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
