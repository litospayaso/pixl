export const AnimateSprites = function() {
    this.anims.create({
        key: 'droidLeft',
        frames: this.anims.generateFrameNumbers('droid', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1,
    });
};
