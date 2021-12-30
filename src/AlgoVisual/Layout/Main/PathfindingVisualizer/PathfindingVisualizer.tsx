import React, {createRef, useEffect, useState} from "react";
import GridNode from "./Node/GridNode";
import "./PathfindingVisualizer.css";
import {dijkstraSP, shortestPath} from "./Algorithms/DijkstraSP";
import {Node} from "./Node/Node";
import {dfsPath, dfsVisited} from "./Algorithms/DFS";
import {bfsPath, bfsVisited} from "./Algorithms/BFS";
import update from 'immutability-helper';
import {recursiveDivision} from "./MazeGeneration/RecursiveDivision";
import AlgoButtonSetting from "../Common/Settings/AlgoButtonSetting";
import {disabledButtonStyle, enabledButtonStyle} from "../Common/Styles";
import AlgoButton from "../Common/AlgoButton";
import AlgoSliderSetting from "../Common/Settings/AlgoSliderSetting";
import {AStar} from "./Algorithms/AStar";

const options = ["DFS", "BFS", "Dijkstra", "A*"];

function PathfindingVisualizer() {
  const dropdownSelection = createRef<HTMLDivElement>();
  const dropdownCaret = createRef<HTMLDivElement>();

  const [grid, setGrid] = useState<Node[][]>([]);
  const [gridBeforeAnimation, setGridBeforeAnimation] = useState<Node[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [rows, setRows] = useState(31);
  const [cols, setCols] = useState(31);
  const [algorithm, setAlgorithm] = useState("A*");
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [nodeStyle, setNodeStyle] = useState({width: "20px", height: "20px"});
  const [visitedNodes, setVisitedNodes] = useState<Node[]>([]);
  const [pathNodes, setPathNodes] = useState<Node[]>([]);
  const [dropdownStyle, setDropdownStyle] = useState(enabledButtonStyle);
  const [pathfindingSpeed, setPathfindingSpeed] = useState(20);
  const [clickedRun, setClickedRun] = useState(false);
  const [startRow, setStartRow] = useState(Math.floor(rows / 2));
  const [startCol, setStartCol] = useState(Math.floor(cols / 10));
  const [finishRow, setFinishRow] = useState(Math.floor(rows / 2));
  const [finishCol, setFinishCol] = useState(Math.floor(cols * 0.9));
  const [clickedOnStartNode, setClickedOnStartNode] = useState(false);
  const [clickedOnFinishNode, setClickedOnFinishNode] = useState(false);
  const [showClearPath, setShowClearPath] = useState(false);
  const [enabledWeights, setEnabledWeights] = useState(false);
  const [dropdownOptionClicked, setDropdownOptionClicked] = useState(false);

  // trigger before mounting anything to DOM
  useEffect(() => {
    resizeGrid();
    setGrid(getInitialGrid);
    let root = document.getElementById("grid-wrapper");
    root!.ontouchmove = (e) => {
      // why does this work??? is this a reference to state grid??? is it cause of pass by val??
      const wallsGrid: Node[][] = grid.slice();
      for (let i = 0; i < e.changedTouches.length; i++) {
        let element = e.changedTouches[i];
        let v = document.elementFromPoint(element.clientX, element.clientY);
        if (v && v.classList.contains("node") && (!v.classList.contains("node-start") && (!v.classList.contains("node-finish")))) {
          const line = v.id.split("-");
          const row = parseInt(line[1]);
          const col = parseInt(line[2]);
          v.className = 'node node-wall';
          // results in more efficient results...why?
          // maybe cause pass by value returns a reference (like in java)????
          wallsGrid[row][col].isWall = !wallsGrid[row][col].isWall;
        }
      }
    }

    root!.onmousedown = (e) => {
      // breaks walls for  grid, do not remove
      // e.stopImmediatePropagation(); (didn't allow elements to be placed on first click)
      e.preventDefault();
      setMouseIsPressed(true);
    }
    /*
    root!.onmouseup = (e) => {
      // breaks walls grid, do not remove
      e.preventDefault();
      e.stopImmediatePropagation();
      setMouseIsPressed(false);
      setClickedOnStartNode(false);
      setClickedOnFinishNode(false);
    }
     */

    window.addEventListener('resize', () => {
      resizeGrid();
    }, true);
  }, [])

  // resizes the grid based on the resize event listener
  const resizeGrid = () => {
    let COLS = cols;
    let mainContentWidth = document.getElementById("main")!.offsetWidth;
    let dimension = Math.floor(mainContentWidth / (COLS * 2.5)) + "px";
    setNodeStyle({width: dimension, height: dimension})
  }

  // styles for display algorithms dropdown, based on whether it's shown or not
  useEffect(() => {
    displayAlgorithmsDropdown();
  }, [showAlgorithms])

  useEffect(() => {
    if (dropdownOptionClicked) {
      setGrid(getUpdatedGrid);
      setDropdownOptionClicked(false);
    }
  }, [dropdownOptionClicked])

  const showAlgorithmsDropdown = (e: React.MouseEvent) => {
    // ensures that you close menu when clicked again
    if (!showAlgorithms && !optionsDisabled) {
      setShowAlgorithms(true);
      // not sure why this works but will figure out soon
      // makes dropdown work magically!
      e.stopPropagation();
      document.addEventListener("click", closeAlgorithmsDropdown);
    }
  }

  const closeAlgorithmsDropdown = () => {
    setShowAlgorithms(false);
    setEnabledWeights(false);
    document.removeEventListener("click", closeAlgorithmsDropdown)
  }

  const displayAlgorithmsDropdown = () => {
    if (showAlgorithms) {
      dropdownSelection.current!.style.display = "block";
      dropdownCaret.current!.style.transform = "rotate(180deg)";
      dropdownCaret.current!.style.transition = "all 250ms linear";
    } else {
      dropdownSelection.current!.style.display = "none";
      dropdownCaret.current!.style.transform = "rotate(0deg)";
      dropdownCaret.current!.style.transition = "all 250ms linear";
    }
  }

  // once the options are disabled, ensure that grid is updated to use any updated nodes
  // such as modified start/finish nodes
  useEffect(() => {
    if (optionsDisabled) {
      setGrid(getUpdatedGrid);
    }
  }, [optionsDisabled])

  // run algorithms when run is clicked, necessary settings such as disabling styles are also configured here
  useEffect(() => {
    if (clickedRun) {
      setOptionsDisabled(true);
      const startNode = grid[startRow][startCol];
      const finishNode = grid[finishRow][finishCol];
      switch (algorithm) {
        case 'DFS': {
          const visitedNodes = dfsVisited(startNode, finishNode, grid);
          const pathForDFS = dfsPath(finishNode);
          setVisitedNodes(visitedNodes);
          setPathNodes(pathNodes);
          animateVisited(visitedNodes, pathForDFS);
          break;
        }
        case 'BFS': {
          const visitedNodes = bfsVisited(startNode, finishNode, grid);
          const pathForBFS = bfsPath(finishNode);
          setVisitedNodes(visitedNodes);
          setPathNodes(pathNodes);
          animateVisited(visitedNodes, pathForBFS);
          break;
        }
        case 'Dijkstra': {
          const visitedNodes = dijkstraSP(startNode, finishNode, grid);
          const pathNodes = shortestPath(finishNode);
          setVisitedNodes(visitedNodes);
          setPathNodes(pathNodes);
          animateVisited(visitedNodes, pathNodes);
          break;
        }
        case 'A*': {
          const {visitedNodes, pathNodes} = AStar(startNode, finishNode, grid);
          setVisitedNodes(visitedNodes);
          setPathNodes(pathNodes);
          animateVisited(visitedNodes, pathNodes);
          break;
        }
      }
      setClickedRun(false);
    }
  }, [clickedRun]);

  // when you click, update the grid to clear visited/path styles and ensures that clear path option is not shown
  useEffect(() => {
    if (mouseIsPressed && !optionsDisabled) {
      setGrid(getUpdatedGrid);
      setShowClearPath(false);
    }
  }, [mouseIsPressed])

  // handles necessary logic on first click of a node within the grid
  const handleMouseDown = (row: number, col: number) => {
    if (optionsDisabled || !mouseIsPressed) return;

    const nodeID = "node-" + row + "-" + col;
    const node = grid[row][col];

    let className = node.isStart ? 'node node-start' : node.isFinish ? 'node node-finish' : node.isWall ? 'node' : 'node node-wall';
    if (!node.isStart && !node.isFinish && enabledWeights) {
      className = node.isWeight ? 'node' : 'node node-weight';
    }
    document.getElementById(nodeID)!.className = className;

    if (node.isStart) {
      setClickedOnStartNode(true);
    }

    if (node.isFinish) {
      setClickedOnFinishNode(true);
    }

    // ensures a wall is only toggled if it isn't a start/finish noded
    if (node.isStart || node.isFinish) return;

    if (enabledWeights) {
      const newGrid = getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid as Node[][]);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid as Node[][]);
    }
  }

  // handles logic for when mouse is moved within the grid
  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || optionsDisabled) return;
    const nodeID = "node-" + row + "-" + col;
    const node = grid[row][col];

    // must be made in seperate inner if statements to ensure the statements ends and the next if statements aren't ran
    if (clickedOnStartNode) {
      if (!node.isWall && !node.isFinish) {
        const prevStartNodeID = 'node-' + startRow + '-' + startCol;
        document.getElementById(prevStartNodeID)!.className = 'node';
        updateStartNode(row, col);
        document.getElementById(nodeID)!.className = 'node node-start';
      }
      return;
    }

    // must be made in seperate inner if statements to ensure the statements ends and the next if statements aren't ran
    if (clickedOnFinishNode) {
      if (!node.isWall && !node.isStart) {
        const prevStartNodeID = 'node-' + finishRow + '-' + finishCol;
        document.getElementById(prevStartNodeID)!.className = 'node';
        updateFinishNode(row, col);
        document.getElementById(nodeID)!.className = 'node node-finish';
      }
      return;
    }

    if (enabledWeights) {
      document.getElementById(nodeID)!.className = node.isWeight ? 'node' : 'node node-weight';
      const newGrid = getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid as Node[][]);
    }

    // otherwise, fill the walls up, ensures that start/finish nodes cannnot be filled up
    if (!node.isStart && !node.isFinish && !enabledWeights) {
      document.getElementById(nodeID)!.className = node.isWall ? 'node' : 'node node-wall';
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid as Node[][]);
    }
  }

  // returns grid with updated wall configuration
  const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number) => {
    return update(grid, {
      [row]: {
        [col]: {
          isWeight: {$set: false},
          isWall: {$set: !grid[row][col].isWall}
        }
      }
    });
  }

  // returns grid with updated weight configuration
  const getNewGridWithWeightToggled = (grid: Node[][], row: number, col: number) => {
    return update(grid, {
      [row]: {
        [col]: {
          isWeight: {$set: !grid[row][col].isWeight},
          isWall: {$set: false}
        }
      }
    });
  }

  // helper method for updating position of start node
  const updateStartNode = (row: number, col: number) => {
    setStartRow(row);
    setStartCol(col);
  }

  // helper method for updating position of finish node
  const updateFinishNode = (row: number, col: number) => {
    setFinishRow(row);
    setFinishCol(col);
  }

  // generates a maze using a recursive backtrack maze algorithm
  const mazeGeneration = () => {
    setOptionsDisabled(true);
    setGrid(getInitialGrid);
    clearGrid();
    setDropdownStyle(disabledButtonStyle);
    // there has to be a timeout before generating the walls or else the walls will be generated instantly
    // this is because the state of a node is updated rather than a class being added when loading in nodes
    // this is just a simple fix, as it is a trivial issue
    const WALL_ANIMATION_LENGTH = 5;
    let {walls, mazeGrid} = recursiveDivision(getInitialGrid());
    let animationLength = walls.length * WALL_ANIMATION_LENGTH;

    // update grid with new walls grid
    setTimeout(() => {
      setGrid(mazeGrid);
    }, animationLength);

    enableSettings(animationLength)
    for (let i = 0; i < walls.length; i++) {
      const v = walls[i];
      // recursive division sets walls to true/false within the algorithm itself
      // therefore, if a node is a wall, then turn add it to wall class properties
      if (v.isWall) {
        setTimeout(() => {
          const nodeID = "node-" + v.row + "-" + v.col;
          document.getElementById(nodeID)!.className = 'node node-wall';
        }, i * WALL_ANIMATION_LENGTH)
      }
    }
    setShowClearPath(false);
  }

  // animates visited nodes
  const animateVisited = (visitedNodes: Node[], pathNodes: Node[]) => {
    let animationLength = (visitedNodes.length + pathNodes.length) * pathfindingSpeed;
    setDropdownStyle(disabledButtonStyle);
    enableSettingsClearPath(animationLength);
    // must be <= visitedNodes.length to ensure that the for loop has finished
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animatePath(pathNodes);
        }, i * pathfindingSpeed);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          const nodeID = "node-" + node.row + "-" + node.col;
          const className = node.isWeight ? 'node node-weight-visited' : 'node node-visited';
          document.getElementById(nodeID)!.className = className;
        }, i * pathfindingSpeed);
      }
    }
  }

  // animates the path of a searching algorithm
  const animatePath = (pathNodes: Node[]) => {
    for (let i = 0; i < pathNodes.length; i++) {
      setTimeout(() => {
        const node = pathNodes[i];
        const nodeID = "node-" + node.row + "-" + node.col;
        document.getElementById(nodeID)!.className = 'node node-shortest-path';
      }, i * pathfindingSpeed);
    }
  }

  // enables settings after a certain period of time
  const enableSettings = (animationLength: number) => {
    setTimeout(() => {
      setOptionsDisabled(false);
      setDropdownStyle(enabledButtonStyle);
    }, animationLength);
  }

  // enables settings after a certain period of time and enables the clear path option
  const enableSettingsClearPath = (animationLength: number) => {
    setTimeout(() => {
      setOptionsDisabled(false);
      setDropdownStyle(enabledButtonStyle);
      setShowClearPath(true);
    }, animationLength);
  }

  // clears grid to initial settings, keeps the changed state of start/finish nodes if position was changed
  // also clears walls/weights
  const clearGrid = () => {
    // clearing the actual grid itself
    setGrid(getInitialGrid);
    setShowClearPath(false);
    setPathNodes([]);
    setVisitedNodes([]);

    // clearing html class properties (for css)
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const node = grid[i][j];
        const nodeID = "node-" + node.row + "-" + node.col;
        document.getElementById(nodeID)!.className = 'node';
      }
    }

    const startNode = grid[startRow][startCol];
    const startNodeID = 'node-' + startNode.row + '-' + startNode.col;
    document.getElementById(startNodeID)!.className = 'node node-start';

    const finishNode = grid[finishRow][finishCol];
    const finishNodeID = 'node-' + finishNode.row + '-' + finishNode.col;
    document.getElementById(finishNodeID)!.className = 'node node-finish';
  }

  // initializes grid to an empty grid (does not clear any current animations, only the 2D node array
  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col, false, false));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  // used for when the start/finish nodes are moved, ensures that the grid is updated with correct values
  // for isStart and isFinish, also ensures walls are still kept
  const getUpdatedGrid = () => {
    const updatedGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        const node = grid[row][col];
        const nodeID = "node-" + node.row + "-" + node.col;
        const isWeightAndAlgorithmSupported = node.isWeight && (algorithm === 'A*' || algorithm === 'Dijkstra');
        document.getElementById(nodeID)!.className = node.isStart ? 'node node-start' :
          node.isFinish ? 'node node-finish' : node.isWall ? 'node node-wall' : isWeightAndAlgorithmSupported ? 'node node-weight' : 'node';

        node.isWall ? currentRow.push(createNode(row, col, true, false))
          : isWeightAndAlgorithmSupported ? currentRow.push(createNode(row, col, false, true))
            : currentRow.push(createNode(row, col, false, false));
      }
      updatedGrid.push(currentRow);
    }
    return updatedGrid;
  }

  // ensures that logic for clicking nodes is reset upon finishing a click within the grid
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setMouseIsPressed(false);
    setClickedOnStartNode(false);
    setClickedOnFinishNode(false);
    setGrid(getUpdatedGrid);
    setShowClearPath(false);
    console.log(grid);
  }

  // ensures that logic for clicking nodes is reset upon leaving the grid, it is only used for when start/finish
  // nodes are clicked, as the next click on the grid ensures that it follows the logic for handleMouseEnter()
  const onMouseLeave = () => {
    setClickedOnStartNode(false);
    setClickedOnFinishNode(false);
  }

  // styles for entering dropdown
  const onMouseEnterDropdown = () => {
    if (optionsDisabled) {
      setDropdownStyle({color: '#f5a0a0', cursor: 'default'});
    } else {
      setDropdownStyle({color: '#98d6e8', cursor: 'pointer'});
    }
  }

  // styles for leaving dropdown
  const onMouseLeaveDropdown = () => {
    if (optionsDisabled) {
      setDropdownStyle({color: '#f5a0a0', cursor: 'default'});
    } else {
      setDropdownStyle({color: '#fff', cursor: 'pointer'});
    }
  }

  // creates a singular node
  const createNode = (row: number, col: number, wall: boolean, weight: boolean) => {
    return {
      row: row,
      col: col,
      isStart: row === startRow && col === startCol,
      isFinish: row === finishRow && col === finishCol,
      isVisited: false,
      isWall: wall,
      isWeight: weight,
      weight: Infinity,
      previousNode: null
    } as Node;
  }

  let nodes = grid.map((row) => {
    return (
      <div className={"grid-row"}>
        {row.map((node) => {
          const {row, col, isFinish, isStart, isWall, isWeight} = node;
          return (
            <GridNode row={row} col={col} isStart={isStart} isFinish={isFinish} isWall={isWall} isWeight={isWeight}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() => handleMouseEnter(row, col)}
                      onTouchMove={() => handleMouseEnter(row, col)}
                      style={nodeStyle}
            />
          )
        })}
      </div>
    )
  });

  return (
    <main className={"main-sidebar"} id={"main"} onMouseUp={() => setMouseIsPressed(false)}>
      <div className={"sidebar"}>
        <div className={"sidebar-settings"}>
          <AlgoSliderSetting settingDescription={'Control visualizer speed'}
                             statusDescription={pathfindingSpeed + ' ms'}
                             disabled={optionsDisabled}
                             onChange={(e: Event, val: number | number[]) => setPathfindingSpeed(val as number)}
                             defaultValue={20} min={20} max={1000}/>

          <div className={"sidebar-setting"}>
            <p> Choose an algorithm </p>

            <div className={"selection-dropdown"} onClick={showAlgorithmsDropdown} style={dropdownStyle}
                 onMouseEnter={onMouseEnterDropdown} onMouseLeave={onMouseLeaveDropdown}>
              <div className={"current-option"}>
                <p> {algorithm} </p>
              </div>

              <div className={"caret-down"}>
                <i className="fas fa-caret-down" ref={dropdownCaret}> </i>
              </div>
            </div>
            <div className={"selection-options"} ref={dropdownSelection}>
              <ul>
                {
                  options.map(option => (
                    <div onClick={() => {
                      setAlgorithm(option);
                      setDropdownOptionClicked(true);
                    }}
                         key={option}> {option} </div>
                  ))
                }
              </ul>
            </div>

            <AlgoButton buttonText={'Run'} disabled={optionsDisabled} onClick={() => setClickedRun(true)}/>
          </div>

          <AlgoButtonSetting settingDescription={'Recursive Backtrack Maze'} buttonText={'Generate Maze'}
                             disabled={optionsDisabled} onClick={mazeGeneration}/>

          {algorithm === 'Dijkstra' || algorithm === 'A*' ?
            <AlgoButtonSetting settingDescription={enabledWeights ? 'Enable Walls' : 'Enable Weights'}
                               buttonText={enabledWeights ? 'Walls' : 'Weights'} disabled={optionsDisabled}
                               onClick={() => enabledWeights ? setEnabledWeights(false) : setEnabledWeights(true)}/>
            : null}

          <AlgoButtonSetting settingDescription={'Clear Grid'} buttonText={'Clear'}
                             disabled={optionsDisabled} onClick={clearGrid}/>

          {showClearPath ?
            <AlgoButtonSetting settingDescription={'Clear Path'} buttonText={'Clear'} disabled={optionsDisabled}
                               onClick={() => {
                                 setGrid(getUpdatedGrid);
                                 setShowClearPath(false);
                               }}/> : null}

        </div>
      </div>

      <div className={"main-content"} id={"grid-wrapper"} onMouseUp={(e) => onMouseUp(e)}
           onMouseLeave={onMouseLeave}>
        <div id={"grid"}>
          {nodes}
        </div>
      </div>
    </main>
  );
}

export default PathfindingVisualizer;

