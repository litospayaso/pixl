export const configItems = function() {
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 22,
        setXY: { x: 12, y: 0, stepX: 70 },
    });
};
