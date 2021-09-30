import React from "react";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import themeStyle from "react-syntax-highlighter/dist/esm/styles/prism/nord";
import ReactMarkdown from "react-markdown";
import {MathComponent} from "mathjax-react";

type Props = {
    markdown: string;
};

type State = {};

let codeStyle = {
    padding: "10px 30px 10px 0px",
    margin: 0,
    overflow: "auto"
}

class Markdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <ReactMarkdown
                children={this.props.markdown}
                remarkPlugins={[[remarkGfm], [remarkBreaks]]}
                components={{
                    a: ({...props}) => <a target={"_blank"} rel={"noreferrer"} {...props} />,
                    em: ({...props}) => {
                        if (props.children[0] && typeof props.children[0] === 'string' && props.children[0].startsWith('$')) {
                            return (<MathComponent tex={String(props.children[0].substring(1))}
                                                   display={false}
                                                   setting={{"internalSpeechTitles": true}}/>)

                        }
                        return <i {...props}/>
                    },
                    code({inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                customStyle={codeStyle}
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
                    },

                }}
            />
        )
    }
}

export default Markdown;