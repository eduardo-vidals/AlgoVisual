import IndexMinPQ from "./IndexMinPQ";
import {Node} from "../Node/Node";

// uses an indexed min pq to find the shortest path
export function dijkstraSP(s: Node, t: Node, grid: Node[][]) {
    let gridDimensions = grid.length * grid[0].length;
    let pq = new IndexMinPQ<Number>(gridDimensions);
    let visitedNodes: Node[] = [];
    const edgeTo: Node[] = [];
    s.weight = 0;
    let colSize = grid[0].length;
    pq.insert(getIndex(s.row, s.col, colSize), s.weight);
    while (!pq.isEmpty()) {
        let nodeIndex = pq.delMin();
        let row = Math.floor(nodeIndex / colSize);
        let col = nodeIndex - (row * colSize);
        let minNode: Node = grid[row][col];
        if (minNode.isWall) continue;
        if (minNode.weight === Infinity) return visitedNodes;
        minNode.isVisited = true;
        visitedNodes.push(minNode);
        if (minNode === t) return visitedNodes;
        const neighbors = getNeighbors(minNode, grid);
        for (const neighbor of neighbors){
            relax(neighbor, pq, colSize);
        }
    }
    return visitedNodes;
}

function relax(v: Node, pq: IndexMinPQ<Number>, colSize: number){
    const vIndex = getIndex(v.row, v.col, colSize);
    if (pq.contains(vIndex)){
        pq.decreaseKey(vIndex, v.weight);
    } else {
        pq.insert(vIndex, v.weight);
    }
}

function getNeighbors(v: Node, grid: Node[][]){
    const {row, col} = v;
    const neighbors:Node[] = [];

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

    let unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of unvisitedNeighbors){
        if (neighbor.isWeight){
            neighbor.weight = v.weight + 5;
        } else {
            neighbor.weight = v.weight + 1;
        }
        neighbor.previousNode = v;
    }
    return unvisitedNeighbors;
}

function getIndex(row: number, col: number, colSize: number) {
    return (row * colSize) + col;
}

export function shortestPath(t: Node) {
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

export default dijkstraSP;
