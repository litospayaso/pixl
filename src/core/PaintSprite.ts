import {LevelProperties} from './LevelProperties';

let isCreated = false;

export const paintSprite = {
    sheet: undefined,
    newTexture: undefined,
    context: undefined,
    init(props: LevelProperties) {
        if (!isCreated) {
            this.sheet = props.scene.textures.get('player').getSourceImage();
            this.newTexture = props.scene.textures.createCanvas('playerUpdate', this.sheet.width, this.sheet.height);
            this.context = this.newTexture['getContext']('2d');
            this.context.drawImage(this.sheet, 0, 0);
            isCreated = true;
        }
    },
    paint(color: string) {
        const imageData = this.context.getImageData(0, 0, this.sheet.width, this.sheet.height);
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
        // tslint:disable-next-line:max-line-length
        const backgroundColor = newPixelArray.slice(0).sort((a, b) => newPixelArray.slice(0).filter((v) => v === a).length - newPixelArray.slice(0).filter((v) => v === b).length).pop();
        newPixelArray.forEach((e, i) => newPixelArray[i] = e === backgroundColor ? color : e);

        for (let i = 0; i < pixelArray.length; i = i + 4) {
            pixelArray[i] = parseInt(newPixelArray[i / 4].slice(0, 2), 16);
            pixelArray[i + 1] = parseInt(newPixelArray[i / 4].slice(2, 4), 16);
            pixelArray[i + 2] = parseInt(newPixelArray[i / 4].slice(4, 6), 16);
            pixelArray[i + 3] = parseInt(newPixelArray[i / 4].slice(6, 8), 16);
        }
        this.context.putImageData(imageData, 0, 0);
        this.newTexture.refresh();
    },
    refresh: () => this.newTexture.refresh(),
};
