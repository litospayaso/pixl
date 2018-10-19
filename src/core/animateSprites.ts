export const animateSprites = function() {
    this.anims.create({
        key: 'playerLeft',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'playerTurn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
    });

    this.anims.create({
        key: 'droidLeft',
        frames: this.anims.generateFrameNumbers('droid', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1,
    });

    this.anims.create({
        key: 'playerRight',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
};
