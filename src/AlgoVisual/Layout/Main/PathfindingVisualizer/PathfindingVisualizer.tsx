import React from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import {dijkstra, getNodesInShortestPathOrder} from "./Algorithms/Dijkstra";

type Props = {};
type State = {
    grid: any[any][][]
    mouseIsPressed: boolean
};

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class PathfindingVisualizer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    handleMouseDown(row: number, col: number) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row: number, col: number) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateDijkstra(visitedNodesInOrder: any[], nodesInShortestPathOrder: any[]) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const nodeID = "node-" + node.col + "-" + node.row
                document.getElementById(nodeID)!.className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder: any[]) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const nodeID = "node-" + node.col + "-" + node.row
                document.getElementById(nodeID)!.className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
        let nodes = this.state.grid.map((row, rowIndex) => {
            return (
                <div className={"grid-row"}>
                    {row.map((node, nodeIndex) => {
                        const {row, col, isFinish, isStart, isWall} = node;
                        return (
                            <Node row={row} col={col} isStart={isStart} isFinish={isFinish} isWall={isWall}
                                  mouseIsPressed={mouseIsPressed} onMouseUp={() => this.handleMouseUp()}
                                  onMouseDown={() => this.handleMouseDown(row, col)}
                                  onMouseEnter={() => this.handleMouseEnter(row, col)}/>
                        )
                    })}
                </div>
            )
        })
        return (
            <main className={"main-sidebar"}>
                <div className={"sidebar"}>
                    <div className={"sidebar-settings"}>
                        <div className={"sidebar-setting"}>
                            <p> Choose an algorithm </p>
                            <button className={"sidebar-button"} onClick={() => this.visualizeDijkstra()}>
                                Run
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"main-content"}>
                    <div id={"pathfinding-visualizer"}>
                        {nodes}
                    </div>
                </div>
            </main>
        )
    }
}

function getInitialGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(col: number, row: number) {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
}

function getNewGridWithWallToggled(grid: any[any][][], row: number, col: number) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
    };
    return newGrid;
}

export default PathfindingVisualizer;

