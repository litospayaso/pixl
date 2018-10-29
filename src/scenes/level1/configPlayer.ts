import { LevelProperties } from '../../core/LevelProperties';
import { paintPiiixls } from '../../core/PaintPiiixls';

export const ConfigPlayer = function(props: LevelProperties) {

    paintPiiixls.init(props);
    props.player = this.physics.add.sprite(100, 1100, 'piiixls');
    props.player.piiixls = paintPiiixls;
    props.player.playerHitted = false;
    props.player.blockPlayer = false;
    props.player.piiixls.paint('ff00ffff');

    props.player.on('animationcomplete', (anim, frame) => {
        if (anim.key === 'piiixlsDie') {
            props.player.disableBody(true);
            this.cameras.main.fadeOut(1500);
    }
    }, props.player);
};
