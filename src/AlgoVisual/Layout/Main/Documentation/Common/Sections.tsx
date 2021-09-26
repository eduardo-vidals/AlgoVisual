import React from "react";
import {Link} from "react-router-dom";
import "./Sections.css"

type Props = | {
    sections: string[],
    directory: string,
    sectionHighlight: false,
    wrapperStyle?: any
} | {
    sections: string[],
    directory: string,
    sectionHighlight: true,
    section: number,
    wrapperStyle?: any
};

type State = {};

const textDecoration = {
    textDecoration: "none"
}

const listStyle = {
    listStyleType: "none",
    padding: "10px",
    margin: "10px 0",
    fontSize: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "black"
}

const listBreakStyle = {
    margin: "0 13px",
    height: "1px",
    backgroundColor: "#c5c5c5",
    border: "none",
    borderRadius: "5px"
}

class Sections extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    // turns pascal/snake case into dash seperated words (for links)
    dashify(text: string) {
        return text.replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([0-9])([^0-9])/g, '$1-$2')
            .replace(/([^0-9])([0-9])/g, '$1-$2')
            .replace(/-+/g, '-')
            .toLowerCase();
    }

    render() {
        let sections = this.props.sections.map((section, index) => (
            <div>
                <Link to={this.props.directory + "/" + this.dashify(section)} style={textDecoration}>
                    {this.props.sectionHighlight && index === this.props.section-1 ?
                        <li key={section} style={listStyle} className={"active-section"}> {++index}. {section}</li> :
                        <li key={section} style={listStyle}> {++index}. {section}</li>}
                </Link>
                {index < this.props.sections.length ? <hr style={listBreakStyle}/> : null}
            </div>
        ));

        return (
            <div className={"sections-wrapper-wrapper"}>
                <div className={"sections-wrapper"} style={this.props.wrapperStyle}>
                    <div className={"sections"}>
                        <p className={"sections-header"}> In this part: </p>
                        <div className={"section-names"}>
                            <ul>
                                {sections}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sections;