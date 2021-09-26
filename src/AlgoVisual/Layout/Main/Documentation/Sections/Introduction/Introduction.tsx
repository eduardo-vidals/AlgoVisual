import React from "react";
import {introductionMarkdown} from "../Markdown/Markdown";
import Markdown from "../../Common/Markdown";

type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

class Introduction extends React.Component<Props, State> {
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
                        <Markdown markdown={introductionMarkdown}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;