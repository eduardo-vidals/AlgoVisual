import React from "react";
import Markdown from "./Markdown";
import NextSection from "./NextSection";
import Sections from "./Sections";

type Props = | {
    markdown: string,
    nextSection: false,
    section: React.RefObject<HTMLDivElement>,
    partNumber: number,
    sections: string[],
    mainDirectory: string
}
    | {
    markdown: string,
    nextSection: true,
    nextSectionDirectory: string,
    nextSectionName: string,
    section: React.RefObject<HTMLDivElement>,
    partNumber: number,
    sections: string[],
    mainDirectory: string
};
type State = {};
const endSectionStyle = {
    margin: "20px 0"
}

let wrapperStyle = {
    width: "400px"
}

class MarkdownPage extends React.Component<Props, State> {
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
                        <Markdown markdown={this.props.markdown}/>
                    </div>
                    {this.props.nextSection ? <NextSection directory={this.props.nextSectionDirectory}
                                                           sectionName={this.props.nextSectionName}/> :
                        <p style={endSectionStyle}> You have reached the end of the section!</p>}
                    <Sections wrapperStyle={wrapperStyle} sections={this.props.sections} directory={this.props.mainDirectory} sectionHighlight={true}
                              section={this.props.partNumber}/>
                </div>
            </div>
        );
    }
}

export default MarkdownPage;
