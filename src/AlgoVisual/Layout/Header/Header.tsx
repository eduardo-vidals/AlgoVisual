import React, {createRef} from "react";
import "./Header.css";
import {Link} from "react-router-dom"

type Props = {};
type State = {
    showAlgosMenu: boolean
};

class Header extends React.Component<Props, State> {
    private dropdownMenu = createRef<HTMLDivElement>();
    private dropdownCaret = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            showAlgosMenu: false
        }

        // methods
        this.showAlgosMenu = this.showAlgosMenu.bind(this);
        this.closeAlgosMenu = this.closeAlgosMenu.bind(this);
        this.displayAlgosMenu = this.displayAlgosMenu.bind(this);
    }

    showAlgosMenu(e: React.MouseEvent) {
        // ensures that you close menu when clicked again
        if (!this.state.showAlgosMenu){
            this.setState({showAlgosMenu: true}, () => this.displayAlgosMenu());
            // not sure why this works but will figure out soon
            // makes dropdown work magically!
            e.stopPropagation();
            document.addEventListener("click", this.closeAlgosMenu);
        }
    }

    closeAlgosMenu() {
        this.setState({showAlgosMenu: false}, () => this.displayAlgosMenu());
        document.removeEventListener("click", this.closeAlgosMenu)
    }

    displayAlgosMenu() {
        if (this.state.showAlgosMenu) {
            this.dropdownMenu.current!.style.display = "block";
            this.dropdownCaret.current!.style.transform = "rotate(180deg)";
            this.dropdownCaret.current!.style.transition = "all 300ms linear";
        } else {
            this.dropdownMenu.current!.style.display = "none";
            this.dropdownCaret.current!.style.transform = "rotate(0deg)";
            this.dropdownCaret.current!.style.transition = "all 300ms linear";
        }
    }

    render() {
        return (
            <header id={"header"}>
                <div id={"logo-wrapper"}>
                    <Link to={"/"}>
                        <p id={"name"}> AlgoVisual </p>
                    </Link>
                </div>

                <div id={"nav-wrapper"}>
                    <nav id={"nav-bar"}>
                        <ul>
                            <li>
                                <div className={"nav-link"}>
                                    <div className={"nav-option"} onClick={this.showAlgosMenu}>
                                        <p className={"noselect"}> Algorithms </p>
                                        <i className="fas fa-caret-down" ref={this.dropdownCaret}> </i>
                                    </div>
                                    <div id={"dropdown"} ref={this.dropdownMenu}>
                                        <ul>
                                            <li>
                                                <Link to={"/sorting"} className={"nav-link"}>
                                                    <div className={"algos-option"}>
                                                        <p> Sorting </p>
                                                    </div>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to={"/pathfinding"} className={"nav-link"}>
                                                    <div className={"algos-option"}>
                                                        <p> Pathfinding </p>
                                                    </div>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to={"/datastructures"} className={"nav-link"}>
                                                    <div className={"algos-option"}>
                                                        <p> Data Structures </p>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <Link to={"/documentation"} className={"nav-link"}>
                                    <div className={"nav-option"}>
                                        <p> Documentation </p>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to={"/about"} className={"nav-link"}>
                                    <div className={"nav-option"}>
                                        <p> About </p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;