import React from "react";
import "./ScrollToTopButton.css";

type Props = {};
type State = {
    isVisible: boolean
};

class ScrollToTopButton extends React.Component<Props, State>{
    constructor(props:Props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        const scrollComponent = this;
        document.addEventListener("scroll", () => {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (window.scrollY > 100) {
            this.setState({
                isVisible: true
            });
        } else {
            this.setState({
                isVisible: false
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <div className={"scroll-to-top-button"}>
                {this.state.isVisible && (
                    <div onClick={() => this.scrollToTop()}>
                        <div className={"scroll-up"}>
                            <i className="fas fa-angle-up"/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ScrollToTopButton;