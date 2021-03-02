import { LevelProperties } from '@/core/LevelProperties';
import { colorWheel, Piiixls } from '@/core/Piiixls';

export const ConfigPlayer = function(props: LevelProperties) {

    Piiixls.init(props);
    const playerLayer = props.levelData.layers.find((e) => e.name === 'player');
    const playerInitalPosition = playerLayer.objects.find((e) => e.name === 'initialPosition');
    const playerColor = playerInitalPosition.properties.find((e) => e.name === 'color').value;
    props.player = this.physics.add.sprite(playerInitalPosition.x, playerInitalPosition.y, 'piiixls').setScale(1.5);
    // props.player.setCircle(10);
    props.player.piiixls = Piiixls;
    props.player.playerHitted = false;
    props.player.blockPlayer = false;
    props.player.isInAPlatform = false;
    props.player.piiixls.paint(playerColor);

    props.player.on('animationcomplete', (anim, frame) => {
        if (anim.key === 'piiixlsDie') {
            props.player.disableBody(true);
            this.cameras.main.fadeOut(1500);
    }
    }, props.player);
};
