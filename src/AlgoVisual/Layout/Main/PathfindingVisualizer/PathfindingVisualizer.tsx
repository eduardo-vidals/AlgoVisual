import React, {createRef} from "react";
import GridNode from "./Node/GridNode";
import "./PathfindingVisualizer.css";
import {dijkstraSP, shortestPath} from "./Algorithms/DijkstraSP";
import {Node} from "./Node/Node";
import {dfsPath, dfsVisited} from "./Algorithms/DFS";
import {bfsPath, bfsVisited} from "./Algorithms/BFS";
import update from 'immutability-helper';
import {recursiveDivision} from "./MazeGeneration/RecursiveDivision";

const options = ["DFS", "BFS", "Dijkstra", "A*"];
type Props = {};
type State = {
    grid: Node[][],
    initialGrid: Node[][],
    mouseIsPressed: boolean,
    rows: number,
    cols: number,
    showAlgorithms: boolean,
    optionsDisabled: boolean,
    algorithm: string
    nodeStyle: any
};

const START_NODE_ROW = 3;
const START_NODE_COL = 3;
const FINISH_NODE_ROW = 27;
const FINISH_NODE_COL = 27;
const VISITED_NODES_SPEED = 20;
const SHORTEST_PATH_SPEED = 30;

class PathfindingVisualizer extends React.Component<Props, State> {
    private dropdownSelection = createRef<HTMLDivElement>();
    private dropdownCaret = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            grid: [],
            initialGrid: [],
            mouseIsPressed: false,
            rows: 31,
            cols: 31,
            algorithm: "Dijkstra",
            showAlgorithms: false,
            optionsDisabled: false,
            nodeStyle: {width: "20px", height: "20px"}
        }
        this.showAlgorithms = this.showAlgorithms.bind(this);
        this.closeAlgorithms = this.closeAlgorithms.bind(this);
        this.changeAlgorithm = this.changeAlgorithm.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.resizeGrid();
        this.setState({grid: grid});
        let root = document.getElementById("grid-wrapper");
        let total = 0;
        root!.ontouchmove = (e) => {
            // why does this work??? is this a reference to state grid??? is it cause of pass by val??
            const wallsGrid: Node[][] = this.state.grid.slice();
            for (let i = 0; i < e.changedTouches.length; i++) {
                let element = e.changedTouches[i];
                let v = document.elementFromPoint(element.clientX, element.clientY);
                if (v != null) {
                    if (v.classList.contains("node") && (!v.classList.contains("node-start") && (!v.classList.contains("node-finish")))) {
                        const line = v.id.split("-");
                        const col = parseInt(line[1]);
                        const row = parseInt(line[2]);
                        total += 10;
                        v.className = 'node node-wall';
                        // results in more efficient results...why?
                        // maybe cause pass by value returns a reference (like in java)????
                        wallsGrid[row][col].isWall = !wallsGrid[row][col].isWall;
                    }
                }
            }
        }

        root!.onmousedown = (e) => {
            // breaks walls for  grid, do not remove
            // e.stopImmediatePropagation(); (didn't allow elements to be placed on first click)
            e.preventDefault();
            this.setState({mouseIsPressed: true});
        }
        root!.onmouseup = (e) => {
            // breaks walls grid, do not remove
            e.preventDefault();
            e.stopImmediatePropagation();
            this.setState({mouseIsPressed: false});
        }

        window.addEventListener('resize', () => {
            this.resizeGrid();
        }, true);
    }

    resizeGrid() {
        let COLS = this.state.cols;
        let mainContentWidth = document.getElementById("main")!.offsetWidth;
        let dimension = Math.floor(mainContentWidth / (COLS * 2.5)) + "px";
        this.setState({
            nodeStyle: {
                width: dimension,
                height: dimension
            }
        });
    }

    showAlgorithms(e: React.MouseEvent) {
        // ensures that you close menu when clicked again
        console.log(this.state.showAlgorithms);
        if (!this.state.showAlgorithms) {
            console.log(this.state.showAlgorithms);
            this.setState({showAlgorithms: true}, () => this.displayAlgorithms());
            // not sure why this works but will figure out soon
            // makes dropdown work magically!
            e.stopPropagation();
            document.addEventListener("click", this.closeAlgorithms);
        }
    }

    closeAlgorithms() {
        this.setState({showAlgorithms: false}, () => this.displayAlgorithms());
        document.removeEventListener("click", this.closeAlgorithms)
    }

    displayAlgorithms() {
        if (this.state.showAlgorithms) {
            this.dropdownSelection.current!.style.display = "block";
            this.dropdownCaret.current!.style.transform = "rotate(180deg)";
            this.dropdownCaret.current!.style.transition = "all 250ms linear";
        } else {
            this.dropdownSelection.current!.style.display = "none";
            this.dropdownCaret.current!.style.transform = "rotate(0deg)";
            this.dropdownCaret.current!.style.transition = "all 250ms linear";
        }
    }

    changeAlgorithm(option: string) {
        this.setState({algorithm: option});
    }

    runAlgorithm() {
        this.setState({optionsDisabled: true}, () => {
            switch (this.state.algorithm) {
                case 'DFS':
                    this.visualizeDFS();
                    break;
                case 'BFS':
                    this.visualizeBFS();
                    break;
                case 'Dijkstra':
                    this.visualizeDijkstra();
                    break;
            }
        });
    }

    getNewGridWithWallToggled(grid: Node[][], row: number, col: number) {
        return update(grid, {
            [row]: {[col]: {isWall: {$set: !grid[row][col].isWall}}}
        });
    }

    handleMouseDown(row: number, col: number) {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, initialGrid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row: number, col: number) {
        console.log(this.state.mouseIsPressed)
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, initialGrid: newGrid});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }


    handleMouseLeave() {
        this.setState({mouseIsPressed: false});
    }

    recursiveDivision() {
        const wallsGrid = this.state.grid.slice();
        let walls = recursiveDivision(wallsGrid);
        let totalTime = 0;
        for (let i = 0; i < walls.length; i++) {
            const v = walls[i];
            totalTime += 10;
            setTimeout(() => {
                const nodeID = "node-" + v.col + "-" + v.row;
                document.getElementById(nodeID)!.className = 'node node-wall';
            }, i * 10)
        }
        setTimeout(() => {
            this.setState({grid: wallsGrid, initialGrid: wallsGrid});
        }, totalTime);
    }

    visualizeDFS() {
        this.setState((state) => ({initialGrid: state.grid}));
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = dfsVisited(startNode, finishNode, grid);
        const pathForDFS = dfsPath(finishNode);
        this.animateVisited(visitedNodes, pathForDFS);
        // ensures the animation can be ran again once it is over
        this.copyGrid();
    }

    visualizeBFS() {
        this.setState((state) => ({initialGrid: state.grid}));
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = bfsVisited(startNode, finishNode, grid);
        const pathForBFS = bfsPath(finishNode);
        this.animateVisited(visitedNodes, pathForBFS);
        // ensures the animation can be ran again once it is over
        this.copyGrid();
    }

    visualizeDijkstra() {
        this.setState((state) => ({initialGrid: state.grid}));
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = dijkstraSP(startNode, finishNode, grid);
        const pathNodes = shortestPath(finishNode);
        this.animateVisited(visitedNodes, pathNodes);
        this.copyGrid();
    }

    animateVisited(visitedNodes: Node[], pathNodes: Node[]) {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    this.animatePath(pathNodes);
                }, i * VISITED_NODES_SPEED);
            } else {
                setTimeout(() => {
                    const node = visitedNodes[i];
                    const nodeID = "node-" + node.col + "-" + node.row;
                    document.getElementById(nodeID)!.className = 'node node-visited';
                }, i * VISITED_NODES_SPEED);
            }
        }
    }

    animatePath(pathNodes: Node[]) {
        for (let i = 0; i < pathNodes.length; i++) {
            setTimeout(() => {
                const node = pathNodes[i];
                const nodeID = "node-" + node.col + "-" + node.row;
                document.getElementById(nodeID)!.className = 'node node-shortest-path';
            }, i * SHORTEST_PATH_SPEED);
        }
    }

    copyGrid() {
        const grid: Node[][] = [];
        this.setState({grid: grid}, () => {
            this.setState({grid: this.getCopyGrid()})
        });
    }

    clearGrid() {
        const grid: Node[][] = [];
        this.setState({grid: grid}, () => {
            this.setState({grid: this.getInitialGrid()})
        });
    }

    getCopyGrid() {
        const grid = [];
        for (let row = 0; row < this.state.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.cols; col++) {
                if (this.state.initialGrid[row][col].isWall) {
                    currentRow.push(this.state.initialGrid[row][col]);
                } else {
                    currentRow.push(createNode(col, row));
                }
            }
            grid.push(currentRow);
        }
        return grid;
    }

    getInitialGrid() {
        const grid = [];
        for (let row = 0; row < this.state.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.cols; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    render() {
        let nodes = this.state.grid.map((row) => {
            return (
                <div className={"grid-row"}>
                    {row.map((node) => {
                        const {row, col, isFinish, isStart, isWall} = node;
                        return (
                            <GridNode row={row} col={col} isStart={isStart} isFinish={isFinish} isWall={isWall}
                                      onMouseDown={() => this.handleMouseDown(row, col)}
                                      onMouseEnter={() => this.handleMouseEnter(row, col)}
                                      onTouchMove={() => this.handleMouseEnter(row, col)}
                                      style={this.state.nodeStyle}
                            />
                        )
                    })}
                </div>
            )
        })
        return (
            <main className={"main-sidebar"} id={"main"}>
                <div className={"sidebar"}>
                    <div className={"sidebar-settings"}>
                        <div className={"sidebar-setting"}>
                            <p> Choose an algorithm </p>

                            <div className={"selection-dropdown"} onClick={this.showAlgorithms}>
                                <div className={"current-option"}>
                                    <p> {this.state.algorithm} </p>
                                </div>

                                <div className={"caret-down"}>
                                    <i className="fas fa-caret-down" ref={this.dropdownCaret}> </i>
                                </div>
                            </div>
                            <div className={"selection-options"} ref={this.dropdownSelection}>
                                <ul>
                                    {
                                        options.map(option => (
                                            <div onClick={() => this.changeAlgorithm(option)}
                                                 key={option}> {option} </div>
                                        ))
                                    }
                                </ul>
                            </div>

                            <button className={"sidebar-button"}
                                    onClick={this.runAlgorithm}>
                                Run
                            </button>
                        </div>

                        <div className={"sidebar-setting"}>
                            <p> Recursive Backtrack Maze </p>
                            <button className={"sidebar-button"} onClick={() => this.recursiveDivision()}>
                                Generate Maze
                            </button>
                        </div>
                        <div className={"sidebar-setting"}>
                            <p> Clear Grid </p>
                            <button className={"sidebar-button"} onClick={() => this.clearGrid()}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"main-content"} id={"grid-wrapper"} onMouseLeave={() => this.handleMouseLeave()}>
                    <div id={"grid"}>
                        {nodes}
                    </div>
                </div>
            </main>
        )
    }
}

function createNode(col: number, row: number) {
    return {
        col: col,
        row: row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        weight: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    } as Node;
}

export default PathfindingVisualizer;

