import React from "react";
import Markdown from "../../Common/Markdown";
import {pathfindingMarkdown} from "../Markdown/Markdown";
import Sections from "../../Common/Sections";

type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

const sections = ["Graphs", "Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Edge-Weighted Graphs",
    "Minimum Spanning Trees (MSTs)", "Edge-Weighted Digraphs","Shortest Paths", "Maxflow-Mincut"];

let wrapperStyle = {
    width: "100%"
}

class Pathfinding extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.section.current!.style.borderLeft = "10px white solid";
        this.props.section.current!.style.backgroundColor = "#29354b";
    }

    componentWillUnmount() {
        if (this.props.section.current !== null) {
            this.props.section.current.style.borderLeft = "none"
            this.props.section.current.style.backgroundColor = "inherit";
        }
    }

    render() {
        return (
            <div className={"documentation-wrapper"}>
                <div className={"documentation"}>
                    <div className={"markdown"}>
                        <Markdown markdown={pathfindingMarkdown}/>
                    </div>
                    <Sections wrapperStyle={wrapperStyle} sectionHighlight={false} sections={sections}
                              directory={"/AlgoVisual/documentation/pathfinding"}/>
                </div>
            </div>
        )
    }
}

export default Pathfinding;