import React, {useEffect} from "react";
import {introductionMarkdown} from "../Markdown/Markdown";
import Markdown from "../../Common/Markdown";

type Props = {
  section: React.RefObject<HTMLDivElement>
};
type State = {};

function Introduction(props: Props) {
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
          <Markdown markdown={introductionMarkdown}/>
        </div>
      </div>
    </div>
  );
}


export default Introduction;
