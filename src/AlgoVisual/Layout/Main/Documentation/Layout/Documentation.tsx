import React, {createRef, useState} from "react";
import "./Documentation.css";
import {Link, Routes, Route} from "react-router-dom";
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
      { /* <ScrollToTopOnNewPage/> */}
      <Routes>
        {/* main documentation page */}
        <Route path={""} element={<Introduction section={gettingStartedSection}/>}/>


        {/* data structures and sections */}
        <Route path={"data-structures"}
               element={<DataStructures section={dataStructuresSection}/>}/>

        <Route path={"data-structures/time-complexity"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={1}
                                      markdown={pageMarkdown.timeComplexityMarkdown}
                                      section={dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/array-list"}
                                      nextSection={true} nextSectionName={"2. ArrayList"}/>}/>

        <Route path={"data-structures/array-list"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={2}
                                      markdown={pageMarkdown.arraylistMarkdown} section={dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/linked-list"}
                                      nextSection={true} nextSectionName={"3. LinkedList"}/>}/>

        <Route path={"data-structures/linked-list"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={3}
                                      markdown={pageMarkdown.linkedlistMarkdown} section={dataStructuresSection}
                                      nextSectionDirectory={"/AlgoVisual/documentation/data-structures/priority-queues"}
                                      nextSection={true} nextSectionName={"4. Priority Queues"}/>}/>

        <Route path={"data-structures/priority-queues"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={4}
                        markdown={pageMarkdown.pqMarkdown} section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/binary-search-trees"}
                        nextSection={true} nextSectionName={"5. Binary Search Trees"}/>}/>

        <Route path={"data-structures/binary-search-trees"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                        sections={dataStructuresSections} partNumber={5}
                        markdown={pageMarkdown.binarySearchTreesMarkdown}
                        section={dataStructuresSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/data-structures/analysis-of-data-structures"}
                        nextSection={true} nextSectionName={"6. Analysis of Data Structures"}/>}/>

        <Route path={"data-structures/analysis-of-data-structures"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/data-structures"}
                                      sections={dataStructuresSections} partNumber={6}
                                      markdown={pageMarkdown.analysisOfDataStructuresMarkdown}
                                      section={dataStructuresSection}
                                      nextSection={false}/>}/>

        {/* sorting and sections */}
        <Route path={"sorting"} element={<Sorting section={sortingSection}/>}/>

        <Route path={"sorting/bubble-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={1} markdown={pageMarkdown.bubbleSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/insertion-sort"}
                        nextSection={true} nextSectionName={"2. Insertion Sort"}/>}/>

        <Route path={"sorting/insertion-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={2} markdown={pageMarkdown.insertionSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/selection-sort"}
                        nextSection={true} nextSectionName={"3. Selection Sort"}/>}/>

        <Route path={"sorting/selection-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={3} markdown={pageMarkdown.selectionSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/merge-sort"}
                        nextSection={true} nextSectionName={"4. Merge Sort"}/>}/>

        <Route path={"sorting/merge-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={4} markdown={pageMarkdown.mergeSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/quick-sort"}
                        nextSection={true} nextSectionName={"5. Quick Sort"}/>}/>

        <Route path={"sorting/quick-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={5} markdown={pageMarkdown.quickSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/heap-sort"}
                        nextSection={true} nextSectionName={"6. Heap Sort"}/>}/>

        <Route path={"sorting/heap-sort"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                        partNumber={6} markdown={pageMarkdown.heapSortMarkdown}
                        section={sortingSection}
                        nextSectionDirectory={"/AlgoVisual/documentation/sorting/analysis-of-sorting-algorithms"}
                        nextSection={true} nextSectionName={"7. Analysis of Sorting Algorithms"}/>}/>


        <Route path={"sorting/analysis-of-sorting-algorithms"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/sorting"} sections={sortingSections}
                                      partNumber={7} markdown={pageMarkdown.analysisOfSortingAlgorithmsMarkdown}
                                      section={sortingSection}
                                      nextSection={false}/>}/>

        {/* pathfinding and sections */}
        <Route path={"pathfinding"} element={<Pathfinding section={pathfindingSection}/>}/>

        <Route path={"pathfinding/graphs"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={1}
                        markdown={pageMarkdown.graphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"2. Depth-First Search (DFS)"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/depth-first-search"}/>}/>

        <Route path={"pathfinding/depth-first-search"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={2}
                        markdown={pageMarkdown.dfsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"3. Breadth-First Search (BFS)"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/breadth-first-search"}/>}/>

        <Route path={"pathfinding/breadth-first-search"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={3}
                        markdown={pageMarkdown.bfsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"4. Edge-Weighted Graphs"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/edge-weighted-graphs"}/>}/>

        <Route path={"pathfinding/edge-weighted-graphs"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={4}
                        markdown={pageMarkdown.edgeWeightedGraphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"5. Minimum Spanning Trees"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/minimum-spanning-trees"}/>}/>

        <Route path={"pathfinding/minimum-spanning-trees"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={5}
                        markdown={pageMarkdown.mstsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"6. Edge-Weighted Digraphs"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/edge-weighted-digraphs"}/>}/>

        <Route path={"pathfinding/edge-weighted-digraphs"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={6}
                        markdown={pageMarkdown.edgeWeightedDigraphsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"7. Shortest Paths"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/shortest-paths"}/>}/>

        <Route path={"pathfinding/shortest-paths"} element={
          <MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                        sections={pathfindingSections} partNumber={7}
                        markdown={pageMarkdown.shortestPathsMarkdown} section={pathfindingSection}
                        nextSection={true} nextSectionName={"8. Maxflow-Mincut"}
                        nextSectionDirectory={"/AlgoVisual/documentation/pathfinding/maxflow-mincut"}/>}/>

        <Route path={"pathfinding/maxflow-mincut"}
               element={<MarkdownPage mainDirectory={"/AlgoVisual/documentation/pathfinding"}
                                      sections={pathfindingSections} partNumber={8}
                                      markdown={pageMarkdown.maxFlowMinCutMarkdown} section={pathfindingSection}
                                      nextSection={false}/>}/>

      </Routes>

      <ScrollToTopButton/>
    </main>
  );
}

export default Documentation;
