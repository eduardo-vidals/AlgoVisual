import React, {useEffect, useLayoutEffect} from "react";
import {sortingMarkdown} from "../Markdown/Markdown";
import Markdown from "../../Common/Markdown";
import Sections from "../../Common/Sections";

type Props = {
  section: React.RefObject<HTMLDivElement>
};

const sections = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Analysis of Sorting Algorithms"]
let wrapperStyle = {
  width: "100%"
}

function Sorting(props: Props) {
  const {section} = props;

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
          <Markdown markdown={sortingMarkdown}/>
        </div>
        <Sections wrapperStyle={wrapperStyle} sections={sections}
                  directory={"/AlgoVisual/documentation/sorting"} sectionHighlight={false}/>
      </div>
    </div>
  );
}

export default Sorting;
