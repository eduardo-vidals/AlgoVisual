import React, {createRef} from "react";
import "./Documentation.css";
import {Link, Route, Switch} from "react-router-dom";
import GettingStarted from "../Sections/Introduction/Introduction";
import DataStructures from "../Sections/DataStructures/DataStructures";
import Sorting from "../Sections/Sorting/Sorting";
import Pathfinding from "../Sections/Pathfinding/Pathfinding";
import * as pageMarkdown from "../Sections/Markdown/Markdown";
import ScrollToTop from "../Common/ScrollToTop";
import MarkdownPage from "../Common/MarkdownPage";
import "../Sections/Markdown/Markdown.css";

type Props = {};
type State = {
    hover: false,
};

const dataStructuresSections = ["Time Complexity", "ArrayList", "LinkedList", "Heaps", "Binary Search Trees", "Analysis of Data Structures"];
const sortingSections = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Analysis of Sorting Algorithms"]

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

                { /* scrolls to top of page */}
                <ScrollToTop/>
                <Switch>
                    {/* main documentation page */}
                    <Route exact path={"/AlgoVisual/documentation"}>
                        <GettingStarted section={this.gettingStartedSection}/>
                    </Route>

                    {/* data structures and sections */}
                    <Route exact path={"/AlgoVisual/documentation/data-structures"}>
                        <DataStructures section={this.dataStructuresSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/time-complexity"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={1}
                                      markdown={pageMarkdown.timeComplexityMarkdown}
                                      section={this.dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/array-list"}
                                      nextSection={true} nextSectionName={"2. ArrayList"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/array-list"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={2}
                                      markdown={pageMarkdown.arraylistMarkdown} section={this.dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/linked-list"}
                                      nextSection={true} nextSectionName={"3. LinkedList"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/linked-list"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={3}
                                      markdown={pageMarkdown.linkedlistMarkdown} section={this.dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/heaps"}
                                      nextSection={true} nextSectionName={"4. Heaps"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/heaps"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={4}
                                      markdown={pageMarkdown.heapsMarkdown} section={this.dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/binary-search-trees"}
                                      nextSection={true} nextSectionName={"5. Binary Search Trees"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/binary-search-trees"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={5}
                                      markdown={pageMarkdown.binarySearchTreesMarkdown} section={this.dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/analysis-of-data-structures"}
                                      nextSection={true} nextSectionName={"6. Analysis of Data Structures"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/data-structures/analysis-of-data-structures"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={6}
                                      markdown={pageMarkdown.analysisOfDataStructuresMarkdown} section={this.dataStructuresSection}
                                      nextSection={false}/>
                    </Route>

                    {/* sorting and sections */}
                    <Route exact path={"/AlgoVisual/documentation/sorting"}>
                        <Sorting section={this.sortingSection}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/bubble-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={1} markdown={pageMarkdown.bubbleSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/insertion-sort"}
                                      nextSection={true} nextSectionName={"2. Insertion Sort"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/insertion-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={2} markdown={pageMarkdown.insertionSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/selection-sort"}
                                      nextSection={true} nextSectionName={"3. Selection Sort"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/selection-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={3} markdown={pageMarkdown.selectionSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/merge-sort"}
                                      nextSection={true} nextSectionName={"4. Merge Sort"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/merge-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={4} markdown={pageMarkdown.mergeSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/quick-sort"}
                                      nextSection={true} nextSectionName={"5. Quick Sort"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/quick-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={5} markdown={pageMarkdown.quickSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/heap-sort"}
                                      nextSection={true} nextSectionName={"6. Heap Sort"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/heap-sort"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={6} markdown={pageMarkdown.heapSortMarkdown}
                                      section={this.sortingSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}
                                      nextSection={true} nextSectionName={"7. Analysis of Sorting Algorithms"}/>
                    </Route>

                    <Route exact path={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}>
                        <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={7} markdown={pageMarkdown.analysisOfSortingAlgorithmsMarkdown}
                                      section={this.sortingSection}
                                      nextSection={false}/>
                    </Route>

                    {/* pathfinding and sections */}
                    <Route exact path={"/AlgoVisual/documentation/pathfinding"}>
                        <Pathfinding section={this.pathfindingSection}/>
                    </Route>
                </Switch>
            </main>
        )
    }
}

export default Documentation;