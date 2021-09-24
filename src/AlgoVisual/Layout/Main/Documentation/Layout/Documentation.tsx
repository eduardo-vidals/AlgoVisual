import React, {createRef} from "react";
import "./Documentation.css";
import {Link, Route, Switch} from "react-router-dom";
import GettingStarted from "../Sections/Introduction/Introduction";
import DataStructures from "../Sections/DataStructures/DataStructures";
import Sorting from "../Sections/Sorting/Sorting";
import Pathfinding from "../Sections/Pathfinding/Pathfinding";
import ArrayListDocumentation from "../Sections/DataStructures/Sections/ArrayListDocumentation";
import LinkedListDocumentation from "../Sections/DataStructures/Sections/LinkedListDocumentation";
import BubbleSortDocumentation from "../Sections/Sorting/Sections/BubbleSortDocumentation";
import InsertionSortDocumentation from "../Sections/Sorting/Sections/InsertionSortDocumentation";
import SelectionSortDocumentation from "../Sections/Sorting/Sections/SelectionSortDocumentation";
import MergeSortDocumentation from "../Sections/Sorting/Sections/MergeSortDocumentation";
import QuickSortDocumentation from "../Sections/Sorting/Sections/QuickSortDocumentation";
import HeapSortDocumentation from "../Sections/Sorting/Sections/HeapSortDocumentation";
import TimeComplexityDocumentation from "../Sections/DataStructures/Sections/TimeComplexityDocumentation";

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

                    <Route exact path={"/AlgoVisual/documentation/data-structures/time-complexity"}>
                        <TimeComplexityDocumentation section={this.dataStructuresSection}/>
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

                    <Route exact path={"/AlgoVisual/documentation/sorting/bubble-sort"}>
                        <BubbleSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/insertion-sort"}>
                        <InsertionSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/selection-sort"}>
                        <SelectionSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/merge-sort"}>
                        <MergeSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/quick-sort"}>
                        <QuickSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/heap-sort"}>
                        <HeapSortDocumentation section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}>
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