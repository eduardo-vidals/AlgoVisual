import React, {useEffect, useLayoutEffect} from "react";
import Markdown from "../../Common/Markdown";
import {pathfindingMarkdown} from "../Markdown/Markdown";
import Sections from "../../Common/Sections";

type Props = {
  section: React.RefObject<HTMLDivElement>
};
type State = {};

const sections = ["Graphs", "Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Edge-Weighted Graphs",
  "Minimum Spanning Trees (MSTs)", "Edge-Weighted Digraphs", "Shortest Paths", "Maxflow-Mincut"];

let wrapperStyle = {
  width: "100%"
}

function Pathfinding(props: Props) {
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
          <Markdown markdown={pathfindingMarkdown}/>
        </div>
        <Sections wrapperStyle={wrapperStyle} sectionHighlight={false} sections={sections}
                  directory={"/AlgoVisual/documentation/pathfinding"}/>
      </div>
    </div>
  );
}

export default Pathfinding;
