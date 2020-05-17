import { LevelProperties } from '@/core/LevelProperties';
export const ConfigPlatforms = function(props: LevelProperties) {

    props.scene.add.image(1000, 600, 'level1-background');

    props.levelData.platforms.ground.forEach((e) => {
        props.platforms.create(e.x, e.y, e.texture);
    });

    props.levelData.platforms.enemyWalls.forEach((e) => {
        props.enemyWalls.create(e.x, e.y, e.texture).visible = false;
    });

    props.levelData.platforms.colorWalls.forEach((e) => {
        props.colorWalls.create(e.x, e.y)
        .setDisplaySize(e.displaySize.x, e.displaySize.y)
        .setTintFill(`0x${e.tint}`).setAlpha(0.5)
        .body.setSize(e.displaySize.x, e.displaySize.y)
        .setOffset(e.offset.x, e.offset.y).color = e.tint;
    });

    props.levelData.platforms.elevators.forEach((e) => {
        props.elevators.create(e.x, e.y, e.texture).setScale(e.scale).setImmovable(true).setVelocityY(e.speed).delay = e.delay;
    });

    props.elevators.children.iterate((child) => {
        props.scene.time.addEvent({
            delay: child.delay,
            loop: true,
            callback() {
                child.body.velocity.y *= -1;
            },
        });
    }, this);

    props.levelData.platforms.shifters.forEach((e) => {
        props.shifters.create(e.x, e.y, e.texture).setScale(e.scale).setImmovable(true).setVelocityX(e.speed).delay = e.delay;
    });

    props.shifters.children.iterate((child) => {
        props.scene.time.addEvent({
            delay: child.delay,
            loop: true,
            callback() {
                child.body.velocity.x *= -1;
            },
        });
    }, this);

    props.finishPlatform.create(props.levelData.platforms.finishPlatform.x, props.levelData.platforms.finishPlatform.y)
    .setScale(props.levelData.platforms.finishPlatform.scale)
    .setTintFill(`0x${props.levelData.platforms.finishPlatform.tint}`)
    .setAlpha(0.5).body.color = props.levelData.platforms.finishPlatform.tint;

    props.scene.add.sprite(props.levelData.platforms.finishPlatform.x, props.levelData.platforms.finishPlatform.y, 'sparkles')
    .setScale(props.levelData.platforms.finishPlatform.scale).anims.play('animateSparkles');

};
