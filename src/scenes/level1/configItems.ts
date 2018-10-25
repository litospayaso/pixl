import { LevelProperties } from '../../core/LevelProperties';

export const ConfigItems = function(props: LevelProperties) {
    for (let index = 12; index < 2400; index += 70) {
        const item = props.items.create(index, 0, 'star');
        item.color = ['ff0000ff', '00ff00ff', '0000ffff'][Math.floor((Math.random() * 3))];
        item.setTint(parseInt(item.color.slice(0, 6), 16));
    }
};
