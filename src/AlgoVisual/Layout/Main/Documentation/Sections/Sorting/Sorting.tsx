import React from "react";
import {sortingMarkdown} from "../Markdown/Markdown";
import Markdown from "../../Common/Markdown";
import Sections from "../../Common/Sections";

type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

const sections = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Analysis of Sorting Algorithms"]
let wrapperStyle = {
    width: "100%"
}

class Sorting extends React.Component<Props, State> {
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
                        <Markdown markdown={sortingMarkdown}/>
                    </div>
                    <Sections wrapperStyle={wrapperStyle} sections={sections}
                              directory={"/AlgoVisual/documentation/sorting"} sectionHighlight={false}/>
                </div>
            </div>
        )
    }
}

export default Sorting;