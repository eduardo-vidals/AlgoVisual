import React, {createRef} from "react";
import "./Documentation.css";
import {Link, Route, Switch} from "react-router-dom";
import GettingStarted from "../Sections/Introduction/Introduction";
import DataStructures from "../Sections/DataStructures/DataStructures";
import Sorting from "../Sections/Sorting/Sorting";
import Pathfinding from "../Sections/Pathfinding/Pathfinding";
import ArrayListDocumentation from "../Sections/DataStructures/Sections/ArrayList/ArrayListDocumentation";
import LinkedListDocumentation from "../Sections/DataStructures/Sections/LinkedList/LinkedListDocumentation";

type Props = {};
type State = {
    hover: false,
};

class Documentation extends React.Component {
    private gettingStartedSection = createRef<HTMLDivElement>();
    private dataStructuresSection = createRef<HTMLDivElement>();
    private sortingSection = createRef<HTMLDivElement>();
    private pathfindingSection = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <main className={"main-sidebar"}>
                <div className={"sidebar"}>
                    <div id={"documentation-section"}>
                        <Link to={"/AlgoVisual/documentation"} className={"documentation-link"}>
                            <div className={"section"} ref={this.gettingStartedSection}>
                                <p> Introduction </p>
                            </div>
                        </Link>

                        <Link to={"/AlgoVisual/documentation/data-structures"} className={"documentation-link"}>
                            <div className={"section"} ref={this.dataStructuresSection}>
                                <p> Data Structures </p>
                            </div>
                        </Link>

                        <Link to={"/AlgoVisual/documentation/sorting"} className={"documentation-link"}>
                            <div className={"section"} ref={this.sortingSection}>
                                <p> Sorting </p>
                            </div>
                        </Link>

                        <Link to={"/AlgoVisual/documentation/pathfinding"} className={"documentation-link"}>
                            <div className={"section"} ref={this.pathfindingSection}>
                                <p> Pathfinding </p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Switch>
                    // main documentation page
                    <Route exact path={"/AlgoVisual/documentation"}>
                        <GettingStarted section={this.gettingStartedSection}/>
                    </Route>

                    // data structures & sections
                    <Route exact path={"/AlgoVisual/documentation/data-structures"}>
                        <DataStructures section={this.dataStructuresSection}/>
                    </Route>


                    <Route exact path={"/AlgoVisual/documentation/data-structures/array-list"}>
                        <ArrayListDocumentation section={this.dataStructuresSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/linked-list"}>
                        <LinkedListDocumentation section={this.dataStructuresSection}/>
                    </Route>

                    // sorting & sections
                    <Route exact path={"/AlgoVisual/documentation/sorting"}>
                        <Sorting section={this.sortingSection}/>
                    </Route>


                    // pathfinding & sections
                    <Route exact path={"/AlgoVisual/documentation/pathfinding"}>
                        <Pathfinding section={this.pathfindingSection}/>
                    </Route>
                </Switch>
            </main>
        )
    }
}

export default Documentation;