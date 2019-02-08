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
        },
    };
}
