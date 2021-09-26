import React from "react";
import {datastructuresMarkdown} from "../Markdown/Markdown";
import Sections from "../../Common/Sections";
import Markdown from "../../Common/Markdown";


type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

const sections = ["Time Complexity", "ArrayList", "LinkedList", "Heaps", "Binary Search Trees", "Analysis of Data Structures"];

class DataStructures extends React.Component<Props, State> {
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
                        <Markdown markdown={datastructuresMarkdown}/>
                    </div>
                    <Sections sectionHighlight={false} sections={sections} directory={"/AlgoVisual/documentation/data-structures"}/>
                </div>
            </div>
        )
    }
}

export default DataStructures;