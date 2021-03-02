import { ItemObject } from '@/core/ItemObject';

export interface ILevelInterface {
    compressionlevel: number;
    editorsettings:
       {
        export:
           {
            format: string;
            target: string;
           };
       };
    height: number;
    infinite: boolean;
    layers: ILayerInterface[];
    nextlayerid: number;
    nextobjectid: number;
    orientation: string;
    properties: IPropertyInterface[];
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: ITilesetInterface[];
    tilewidth: number;
    type: string;
    version: string;
    width: number;
}

export interface IPlatformInterface {
    x: number;
    y: number;
    texture?: string;
    tint?: string;
    scale?: number;
    displaySize?: {
        x: number;
        y: number;
    };
    offset?: {
        x: number;
        y: number;
    };
}

export interface ILayerInterface {
    data: number[];
    height: number;
    id: number;
    name: string;
    opacity: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
    objects: IobjectsLayer[]
}

export interface IobjectsLayer {
    height: number;
    id: number;
    name: string;
    point: boolean;
    properties: IPropertyInterface[];
    rotation: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export interface IPropertyInterface {
    name: string;
    type: string;
    value: string;
}

export interface ITilesetInterface {
    columns: number;
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
}

export interface IMovePlatformInterface extends IPlatformInterface {
    delay: number;
    speed: number;
}

export interface ItemImterface extends ItemObject {
    itemType: string;
}
