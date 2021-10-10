export type Node = {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    weight: number,
    isVisited: boolean,
    isWall: boolean,
    previousNode: Node | null,
};