type Node = {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    weight: number,
    isVisited: boolean,
    isWall: boolean,
    previousNode: Node,
    counter: number
}

export function dijkstraSP(s: Node, t: Node, grid: any[any][]) {
    const visitedNodes: Node[] = [];
    s.weight = 0;
    const unvisitedNodes = allNodes(grid);
    while (unvisitedNodes.length) {
        sortedNodes(unvisitedNodes);
        const minNode = unvisitedNodes.shift();
        if (minNode.isWall) continue;
        if (minNode.weight === Infinity) return visitedNodes;
        minNode.isVisited = true;
        visitedNodes.push(minNode);
        if (minNode === t) return visitedNodes;
        updateNeighbors(minNode, grid);
    }
    return visitedNodes;
}

export function shortestPath(v: Node) {
    const shortestPath: Node[] = [];
    let current = v;
    while (current !== null) {
        shortestPath.push(current);
        current = current.previousNode;
    }
    return shortestPath;
}

function updateNeighbors(v: Node, grid: any[any][]) {
    const neighbors = unvisitedNeighbors(v, grid);
    for (const neighbor of neighbors) {
        neighbor.weight = v.weight + 1;
        neighbor.previousNode = v;
    }
}

function unvisitedNeighbors(v: Node, grid: any[any][]) {
    let neighbors = [];
    const {row, col} = v;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function allNodes(grid: any[any][]) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}

function sortedNodes(nodes: any[any][]) {
    return nodes.sort((v: Node, w: Node) => v.weight - w.weight);
}
