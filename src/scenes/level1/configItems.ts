import { LevelProperties } from '../../core/LevelProperties';
import { colorWheel } from '../../core/Piiixls';

export const ConfigItems = function(props: LevelProperties) {
    for (let index = 12; index < 2400; index += 70) {
        const item = props.items.create(index, 0, 'pixel');
        item.color = colorWheel[Math.floor((Math.random() * 12))];
        item.setTint(parseInt(item.color.slice(0, 6), 16));
    }
    const bucket = props.items.create(300, 600, 'bucket');
    bucket.color = colorWheel[Math.floor((Math.random() * 12))];
    bucket.setTint(parseInt(bucket.color.slice(0, 6), 16));
    props.items.create(550, 900, 'star');
    props.items.create(450, 900, 'book');
    props.items.create(650, 900, 'palette');
};
