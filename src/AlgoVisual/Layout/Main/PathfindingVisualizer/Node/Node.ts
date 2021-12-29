export type Node = {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    isVisited: boolean,
    isWall: boolean,
    isWeight: boolean,
    weight: number,
    previousNode: Node | null
};
