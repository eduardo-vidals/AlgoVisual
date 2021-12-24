import React, {useEffect} from "react";
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

const endSectionStyle = {
  margin: "20px 0"
}

let wrapperStyle = {
  width: "60%"
}

function MarkdownPage(props: Props) {
  const {section, markdown, sections, mainDirectory, partNumber} = props;

  useEffect(() => {
    section.current!.style.borderLeft = "10px white solid";
    section.current!.style.backgroundColor = "#29354b";
    return () => {
      if (section.current){
        section.current!.style.borderLeft = "none";
        section.current!.style.backgroundColor = "inherit";
      }
    }
  }, [])

  return (
    <div className={"documentation-wrapper"}>
      <div className={"documentation"}>
        <div className={"markdown"}>
          <Markdown markdown={markdown}/>
        </div>
        {props.nextSection ? <NextSection directory={props.nextSectionDirectory} sectionName={props.nextSectionName}/> :
          <p style={endSectionStyle}> You have reached the end of the section!</p>}
        <Sections wrapperStyle={wrapperStyle} sections={sections} directory={mainDirectory}
                  sectionHighlight={true}
                  section={partNumber}/>
      </div>
    </div>
  );
}

export default MarkdownPage;
