import { LevelProperties } from '@/core/LevelProperties';
import { PlayerObject } from '@/core/PlayerObject';

export const ConfigColliders = function(props: LevelProperties) {
    props.player.setCollideWorldBounds(true);
    props.scene.physics.world.setBoundsCollision(true, true, true, false);

    (props.platforms as any).setCollisionBetween(1, 500);
    (props.platforms as any).setCollision(109, false);
    (props.platforms as any).setCollision(110, false);
    if (props.enemyWalls) {
      (props.enemyWalls as any).setCollisionBetween(1, 500);
    }

    if (props.levelData.layers.find((e) => e.name === 'colorWalls')) {
      const minData = props.levelData.layers.find((e) => e.name === 'colorWalls').data.filter((e) => e !== 0).sort((a, b) => a - b).filter ((value, index, array) => array.indexOf (value) === index);
      minData.filter((e) => e !== minData[0] + props.player.piiixls.getColor()).forEach((tile) => {
        (props.colorWalls as any).setCollision(tile);
      });
    }
    // props.colorWallsCollider = (props.colorWalls as any).setCollisionByProperty({color: props.player.piiixls.getNonCollidingItems()});
    props.scene.physics.add.collider(props.player, props.platforms);
    // props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: Phaser.Physics.Arcade.Sprite) => player.piiixls.getColor() !== wall.body['color']);

    // props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: any) => console.log(`%c wall`, `background: #df03fc; color: #f8fc03`, wall), this);
    props.scene.physics.add.collider(props.player, props.colorWalls);
    // props.scene.physics.add.collider(props.player, props.platforms, this.removeLeftRightSpeed, null, this);
    // props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: Phaser.Physics.Arcade.Sprite) => player.piiixls.getColor() !== wall.body['color']);

    props.scene.physics.add.collider(props.player, props.elevators, this.setBottomBlocked, null, this);
    props.scene.physics.add.collider(props.player, props.shifters, this.directionBlocked, null, this);
    // props.scene.physics.add.collider(props.items, props.platforms);
    props.scene.physics.add.collider(props.enemies, props.platforms, this.changeSpriteDirection);
    props.scene.physics.add.collider(props.enemies, props.enemyWalls, this.changeSpriteDirection);
    props.scene.physics.add.collider(props.player, props.enemies, this.hitAnEnemy, () => !props.player.playerHitted, this);
    props.scene.physics.add.collider(props.player, props.fireballs, this.hitAFireball, () => !props.player.playerHitted, this);
    props.scene.physics.add.collider(props.player, props.springs, this.hitSpring, () => true, this);
    props.scene.physics.add.collider(props.player, props.spikes, this.hitSpikes, () => !props.player.playerHitted, this);
    props.scene.physics.add.overlap(props.player, props.finishPlatform, this.collideFinishPlatform, null, this);
    props.scene.physics.add.overlap(props.player, props.items, this.itemCollision, null, this);
    props.scene.physics.world.on('worldbounds', (body) => body.gameObject.destroy(), this);
};
