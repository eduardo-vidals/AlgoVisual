import React, {useEffect, useLayoutEffect} from "react";
import {datastructuresMarkdown} from "../Markdown/Markdown";
import Sections from "../../Common/Sections";
import Markdown from "../../Common/Markdown";


type Props = {
  section: React.RefObject<HTMLDivElement>
};

const sections = ["Time Complexity", "ArrayList", "LinkedList", "Priority Queues", "Binary Search Trees", "Analysis of Data Structures"];

let wrapperStyle = {
  width: "100%"
}

function DataStructures(props: Props) {
  const {section} = props;

  useEffect(() => {
    section.current!.style.borderLeft = "10px white solid";
    section.current!.style.backgroundColor = "#29354b";
    return () => {
      if (section.current) {
        section.current!.style.borderLeft = "none";
        section.current!.style.backgroundColor = "inherit";
      }
    }
  }, [])

  return (
    <div className={"documentation-wrapper"}>
      <div className={"documentation"}>
        <div className={"markdown"}>
          <Markdown markdown={datastructuresMarkdown}/>
        </div>
        <Sections wrapperStyle={wrapperStyle} sectionHighlight={false} sections={sections}
                  directory={"/AlgoVisual/documentation/data-structures"}/>
      </div>
    </div>
  );
}

export default DataStructures;
