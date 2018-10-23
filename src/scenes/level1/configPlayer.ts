import { LevelProperties } from '../../core/LevelProperties';

export const ConfigPlayer = function(props: LevelProperties) {
    // console.log(props.scene);
    // props.player = new PlayerObject(props.scene, 100, 1100, 'dude');
    props.player = this.physics.add.sprite(100, 1100, 'dude');
    props.player.visible = false;
    props.player.playerHitted = false;
    props.player.blockPlayer = false;
    props.player.setTintFill(0xFF0000);

    const sheet = props.scene.textures.get('player').getSourceImage();
    const newTexture = this.textures.createCanvas('playerUpdate', sheet.width, sheet.height);

    const context = newTexture['getContext']('2d');
    context.drawImage(sheet, 0, 0);

    const sprite = props.scene.physics.add.sprite(100, 1100, 'playerUpdate');
    props.scene.physics.add.collider(sprite, props.platforms);

    // const canvasTexture = props.scene.game.textures.createCanvas('player-update', sheet.width, sheet.height);
    // const canvas = canvasTexture.getSourceImage();

    const imageData = context.getImageData(0, 0, sheet.width, sheet.height);
    const pixelArray = imageData.data;

    const newPixelArray = [];
    for (let i = 0; i < pixelArray.length; i = i + 4) {
        const r = pixelArray[i];
        const g = pixelArray[i + 1];
        const b = pixelArray[i + 2];
        const alpha = pixelArray[i + 3];
        // tslint:disable-next-line:max-line-length
        newPixelArray.push(`${r.toString(16).length === 1 ? '0'.concat(r.toString(16)) : r.toString(16)}${g.toString(16).length === 1 ? '0'.concat(g.toString(16)) : g.toString(16)}${b.toString(16).length === 1 ? '0'.concat(b.toString(16)) : b.toString(16)}${alpha.toString(16).length === 1 ? '0'.concat(alpha.toString(16)) : alpha.toString(16)}`);
    }
    newPixelArray.forEach((e, i) => newPixelArray[i] = e === '000000ff' ? 'ff0000ff' : e);

    for (let i = 0; i < pixelArray.length; i = i + 4) {
        pixelArray[i] = parseInt(newPixelArray[i / 4].slice(0, 2), 16);
        pixelArray[i + 1] = parseInt(newPixelArray[i / 4].slice(2, 4), 16);
        pixelArray[i + 2] = parseInt(newPixelArray[i / 4].slice(4, 6), 16);
        pixelArray[i + 3] = parseInt(newPixelArray[i / 4].slice(6, 8), 16);
    }

    context.putImageData(imageData, 0, 0);

    newTexture.refresh();

    // sprite.update();
    // sprite.refreshBody();
    // sprite.setTintFill(0xFF0000);
    // sprite.setMask(mask);
};
