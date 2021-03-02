import { LevelProperties } from '@/core/LevelProperties';
import { PlayerObject } from '@/core/PlayerObject';

export const ConfigColliders = function(props: LevelProperties) {
    props.player.setCollideWorldBounds(true);
    props.scene.physics.world.setBoundsCollision(true, true, true, false);

    (props.platforms as any).setCollisionBetween( 1, 50 );
    (props.enemyWalls as any).setCollisionBetween( 1, 50 );
    // props.colorWallsCollider = (props.colorWalls as any).setCollisionByProperty({color: props.player.piiixls.getNonCollidingItems()});
    props.scene.physics.add.collider(props.player, props.platforms);
    props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: Phaser.Physics.Arcade.Sprite) => player.piiixls.getColor() !== wall.body['color']);

    // props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: any) => console.log(`%c wall`, `background: #df03fc; color: #f8fc03`, wall), this);
    // props.scene.physics.add.collider(props.player, props.platforms, this.removeLeftRightSpeed, null, this);
    // props.scene.physics.add.collider(props.player, props.colorWalls, () => null, (player: PlayerObject, wall: Phaser.Physics.Arcade.Sprite) => player.piiixls.getColor() !== wall.body['color']);
    props.scene.physics.add.collider(props.player, props.elevators, this.setBottomBlocked, null, this);
    props.scene.physics.add.collider(props.player, props.shifters, this.directionBlocked, null, this);
    // props.scene.physics.add.collider(props.items, props.platforms);
    props.scene.physics.add.collider(props.enemies, props.platforms, this.changeSpriteDirection);
    props.scene.physics.add.collider(props.enemies, props.enemyWalls, this.changeSpriteDirection);
    props.scene.physics.add.collider(props.player, props.enemies, this.hitAnEnemy, () => !props.player.playerHitted, this);
    props.scene.physics.add.collider(props.player, props.fireballs, this.hitAFireball, () => !props.player.playerHitted, this);
    props.scene.physics.add.collider(props.player, props.spikes, this.hitSpikes, () => !props.player.playerHitted, this);
    props.scene.physics.add.overlap(props.player, props.finishPlatform, this.collideFinishPlatform, null, this);
    props.scene.physics.add.overlap(props.player, props.items, this.itemCollision, null, this);
    props.scene.physics.world.on('worldbounds', (body) => body.gameObject.destroy(), this);
};
