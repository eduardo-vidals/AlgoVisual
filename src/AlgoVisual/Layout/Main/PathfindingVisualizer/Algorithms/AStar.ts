import {Node} from "../Node/Node";
import MinPQ from "./MinPQ";
import {Comparable} from "./Comparable";

class AStarNode implements Comparable<AStarNode> {
  node: Node;
  prev: AStarNode | undefined;
  readonly moves: number;
  readonly manhattan: number;

  constructor(node: Node, goal: Node, prev: AStarNode | undefined) {
    this.node = node;
    this.prev = prev;
    this.manhattan = manhattanDistance(node, goal);
    if (prev !== undefined) {
      this.moves = prev.moves + 1;
    } else {
      this.moves = 0;
    }
  }

  compareTo(o: AStarNode): number {
    let priorityDiff = (this.manhattan + this.moves) - (o.manhattan + o.moves);
    if (priorityDiff === 0) {
      return this.manhattan - o.manhattan;
    } else {
      return priorityDiff;
    }
  }
}

export function AStar(s: Node, t: Node, grid: Node[][]) {
  let pathNodes: Node[] = [];
  let visitedNodes: Node[] = [];

  let pq = new MinPQ<AStarNode>();
  pq.insert(new AStarNode(s, t, undefined));

  while (pq.isEmpty() || !pq.min()!.node.isFinish) {
    if (pq.isEmpty()){
      return {visitedNodes: visitedNodes, pathNodes: pathNodes};
    }

    let minNode: AStarNode = pq.delMin() as AStarNode;
    if (!minNode.node.isVisited) visitedNodes.push(minNode.node);
    minNode.node.isVisited = true;
    for (let node of neighbors(minNode.node, grid)) {
      if (node.isWall) continue;
      if (minNode.prev === undefined || minNode.prev.node !== node) {
        pq.insert(new AStarNode(node, t, minNode));
      }
    }
  }

  let current = pq.min();
  visitedNodes.push(current!.node);

  while (current?.prev !== undefined) {
    pathNodes.unshift(current!.node);
    current = current.prev;
  }

  pathNodes.unshift(current!.node);

  return {visitedNodes, pathNodes};
}

function neighbors(s: Node, grid: Node[][]) {
  const {row, col} = s;
  let neighbors: Node[] = [];

  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

function manhattanDistance(s: Node, t: Node) {
  return Math.abs(s.row - t.row) + Math.abs(s.col - t.col);
}

