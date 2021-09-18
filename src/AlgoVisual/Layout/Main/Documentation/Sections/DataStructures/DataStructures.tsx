import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import themeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import {datastructuresMarkdown} from "../Markdown/Markdown";
import {Link} from "react-router-dom";
import "./DataStructures.css";


type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

class DataStructures extends React.Component<Props, State> {
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
                            children={datastructuresMarkdown}
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
                                    <Link to={"/documentation/data-structures/array-list"}>
                                        <li> 1. ArrayList</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/documentation/data-structures/linked-list"}>
                                        <li> 2. LinkedList</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/documentation/data-structures/heaps"}>
                                        <li> 3. Heaps</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/documentation/data-structures/binary-search-trees"}>
                                        <li> 4. Binary Search Trees</li>
                                    </Link>
                                    <hr className={"section-break"}/>

                                    <Link to={"/documentation/data-structures/b"}>
                                        <li> 5. Analysis of Data Structures </li>
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

export default DataStructures;