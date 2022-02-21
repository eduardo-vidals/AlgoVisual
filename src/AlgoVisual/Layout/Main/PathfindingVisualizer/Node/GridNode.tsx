import React from "react";
import "./GridNode.css";
import weight from './assets/weight.png'

type Props = {
  col: number,
  isFinish: boolean,
  isStart: boolean,
  isWall: boolean,
  isWeight: boolean,
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

function GridNode(props: Props) {
  const {
    col,
    isFinish,
    isStart,
    isWeight,
    onMouseDown,
    onMouseOver,
    onMouseEnter,
    onMouseUp,
    row,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = props;
  const className = isFinish ? 'node node-finish' : isStart ? 'node node-start' : 'node'
  const nodeID = "node-" + row + "-" + col

  return (
    <div id={nodeID} className={className} onMouseOver={onMouseOver} onMouseDown={onMouseDown}
         onMouseEnter={onMouseEnter}
         onMouseUp={onMouseUp} style={props.style} onTouchStart={onTouchStart} onTouchMove={onTouchMove}
         onTouchEnd={onTouchEnd}>
      {isWeight ? <img src={weight} className={'node-weight-image'} alt={'node-weight'}/> : null}
    </div>
  );
}

export default GridNode;
