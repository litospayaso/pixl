import { LevelProperties } from '@/core/LevelProperties';
import { colorWheel } from '@/core/Piiixls';

export const ConfigItems = function(props: LevelProperties) {
  props.levelData.layers.find((e) => e.name === 'items').objects.forEach((item) => {
    switch (item.name) {
      case 'bucket':
        const color = item.properties.find((e) => e.name === 'color').value;
        const bucket = props.items.create(item.x, item.y, 'items_tiles').setFrame(4).setScale(1.5);
        bucket.itemType = 'bucket';
        bucket.color = color;
        bucket.setTint(parseInt(colorWheel[color].slice(0, 6), 16));
        break;
      case 'star':
        const star = props.items.create(item.x, item.y, 'items_tiles').setFrame(0).setScale(1.5);
        star.itemType = 'star';
        break;
      case 'book':
        const book = props.items.create(item.x, item.y, 'items_tiles').setFrame(1).setScale(1.5);
        book.itemType = 'book';
        break;
      case 'palette':
        const palette = props.items.create(item.x, item.y, 'items_tiles').setFrame(2).setScale(1.5);
        palette.itemType = 'palette';
        break;
      case 'pixel':
        const colour = item.properties.find((e) => e.name === 'color').value;
        const pixel = props.items.create(item.x, item.y, 'items_tiles').setFrame(3);
        pixel.itemType = 'pixel';
        pixel.color = colour;
        pixel.setTint(parseInt(colorWheel[colour].slice(0, 6), 16));
        break;
      case 'finishPlatform':
        const colr = item.properties.find((e) => e.name === 'color').value;
        props.finishPlatform.create(item.x, item.y)
          .setScale(1)
          .setTintFill(`0x${colorWheel[colr].slice(0, 6)}`)
          .setAlpha(0.5).body.color = colr;

        props.scene.add.sprite(item.x, item.y, 'sparkles')
          .setScale(1).anims.play('animateSparkles');
        break;
      default:
        break;
    }
  });
};
