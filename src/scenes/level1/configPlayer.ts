import { LevelProperties } from '../../core/LevelProperties';

export const ConfigPlayer = function(props: LevelProperties) {
    // console.log(props.scene);
    // props.player = new PlayerObject(props.scene, 100, 1100, 'dude');
    props.player = this.physics.add.sprite(100, 1100, 'dude');
    props.player.playerHitted = false;
    props.player.blockPlayer = false;
};
