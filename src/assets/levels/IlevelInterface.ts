export interface ILevelInterface {
    level: string;
    name: string;
    author: string;
    period: string;
    authorInfo: string[];
    periodInfo: string[];
    pieceInfo: string[];
    levelProperties: {
        dimensions: {
            width: number;
            height: number;
        };
    };
    platforms: {
        ground: IPlatformInterface[];
        enemyWalls: IPlatformInterface[];
        colorWalls: IPlatformInterface[];
        finishPlatform: IPlatformInterface;
        elevators: IMovePlatformInterface[];
        shifters: IMovePlatformInterface[];
    };
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

export interface IMovePlatformInterface extends IPlatformInterface {
    delay: number;
    speed: number;
}
