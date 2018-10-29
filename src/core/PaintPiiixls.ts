import { LevelProperties } from './LevelProperties';

let isCreated = false;

export const paintPiiixls = {
    sheet: undefined,
    newTexture: undefined,
    context: undefined,
    props: undefined,
    backgroundColor: '000000ff',
    init(props: LevelProperties) {
        if (!isCreated) {
            this.sheet = props.scene.textures.get('player').getSourceImage();
            this.newTexture = props.scene.textures.createCanvas('temp', this.sheet.width, this.sheet.height);
            this.context = this.newTexture['getContext']('2d');
            this.context.drawImage(this.sheet, 0, 0);
            props.scene.textures.addSpriteSheet('piiixls', this.newTexture.getSourceImage(), {
                frameWidth: 20,
                frameHeight: 24,
            });
            this.props = props;
            isCreated = true;
            this.animSprites();
        } else {
            const pixelArray = this.context.getImageData(0, 0, this.sheet.width, this.sheet.height).data;
            const newPixelArray = {};
            for (let i = 0; i < pixelArray.length; i = i + 4) {
                const r = pixelArray[i];
                const g = pixelArray[i + 1];
                const b = pixelArray[i + 2];
                const alpha = pixelArray[i + 3];
                // tslint:disable-next-line:max-line-length
                const color = `${r.toString(16).length === 1 ? '0'.concat(r.toString(16)) : r.toString(16)}${g.toString(16).length === 1 ? '0'.concat(g.toString(16)) : g.toString(16)}${b.toString(16).length === 1 ? '0'.concat(b.toString(16)) : b.toString(16)}${alpha.toString(16).length === 1 ? '0'.concat(alpha.toString(16)) : alpha.toString(16)}`;
                newPixelArray[color] = newPixelArray[color] ? newPixelArray[color] + 1 : 1;
            }
            this.backgroundColor = Object.keys(newPixelArray).reduce((a, b) => newPixelArray[a] > newPixelArray[b] ? a : b);
        }
    },
    paint(color: string) {
        const imageData = this.context.getImageData(0, 0, this.sheet.width, this.sheet.height);
        const pixelArray = imageData.data;
        let currentColor = {};
        const newPixelArray = [];
        for (let i = 0; i < pixelArray.length; i = i + 4) {
            const r = pixelArray[i];
            const g = pixelArray[i + 1];
            const b = pixelArray[i + 2];
            const alpha = pixelArray[i + 3];
            // tslint:disable-next-line:max-line-length
            const rgb = `${r.toString(16).length === 1 ? '0'.concat(r.toString(16)) : r.toString(16)}${g.toString(16).length === 1 ? '0'.concat(g.toString(16)) : g.toString(16)}${b.toString(16).length === 1 ? '0'.concat(b.toString(16)) : b.toString(16)}${alpha.toString(16).length === 1 ? '0'.concat(alpha.toString(16)) : alpha.toString(16)}`;
            newPixelArray.push(rgb);
            currentColor[rgb] = currentColor[rgb] ? currentColor[rgb] + 1 : 1;
        }
        currentColor = Object.keys(currentColor).reduce((a, b) => currentColor[a] > currentColor[b] ? a : b);
        newPixelArray.forEach((e, i) => newPixelArray[i] = e === currentColor ? color : e);

        for (let i = 0; i < pixelArray.length; i = i + 4) {
            pixelArray[i] = parseInt(newPixelArray[i / 4].slice(0, 2), 16);
            pixelArray[i + 1] = parseInt(newPixelArray[i / 4].slice(2, 4), 16);
            pixelArray[i + 2] = parseInt(newPixelArray[i / 4].slice(4, 6), 16);
            pixelArray[i + 3] = parseInt(newPixelArray[i / 4].slice(6, 8), 16);
        }
        this.backgroundColor = color;
        this.context.putImageData(imageData, 0, 0);
        this.newTexture.refresh();
        this.props.scene.textures.get('piiixls').source[0].update();
        // copyCanvas(this.context.getImageData(0, 0, this.sheet.width, this.sheet.height));
    },
    addColor(color: string) {
        const result = [];
        for (let i = 0; i < color.length; i++) {
            result.push(Math.round((parseInt(color[i], 16) + parseInt(this.backgroundColor[i], 16)) / 2).toString(16));
        }
        this.paint(result.join(''));
    },
    animSprites() {
        this.props.scene.anims.create({
            key: 'piiixlsLeft',
            frames: this.props.scene.anims.generateFrameNumbers('piiixls', { start: 5, end: 9 }),
            frameRate: 20,
            repeat: -1,
        });

        this.props.scene.anims.create({
            key: 'piiixlsRight',
            frames: this.props.scene.anims.generateFrameNumbers('piiixls', { start: 0, end: 4 }),
            frameRate: 20,
            repeat: -1,
        });

        this.props.scene.anims.create({
            key: 'piiixlsHit',
            frames: [{key: 'piiixls', frame: 10 }],
            frameRate: 10,
            repeat: 1,
        });

        this.props.scene.anims.create({
            key: 'piiixlsDie',
            frames: this.props.scene.anims.generateFrameNumbers('piiixls', { start: 11, end: 14 }),
            frameRate: 20,
            repeat: 1,
        });

        this.props.scene.anims.create({
            key: 'piiixlsTurnRight',
            frames: [{ key: 'piiixls', frame: 0 }],
            frameRate: 20,
        });

        this.props.scene.anims.create({
            key: 'piiixlsTurnLeft',
            frames: [{ key: 'piiixls', frame: 5 }],
            frameRate: 20,
        });
    },
    // refresh() {
    //     this.newTexture.refresh();
    //     this.props.scene.textures.get('piiixls').source[0].update();
    // },
};

export interface IPiiixls {
    backgroundColor: string;
    init: (LevelProperties) => void;
    paint: (string) => void;
    addColor: (string) => void;
    animSprites: () => void;
}

// const copyCanvas = (sourceCanvas) => {
//     document.body.style.backgroundColor = 'LightGray';
//     const id = document.getElementById('angelita');
//     if (id) {
//         document.getElementById('angelita').remove();
//     }
//     const canvas = document.createElement('CANVAS');
//     canvas.id = 'angelita';
//     const ctx = canvas['getContext']('2d');
//     ctx.putImageData(sourceCanvas, 0, 0);
//     document.body.appendChild(canvas);
// };
