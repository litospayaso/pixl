import { LevelProperties } from './LevelProperties';

export const AnimateSprites = function(props: LevelProperties) {
    props.scene.anims.create({
        key: 'enemiiixlsRight',
        frames: props.scene.anims.generateFrameNumbers('enemiiixls', { start: 0, end: 4 }),
        frameRate: 20,
        repeat: -1,
    });
    props.scene.anims.create({
        key: 'enemiiixlsLeft',
        frames: this.anims.generateFrameNumbers('enemiiixls', { start: 5, end: 9 }),
        frameRate: 20,
        repeat: -1,
    });
    props.scene.anims.create({
        key: 'enemiiixlsDie',
        frames: props.scene.anims.generateFrameNumbers('enemiiixls', { start: 10, end: 14 }),
        frameRate: 20,
        repeat: 0,
    });
    props.scene.anims.create({
        key: 'shootPixelBall',
        frames: props.scene.anims.generateFrameNumbers('pixelBall', { start: 0, end: 7 }),
        frameRate: 40,
        repeat: -1,
    });
};
