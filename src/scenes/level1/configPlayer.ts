import { LevelProperties } from '../../core/LevelProperties';
import { paintSprite } from '../../core/PaintSprite';

export const ConfigPlayer = function(props: LevelProperties) {

    paintSprite.init(props);

    props.player = this.physics.add.sprite(100, 1100, 'playerUpdate');
    props.player.playerHitted = false;
    props.player.blockPlayer = false;

    paintSprite.paint('ff0000ff');
    paintSprite.paint('00ff00ff');

};
