export class LevelProperties {
    scene: Phaser.Scene;
    platforms: Phaser.GameObjects.Group;
    cursors: Phaser.Input.Keyboard.CursorKeys;
    elevators: Phaser.GameObjects.Group;
    enemies: Phaser.GameObjects.Group;
    fireballs: Phaser.GameObjects.Group;
    player: Phaser.Physics.Arcade.Sprite;
    enemyWalls: Phaser.Physics.Arcade.StaticGroup;
    blockPlayer: boolean;
    playerHitted: boolean;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.enemies = this.scene.physics.add.group();
        this.fireballs = this.scene.physics.add.group({ allowGravity: false });
        this.platforms = this.scene.physics.add.staticGroup();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.enemyWalls = this.scene.physics.add.staticGroup();
        this.elevators = this.scene.physics.add.group({ allowGravity: false });

    }

}
