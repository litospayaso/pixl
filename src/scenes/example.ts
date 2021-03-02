export class Example extends Phaser.Scene {

    player: any;
    cursors: any;
    constructor() {
        super( {
            key: 'example',
        } );
    }

    create() {
        const map = this.make.tilemap( { key: 'map' } );
        const groundTiles = map.addTilesetImage( 'ground_1x1' );
        const coinTiles = map.addTilesetImage( 'coin' );

        ( map as any ).createLayer( 'Background Layer', groundTiles, 0, 0 );
        const groundLayer = ( map as any ).createLayer( 'Ground Layer', groundTiles, 0, 0 );
        const coinLayer = ( map as any ).createLayer( 'Coin Layer', coinTiles, 0, 0 );

        groundLayer.setCollisionBetween( 1, 25 );

        // This will set Tile ID 26 (the coin tile) to call the function "hitCoin" when collided with
        // coinLayer.setTileIndexCallback( 26, hitCoin, this );

        // This will set the map location (2, 0) to call the function "hitSecretDoor" Un-comment this to
        // be jump through the ceiling above where the player spawns. You can use this to create a
        // secret area.
        // groundLayer.setTileLocationCallback( 2, 0, 1, 1, hitSecretDoor, this );

        this.player = this.physics.add.sprite( 80, 70, 'player' )
            .setBounce( 0.1 );

        // We want the player to physically collide with the ground, but the coin layer should only
        // trigger an overlap so that collection a coin doesn'td kill player movement.
        this.physics.add.collider( this.player, groundLayer );
        this.physics.add.overlap( this.player, coinLayer );

        this.cameras.main.setBounds( 0, 0, map.widthInPixels, map.heightInPixels );
        this.cameras.main.startFollow( this.player );

        this.cursors = this.input.keyboard.createCursorKeys();

        // text.setScrollFactor( 0 );
    }

    update() {
        // Horizontal movement
        this.player.body.setVelocityX( 0 );
        if ( this.cursors.left.isDown ) {
            this.player.body.setVelocityX( -200 );
        } else if ( this.cursors.right.isDown ) {
            this.player.body.setVelocityX( 200 );
        }

        // Jumping
        if ( ( this.cursors.space.isDown || this.cursors.up.isDown ) && this.player.body.onFloor() ) {
            this.player.body.setVelocityY( -300 );
        }
    }

}
