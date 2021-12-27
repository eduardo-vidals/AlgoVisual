import {Node} from "../Node/Node";

export function recursiveDivision(grid: Node[][]) {
    const walls: Node[] = [];
    addOuterWalls(grid, walls);
    addInnerWalls(true, 1, grid[0].length - 2, 1, grid.length - 2, grid, walls);
    return {walls, newGrid: grid};
}

function addOuterWalls(grid: Node[][], walls: Node[]) {
    for (let i = 0; i < grid.length; i++) {
        if (i == 0 || i == (grid.length - 1)) {
            for (let j = 0; j < grid[0].length; j++) {
                grid[i][j].isWall = true;
                walls.push(grid[i][j]);
            }
        } else {
            grid[i][0].isWall = true;
            grid[i][grid[0].length - 1].isWall = true;
            walls.push(grid[i][0]);
            walls.push(grid[i][grid[0].length - 1])
        }
    }
}

function addInnerWalls(h: boolean, minX: number, maxX: number, minY: number, maxY: number, grid: Node[][], walls: Node[]) {
    if (h) {
        if (maxX - minX < 2) {
            return;
        }
        let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
        addHWall(minX, maxX, y, grid, walls);
        addInnerWalls(!h, minX, maxX, minY, y - 1, grid, walls);
        addInnerWalls(!h, minX, maxX, y + 1, maxY, grid, walls);
    } else {
        if (maxY - minY < 2) {
            return;
        }
        let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
        addVWall(minY, maxY, x, grid, walls);
        addInnerWalls(!h, minX, x - 1, minY, maxY, grid, walls);
        addInnerWalls(!h, x + 1, maxX, minY, maxY, grid, walls);
    }
}

function addHWall(minX: number, maxX: number, y: number, grid: Node[][], walls: Node[]) {
    let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

    for (let i = minX; i <= maxX; i++) {
        if (y === 0){
            continue;
        }

        if (i === hole){
            grid[y][i].isWall = false;
        } else {
            grid[y][i].isWall = true;
            walls.push(grid[y][i]);
        }
    }
}

function addVWall(minY: number, maxY: number, x: number, grid: Node[][], walls: Node[]) {
    let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

    for (let i = minY; i <= maxY; i++) {
        if (x === 0){
            continue;
        }

        if (i === hole){
            grid[i][x].isWall = false;
        } else {
            grid[i][x].isWall = true;
            walls.push(grid[i][x]);
        }
    }
}

function randomNumber(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
