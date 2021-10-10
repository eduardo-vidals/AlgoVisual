import {Node} from "../Node/Node";

export function dfsVisited(s: Node, t: Node, grid:Node[][]){
    const visitedNodes:Node[] = [];
    dfs(s, t, grid, visitedNodes);
    return visitedNodes;
}

function dfs(v: Node, t: Node, grid:Node[][], visitedNodes: Node[]){
    if (grid[t.row][t.col].isVisited){
        return;
    }

    if (v.isWall) return;       

    v.isVisited = true;
    visitedNodes.push(v);
    const {row, col} = v;

    if (validVertex(row - 1, col, grid) && !grid[row-1][col].isVisited) {
        grid[row-1][col].previousNode = v;
        dfs(grid[row - 1][col], t, grid, visitedNodes);
    }
    if (validVertex(row, col + 1, grid) && !grid[row][col+1].isVisited) {
        grid[row][col+1].previousNode = v;
        dfs(grid[row][col + 1], t, grid, visitedNodes);
    }
    if (validVertex(row + 1, col, grid) && !grid[row + 1][col].isVisited) {
        grid[row+1][col].previousNode = v;
        dfs(grid[row + 1][col], t, grid, visitedNodes);
    }
    if (validVertex(row, col - 1, grid) && !grid[row][col-1].isVisited) {
        grid[row][col-1].previousNode = v;
        dfs(grid[row][col - 1], t, grid, visitedNodes);
    }
}

function validVertex(row: number, col: number, grid: Node[][]){
    return !(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length);
}

export function dfsPath(t: Node){
    const shortestPath = [];
    let currentNode: Node | null = t;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}