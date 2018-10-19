import { LevelProperties } from '../../core/LevelProperties';

export const configItems = function(props: LevelProperties) {
    for (let index = 12; index < 2400; index += 70) {
        props.items.create(index, 0, 'star');
    }
};
