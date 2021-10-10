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
type State = {};

class GridNode extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {col, isFinish, isStart, isWall, onMouseDown, onMouseOver, onMouseEnter, onMouseUp, row, onTouchStart, onTouchMove, onTouchEnd} = this.props;
        const className = isFinish ? 'node node-finish' : isStart ? 'node node-start' : isWall ? 'node node-wall' : 'node';
        const nodeID = "node-" + col + "-" + row
        return (
            <div id={nodeID} className={className} onMouseOver={onMouseOver} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}
                 onMouseUp={onMouseUp} style={this.props.style} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}/>
        );
    }
}

export default GridNode;