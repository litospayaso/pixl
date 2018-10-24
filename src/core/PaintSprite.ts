let sheet;
let newTexture;
let context;

export const initPaintSprite = (props: Phaser.Scene) => {
    sheet = props.textures.get('player').getSourceImage();
    newTexture = props.textures.createCanvas('playerUpdate', sheet.width, sheet.height);
    context = newTexture['getContext']('2d');
    context.drawImage(sheet, 0, 0);
};

export const paintSprite = (color: string) => {
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
    newPixelArray.forEach((e, i) => newPixelArray[i] = e === '000000ff' ? color : e);

    for (let i = 0; i < pixelArray.length; i = i + 4) {
        pixelArray[i] = parseInt(newPixelArray[i / 4].slice(0, 2), 16);
        pixelArray[i + 1] = parseInt(newPixelArray[i / 4].slice(2, 4), 16);
        pixelArray[i + 2] = parseInt(newPixelArray[i / 4].slice(4, 6), 16);
        pixelArray[i + 3] = parseInt(newPixelArray[i / 4].slice(6, 8), 16);
    }

    context.putImageData(imageData, 0, 0);

    newTexture.refresh();
};
