export const createLevel = (platforms, enemyWalls, elevators, _this) => {
    for (let index = 200; index < 2400; index += 400) {
        platforms.create(index, 1185, 'ground');
    }
    platforms.create(600, 400, 'ground');
    platforms.create(600, 1025, 'ground');
    platforms.create(1200, 900, 'ground');
    platforms.create(1800, 800, 'ground');
    platforms.create(1200, 700, 'ground');
    platforms.create(600, 600, 'ground');
    platforms.create(200, 500, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    const offsetx = 200 + 16;
    const offsety = - 32;

    enemyWalls.create(600 - offsetx, 400 + offsety, 'transparent').visible = false;
    enemyWalls.create(600 - offsetx, 1025 + offsety, 'transparent').visible = false;
    enemyWalls.create(1200 - offsetx, 900 + offsety, 'transparent').visible = false;
    enemyWalls.create(1800 - offsetx, 800 + offsety, 'transparent').visible = false;
    enemyWalls.create(1200 - offsetx, 700 + offsety, 'transparent').visible = false;
    enemyWalls.create(600 - offsetx, 600 + offsety, 'transparent').visible = false;
    enemyWalls.create(200 - offsetx, 500 + offsety, 'transparent').visible = false;
    enemyWalls.create(50 - offsetx, 250 + offsety, 'transparent').visible = false;
    enemyWalls.create(750 - offsetx, 220 + offsety, 'transparent').visible = false;

    enemyWalls.create(600 + offsetx, 400 + offsety, 'transparent').visible = false;
    enemyWalls.create(600 + offsetx, 1025 + offsety, 'transparent').visible = false;
    enemyWalls.create(1200 + offsetx, 900 + offsety, 'transparent').visible = false;
    enemyWalls.create(1800 + offsetx, 800 + offsety, 'transparent').visible = false;
    enemyWalls.create(1200 + offsetx, 700 + offsety, 'transparent').visible = false;
    enemyWalls.create(600 + offsetx, 600 + offsety, 'transparent').visible = false;
    enemyWalls.create(200 + offsetx, 500 + offsety, 'transparent').visible = false;
    enemyWalls.create(50 + offsetx, 250 + offsety, 'transparent').visible = false;
    enemyWalls.create(750 + offsetx, 220 + offsety, 'transparent').visible = false;

    elevators.create(300, 700, 'ground').setScale(0.25).setImmovable(true).setVelocityY(100);

    elevators.children.iterate((child) => {
        _this.time.addEvent({
            delay: 4000,
            loop: true,
            callback() {
                child.body.velocity.y *= -1;
            },
        });
    }, _this);
};
