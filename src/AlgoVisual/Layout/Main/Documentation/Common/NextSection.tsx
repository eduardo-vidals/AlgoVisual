import React from "react";
import {Link} from "react-router-dom";
import "./NextSection.css";

type Props = {
    directory: string
    sectionName: string
};
type State = {};

const endSectionStyle = {
    marginTop: "20px"
}

const nextSectionStyle = {
    margin: "15px 0",
    display: "flex",
    padding: "10px 5px",
    borderRadius: "5px",
    color: "black"
}

const nextSectionTextStyle = {
    marginLeft: "10px",
    fontSize: "15px"
}

const textDecoration = {
    textDecoration: "none"
}

class NextSection extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={"next-section-wrapper"}>
                <p style={endSectionStyle}> You have reached the end of this section! Continue to the next section: </p>
                <Link to={this.props.directory} style={textDecoration}>
                    <div className={"next-section"} style={nextSectionStyle}>
                        <i className="fas fa-arrow-right"/>
                        <p style={nextSectionTextStyle}> {this.props.sectionName} </p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default NextSection;