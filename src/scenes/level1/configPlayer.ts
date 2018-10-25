import { LevelProperties } from '../../core/LevelProperties';
import { paintPiiixls } from '../../core/PaintPiiixls';

export const ConfigPlayer = function(props: LevelProperties) {

    paintPiiixls.init(props);

    props.player = this.physics.add.sprite(100, 1100, 'piiixls');
    props.player.playerHitted = false;
    props.player.blockPlayer = false;
    paintPiiixls.paint('00000000');

};
