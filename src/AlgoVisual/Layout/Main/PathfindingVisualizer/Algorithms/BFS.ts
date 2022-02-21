import {Node} from "../Node/Node";

export function bfsVisited(s: Node, t: Node, grid: Node[][]) {
    const visitedNodes: Node[] = [];
    const queue: Node[] = [];
    s.isVisited = true;
    s.weight = 0;
    queue.unshift(s);
    visitedNodes.push(s);
    while (queue.length !== 0) {
        const node:Node = queue.shift() as Node;
        let neighbors = getNeighbors(node, grid);
        for(const neighbor of neighbors){
            if (neighbor.isWall) continue;
            neighbor.previousNode = node;
            neighbor.weight = node.weight + 1;
            neighbor.isVisited = true;
            queue.push(neighbor);
            visitedNodes.push(neighbor);
            if (neighbor === t) return visitedNodes;
        }
    }

    return visitedNodes;
}

function getNeighbors(v: Node, grid: Node[][]) {
    const {row, col} = v;
    const neighbors: Node[] = [];
    if (validVertex(row + 1, col, grid) && !grid[row + 1][col].isVisited) {
        neighbors.unshift(grid[row + 1][col]);
    }
    if (validVertex(row, col + 1, grid) && !grid[row][col + 1].isVisited) {
        neighbors.unshift(grid[row][col + 1]);
    }
    if (validVertex(row - 1, col, grid) && !grid[row - 1][col].isVisited) {
        neighbors.unshift(grid[row-1][col]);
    }
    if (validVertex(row, col - 1, grid) && !grid[row][col - 1].isVisited) {
        neighbors.unshift(grid[row][col-1]);
    }
    return neighbors;
}

function validVertex(row: number, col: number, grid: Node[][]) {
    return !(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length);
}

export function bfsPath(t: Node) {
    const shortestPath = [];
    let currentNode: Node | null = t;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    if (shortestPath.length === 1){
        return [];
    }

    return shortestPath;
}
