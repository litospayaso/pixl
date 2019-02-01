import { PlayerObject } from './PlayerObject';

export class LevelProperties {
    scene: Phaser.Scene;
    player: PlayerObject;
    platforms: Phaser.GameObjects.Group;
    cursors: Phaser.Input.Keyboard.CursorKeys;
    elevators: Phaser.GameObjects.Group;
    enemies: Phaser.GameObjects.Group;
    fireballs: Phaser.GameObjects.Group;
    enemyWalls: Phaser.Physics.Arcade.StaticGroup;
    items: Phaser.GameObjects.Group;
    colorWalls: Phaser.Physics.Arcade.StaticGroup;
    spikes: Phaser.Physics.Arcade.StaticGroup;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.enemies = this.scene.physics.add.group();
        this.fireballs = this.scene.physics.add.group({ allowGravity: false });
        this.platforms = this.scene.physics.add.staticGroup();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.enemyWalls = this.scene.physics.add.staticGroup();
        this.colorWalls = this.scene.physics.add.staticGroup();
        this.elevators = this.scene.physics.add.group({ allowGravity: false });
        this.items = this.scene.physics.add.group();
        this.spikes = this.scene.physics.add.staticGroup();
        // this.player = new PlayerObject(this.scene, 100, 1100, 'dude');
        // this.items = this.scene.physics.add.group({ allowGravity: false });
    }

}
