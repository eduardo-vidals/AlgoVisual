import React from "react";
import "./GridNode.css";

type Props = {
  col: number,
  isFinish: boolean,
  isStart: boolean,
  isWall: boolean,
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>,
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>,
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>,
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>,
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>,
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>,
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>
  row: number,
  style?: any
};

const enabledWallStyle = {
  backgroundColor: '#33435d',
  border: 1,
  borderStyle: 'solid',
  borderColor: '#33435d',
}

const disabledWallStyle = {
  backgroundColor: '#fff',
  border: 1,
  borderStyle: 'solid',
  borderColor: '#8dc3e7',
}

function GridNode(props: Props) {
  const {
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseOver,
    onMouseEnter,
    onMouseUp,
    row,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = props;
  const className = isFinish ? 'node node-finish' : isStart ? 'node node-start' : isWall ? 'node node-wall' : 'node';
  const nodeID = "node-" + row + "-" + col

  return (
    <div id={nodeID} className={className} onMouseOver={onMouseOver} onMouseDown={onMouseDown}
         onMouseEnter={onMouseEnter}
         onMouseUp={onMouseUp} style={props.style} onTouchStart={onTouchStart} onTouchMove={onTouchMove}
         onTouchEnd={onTouchEnd}/>
  );
}

export default GridNode;
