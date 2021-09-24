import React from "react";
import ReactMarkdown from "react-markdown";
import {bubbleSortMarkdown} from "../../Markdown/Markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import themeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import {MathComponent} from "mathjax-react";

type Props = {
    section: React.RefObject<HTMLDivElement>
};
type State = {};

class BubbleSortDocumentation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.props.section.current!.style.borderLeft = "10px white solid";
        this.props.section.current!.style.backgroundColor = "#29354b";
    }

    componentWillUnmount() {
        if (this.props.section.current !== null){
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
                            children={bubbleSortMarkdown}
                            remarkPlugins={[[remarkGfm], [remarkBreaks]]}
                            components={{
                                a: ({...props}) => <a target={"_blank"} {...props} />,
                                em: ({...props}) => {
                                    if (props.children[0] && typeof props.children[0] === 'string' && props.children[0].startsWith('$')) {
                                        return <MathComponent tex={String(props.children[0].substring(1))}
                                                              display={false}> </MathComponent>
                                    }
                                    return <i {...props}/>
                                },
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
                    </div>
                </div>
            </div>
        );
    }
}

export default BubbleSortDocumentation;