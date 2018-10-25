import {IPiiixls} from './PaintPiiixls';
export class PlayerObject extends Phaser.Physics.Arcade.Sprite {
    blockPlayer: boolean;
    playerHitted: boolean;
    piiixls: IPiiixls;
}
