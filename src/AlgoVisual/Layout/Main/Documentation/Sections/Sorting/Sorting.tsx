import React from "react";
import "./Sorting.css";
import ReactMarkdown from "react-markdown";
import {sortingMarkdown} from "../Markdown/Markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import themeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import {Link} from "react-router-dom";

type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

class Sorting extends React.Component<Props, State> {
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
                <div className={"markdown-wrapper"}>
                    <div className={"markdown"}>
                        <ReactMarkdown
                            children={sortingMarkdown}
                            remarkPlugins={[[remarkGfm], [remarkBreaks]]}
                            components={{
                                a: ({...props}) => <a target={"_blank"} {...props} />,
                                code({inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, "")}
                                            customStyle={{padding: "20px 30px 20px 0px"}}
                                            style={themeStyle}
                                            showLineNumbers={true}
                                            language={match[1]}
                                            PreTag="div"
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />

                        <div className={"sections-wrapper"}>
                            <p className={"sections-header"}> Content that will be covered: </p>
                            <div className={"sections"}>
                                <ul>
                                    <Link to={"/AlgoVisual/documentation/sorting/bubble-sort"}>
                                        <li> 1. Bubble Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/insertion-sort"}>
                                        <li> 2. Insertion Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/selection-sort"}>
                                        <li> 3. Selection Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/merge-sort"}>
                                        <li> 4. Merge Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/quick-sort"}>
                                        <li> 5. Quick Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/heap-sort"}>
                                        <li> 6. Heap Sort</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}>
                                        <li> 7. Analysis of Sorting Algorithms</li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sorting;