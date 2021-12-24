import React from "react";
import {Link} from "react-router-dom";
import "./Sections.css"

// section highlight is used when you're currently on a section
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

function Sections(props: Props) {
  const {sections, directory, sectionHighlight, wrapperStyle} = props;

  // turns pascal/snake case into dash seperated words (for links)
  const linkify = (text: string) => {
    return text
      .replace(/ *\([^)]*\) */g, "") // remove parantheses and contents
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([0-9])([^0-9])/g, '$1-$2')
      .replace(/([^0-9])([0-9])/g, '$1-$2')
      .replace(/-+/g, '-')
      .toLowerCase();
  }

  let sectionsContainer = sections.map((section, index) => (
    <div>
      <Link to={directory + "/" + linkify(section)} style={textDecoration}>
        {props.sectionHighlight && index === props.section - 1 ?
          <li key={section} style={listStyle} className={"active-section"}> {++index}. {section}</li> :
          <li key={section} style={listStyle}> {++index}. {section}</li>}
      </Link>
      {index < sections.length ? <hr style={listBreakStyle}/> : null}
    </div>
  ));


  return (
    <div className={"sections-wrapper-wrapper"}>
      <div className={"sections-wrapper"} style={wrapperStyle}>
        <div className={"sections"}>
          <p className={"sections-header"}> In this part: </p>
          <div className={"section-names"}>
            <ul>
              {sectionsContainer}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
