import { LevelProperties } from '../../core/LevelProperties';
export const ConfigPlatforms = function(props: LevelProperties) {

    // Creating bounds of world & cameras
    props.scene.cameras.main.setBounds(0, 0, 2400, 1200);
    props.scene.physics.world.setBounds(0, 0, 2400, 1200);

    // props.scene.physics.add.group({
    //     key: 'sky',
    //     repeat: 6,
    //     setXY: { x: 400, y: 300, stepX: 400 },
    //     allowGravity: false,
    // });
    // props.scene.physics.add.group({
    //     key: 'sky',
    //     repeat: 6,
    //     setXY: { x: 400, y: 900, stepX: 400 },
    //     allowGravity: false,
    // });

    // Creating props.platforms
    for (let index = 200; index < 2400; index += 400) {
        props.platforms.create(index, 1185, 'ground');
    }
    props.platforms.create(600, 400, 'ground');
    props.platforms.create(600, 1025, 'ground');
    props.platforms.create(1200, 900, 'ground');
    props.platforms.create(1800, 800, 'ground');
    props.platforms.create(1200, 700, 'ground');
    props.platforms.create(600, 600, 'ground');
    props.platforms.create(200, 500, 'ground');
    props.platforms.create(50, 250, 'ground');
    props.platforms.create(750, 220, 'ground');

    const offsetx = 200 + 16;
    const offsety = - 32;

    props.enemyWalls.create(600 - offsetx, 400 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(600 - offsetx, 1025 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1200 - offsetx, 900 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1800 - offsetx, 800 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1200 - offsetx, 700 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(600 - offsetx, 600 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(200 - offsetx, 500 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(50 - offsetx, 250 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(750 - offsetx, 220 + offsety, 'transparent').visible = false;

    props.enemyWalls.create(600 + offsetx, 400 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(600 + offsetx, 1025 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1200 + offsetx, 900 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1800 + offsetx, 800 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(1200 + offsetx, 700 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(600 + offsetx, 600 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(200 + offsetx, 500 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(50 + offsetx, 250 + offsety, 'transparent').visible = false;
    props.enemyWalls.create(750 + offsetx, 220 + offsety, 'transparent').visible = false;

    // Creating props.elevators
    props.elevators.create(300, 700, 'ground').setScale(0.25).setImmovable(true).setVelocityY(100);

    props.elevators.children.iterate((child) => {
        props.scene.time.addEvent({
            delay: 4000,
            loop: true,
            callback() {
                child.body.velocity.y *= -1;
            },
        });
    }, this);
};
