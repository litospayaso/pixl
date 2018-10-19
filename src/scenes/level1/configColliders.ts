import { LevelProperties } from '../../core/LevelProperties';

export const configColliders = function(props: LevelProperties) {
    props.player.setCollideWorldBounds(true);
    props.scene.physics.world.setBoundsCollision(true, true, true, false);
    props.scene.physics.add.collider(props.player, props.platforms);
    props.scene.physics.add.collider(props.player, props.elevators, this.setBottomBlocked, null, this);
    props.scene.physics.add.collider(props.items, props.platforms);
    props.scene.physics.add.collider(props.enemies, props.platforms);
    props.scene.physics.add.collider(props.enemies, props.enemyWalls, this.changeSpriteDirection);
    props.scene.physics.add.collider(props.player, props.enemies, this.hitAnEnemy, () => !props.playerHitted, this);
    props.scene.physics.add.collider(props.player, props.fireballs, this.hitAFireball, () => !props.playerHitted, this);
    props.scene.physics.add.overlap(props.player, props.items, this.collectStar, null, this);
    props.scene.physics.world.on('worldbounds', (body) => body.gameObject.destroy(), this);
};
