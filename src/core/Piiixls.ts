import { LevelProperties } from './LevelProperties';

let isCreated = false;

// export let colorWheel = ['ff0000ff', 'ff7f00ff', 'ffff00ff', '7fff00ff', '00ff00ff', '00ff7fff', '00ffffff', '007fffff', '0000ffff', '7f00ffff', 'ff00ffff', 'ff007fff'];
export const transparentColor = '00000005';
// export let colorWheel = ['fd5308ff', 'fb9902ff', 'fabc02ff', 'fefe33ff', 'd0ea2bff', '66b032ff', '0391ceff', '0247feff', '3d01a4ff', '8601afff', 'a7194bff', 'fe2712ff'];
export const colorWheel = ['ffb33fff', 'ffff6eff', 'b7f58cff', '5a87ffff', 'c577ddff', 'ff8478ff'];

export const Piiixls = {
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
        frameWidth: 15,
        frameHeight: 19,
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
        const color = `${r.toString(16).length === 1 ? '0'.concat(r.toString(16)) : r.toString(16)}${g.toString(16).length === 1 ? '0'.concat(g.toString(16)) : g.toString(16)}${b.toString(16).length === 1 ? '0'.concat(b.toString(16)) : b.toString(16)}${alpha.toString(16).length === 1 ? '0'.concat(alpha.toString(16)) : alpha.toString(16)}`;
        newPixelArray[color] = newPixelArray[color] ? newPixelArray[color] + 1 : 1;
      }
      this.backgroundColor = Object.keys(newPixelArray).reduce((a, b) => newPixelArray[a] > newPixelArray[b] ? a : b);
    }
  },
  paint(index: number) {
    if (this.backgroundColor !== index) {
      const color = index === -1 ? transparentColor : colorWheel[index];
      const imageData = this.context.getImageData(0, 0, this.sheet.width, this.sheet.height);
      const pixelArray = imageData.data;
      let currentColor = {};
      const newPixelArray = [];
      for (let i = 0; i < pixelArray.length; i = i + 4) {
        const r = pixelArray[i];
        const g = pixelArray[i + 1];
        const b = pixelArray[i + 2];
        const alpha = pixelArray[i + 3];
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
      this.backgroundColor = index;
      this.context.putImageData(imageData, 0, 0);
      this.newTexture.refresh();
      this.props.scene.textures.get('piiixls').source[0].update();
    }
    // if (this.props.colorWallsCollider) {
    //     this.props.colorWallsCollider.destroy();
    // }
    // if (this.props.colorWalls) {
    //     (this.props.colorWalls as any).setCollisionByProperty({color: this.getNonCollidingItems()});
    // }
    // copyCanvas(this.context.getImageData(0, 0, this.sheet.width, this.sheet.height));
  },
  addColor(index: number) {
    if (this.backgroundColor === -1) {
      this.paint(index);
    } else {
      if (index !== this.backgroundColor) {
        let wheel = JSON.parse(JSON.stringify(colorWheel));
        const color1 = wheel[index];
        const color2 = wheel[this.backgroundColor];
        wheel = wheel.concat(wheel.splice(0, this.backgroundColor < index ? this.backgroundColor : index));
        wheel.shift();
        const number = wheel.indexOf(color1) !== -1 ? wheel.indexOf(color1) : wheel.indexOf(color2);
        switch (number) {
          case 0:
          case 1:
            if (Number(this.backgroundColor) === colorWheel.indexOf(wheel[0])) {
              this.paint(colorWheel.indexOf(color1) === Number(this.backgroundColor) ? colorWheel.indexOf(color2) : colorWheel.indexOf(color1));
            } else {
              this.paint(colorWheel.indexOf(wheel[0]));
            }
            break;
          case 2:
            this.paint(colorWheel.indexOf(wheel[0]));
            break;
          case 3:
          case 4:
            if (Number(this.backgroundColor) === colorWheel.indexOf(wheel[4])) {
              this.paint(colorWheel.indexOf(color1) === Number(this.backgroundColor) ? colorWheel.indexOf(color2) : colorWheel.indexOf(color1));
            } else {
              this.paint(colorWheel.indexOf(wheel[4]));
            }
            break;
          default:
            break;
        }
      }
    }
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
      frames: [{ key: 'piiixls', frame: 10 }],
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
  getColor(): number {
    return Number(this.backgroundColor);
    // return this.backgroundColor.slice(0, -2);
  },
  getNonCollidingItems(): number[] {
    return Array.from(Array(colorWheel.length).keys()).filter((e) => e !== this.getColor());
    // return this.backgroundColor.slice(0, -2);
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
  getColor: () => number;
  getNonCollidingItems: () => number[];
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

// a = a.concat(a.splice(0,a.indexOf('a')))
