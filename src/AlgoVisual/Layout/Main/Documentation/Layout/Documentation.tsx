import React, {createRef, useState} from "react";
import "./Documentation.css";
import {Link, Route, Switch} from "react-router-dom";
import Introduction from "../Sections/Introduction/Introduction";
import DataStructures from "../Sections/DataStructures/DataStructures";
import Sorting from "../Sections/Sorting/Sorting";
import Pathfinding from "../Sections/Pathfinding/Pathfinding";
import * as pageMarkdown from "../Sections/Markdown/Markdown";
import ScrollToTopOnNewPage from "../Common/ScrollToTopOnNewPage";

import MarkdownPage from "../Common/MarkdownPage";
import "../Sections/Markdown/Markdown.css";
import ScrollToTopButton from "../Common/ScrollToTopButton";

const dataStructuresSections = ["Time Complexity", "ArrayList", "LinkedList", "Priority Queue", "Binary Search Trees", "Analysis of Data Structures"];
const sortingSections = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Analysis of Sorting Algorithms"]
const pathfindingSections = ["Graphs", "Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Edge-Weighted Graphs",
  "Minimum Spanning Trees (MSTs)", "Edge-Weighted Digraphs", "Shortest Paths", "Maxflow-Mincut"];

function Documentation() {
  const gettingStartedSection = createRef<HTMLDivElement>();
  const dataStructuresSection = createRef<HTMLDivElement>();
  const sortingSection = createRef<HTMLDivElement>();
  const pathfindingSection = createRef<HTMLDivElement>();

  return (
    <main className={"main-sidebar"}>
      <div className={"sidebar"}>
        <div id={"documentation-section"}>
          <Link to={"/AlgoVisual/documentation"} className={"documentation-link"}>
            <div className={"section"} ref={gettingStartedSection}>
              <p> Introduction </p>
            </div>
          </Link>

          <Link to={"/AlgoVisual/documentation/data-structures"} className={"documentation-link"}>
            <div className={"section"} ref={dataStructuresSection}>
              <p> Data Structures </p>
            </div>
          </Link>

          <Link to={"/AlgoVisual/documentation/sorting"} className={"documentation-link"}>
            <div className={"section"} ref={sortingSection}>
              <p> Sorting </p>
            </div>
          </Link>

          <Link to={"/AlgoVisual/documentation/pathfinding"} className={"documentation-link"}>
            <div className={"section"} ref={pathfindingSection}>
              <p> Pathfinding </p>
            </div>
          </Link>
        </div>
      </div>

      { /* scrolls to top of page */}
      <ScrollToTopOnNewPage/>
      <Switch>
        {/* main documentation page */}
        <Route exact path={"/AlgoVisual/documentation"}>
          <Introduction section={gettingStartedSection}/>
        </Route>

        {/* data structures and sections */}
        <Route exact path={"/AlgoVisual/documentation/data-structures"}>
          <DataStructures section={dataStructuresSection}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/time-complexity"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={1}
                        markdown={pageMarkdown.timeComplexityMarkdown}
                        section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/array-list"}
                        nextSection={true} nextSectionName={"2. ArrayList"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/array-list"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={2}
                        markdown={pageMarkdown.arraylistMarkdown} section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/linked-list"}
                        nextSection={true} nextSectionName={"3. LinkedList"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/linked-list"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={3}
                        markdown={pageMarkdown.linkedlistMarkdown} section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/priority-queues"}
                        nextSection={true} nextSectionName={"4. Priority Queues"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/priority-queues"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={4}
                        markdown={pageMarkdown.pqMarkdown} section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/binary-search-trees"}
                        nextSection={true} nextSectionName={"5. Binary Search Trees"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/binary-search-trees"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={5}
                        markdown={pageMarkdown.binarySearchTreesMarkdown}
                        section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/analysis-of-data-structures"}
                        nextSection={true} nextSectionName={"6. Analysis of Data Structures"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/data-structures/analysis-of-data-structures"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={6}
                        markdown={pageMarkdown.analysisOfDataStructuresMarkdown}
                        section={dataStructuresSection}
                        nextSection={false}/>
        </Route>

        {/* sorting and sections */}
        <Route exact path={"/AlgoVisual/documentation/sorting"}>
          <Sorting section={sortingSection}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/bubble-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={1} markdown={pageMarkdown.bubbleSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/insertion-sort"}
                        nextSection={true} nextSectionName={"2. Insertion Sort"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/insertion-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={2} markdown={pageMarkdown.insertionSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/selection-sort"}
                        nextSection={true} nextSectionName={"3. Selection Sort"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/selection-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={3} markdown={pageMarkdown.selectionSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/merge-sort"}
                        nextSection={true} nextSectionName={"4. Merge Sort"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/merge-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={4} markdown={pageMarkdown.mergeSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/quick-sort"}
                        nextSection={true} nextSectionName={"5. Quick Sort"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/quick-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={5} markdown={pageMarkdown.quickSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/heap-sort"}
                        nextSection={true} nextSectionName={"6. Heap Sort"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/heap-sort"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={6} markdown={pageMarkdown.heapSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}
                        nextSection={true} nextSectionName={"7. Analysis of Sorting Algorithms"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={7} markdown={pageMarkdown.analysisOfSortingAlgorithmsMarkdown}
                        section={sortingSection}
                        nextSection={false}/>
        </Route>

        {/* pathfinding and sections */}
        <Route exact path={"/AlgoVisual/documentation/pathfinding"}>
          <Pathfinding section={pathfindingSection}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/graphs"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={1}
                        markdown={pageMarkdown.graphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"2. Depth-First Search (DFS)"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/depth-first-search"}/>

        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/depth-first-search"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={2}
                        markdown={pageMarkdown.dfsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"3. Breadth-First Search (BFS)"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/breadth-first-search"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/breadth-first-search"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={3}
                        markdown={pageMarkdown.bfsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"4. Edge-Weighted Graphs"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/edge-weighted-graphs"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/edge-weighted-graphs"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={4}
                        markdown={pageMarkdown.edgeWeightedGraphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"5. Minimum Spanning Trees"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/minimum-spanning-trees"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/minimum-spanning-trees"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={5}
                        markdown={pageMarkdown.mstsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"6. Edge-Weighted Digraphs"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/edge-weighted-digraphs"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/edge-weighted-digraphs"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={6}
                        markdown={pageMarkdown.edgeWeightedDigraphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"7. Shortest Paths"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/shortest-paths"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/shortest-paths"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={7}
                        markdown={pageMarkdown.shortestPathsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"8. Maxflow-Mincut"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/maxflow-mincut"}/>
        </Route>

        <Route exact path={"/AlgoVisual/documentation/pathfinding/maxflow-mincut"}>
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={8}
                        markdown={pageMarkdown.maxFlowMinCutMarkdown} section={pathfindingSection}
                        nextSection={false}/>
        </Route>
      </Switch>

      <ScrollToTopButton/>
    </main>
  );
}

export default Documentation;
