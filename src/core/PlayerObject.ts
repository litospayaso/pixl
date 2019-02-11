import {IPiiixls} from './Piiixls';
export class PlayerObject extends Phaser.Physics.Arcade.Sprite {
    blockPlayer: boolean;
    isInAPlatform: boolean;
    playerHitted: boolean;
    piiixls: IPiiixls;
}
