import React from "react";
import "./Node.css";

type Props = {
    col: number,
    isFinish: boolean,
    isStart: boolean,
    isWall: boolean,
    mouseIsPressed: boolean,
    onMouseDown: React.MouseEventHandler<HTMLDivElement>,
    onMouseEnter: React.MouseEventHandler<HTMLDivElement>,
    onMouseUp: React.MouseEventHandler<HTMLDivElement>,
    row: number,
};
type State = {};

class Node extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row,} = this.props;
        const className = isFinish ? 'node node-finish' : isStart ? 'node node-start' : isWall ? 'node node-wall' : 'node';
        const nodeID = "node-" + col + "-" + row
        return (
            <div id={nodeID} className={className} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}
                 onMouseUp={onMouseUp}/>
        );
    }
}

export default Node;