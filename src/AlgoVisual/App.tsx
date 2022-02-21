import React from 'react';
import './App.css';
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Home from "./Layout/Main/Home/Home";
import Documentation from "./Layout/Main/Documentation/Layout/Documentation";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SortingVisualizer from "./Layout/Main/SortingVisualizer/SortingVisualizer";
import PathfindingVisualizer from "./Layout/Main/PathfindingVisualizer/PathfindingVisualizer";

function App() {
  return (
    <Router>
      <div id={"app-wrapper"}>
        <Header/>
        <Routes>
          <Route path="/AlgoVisual" element={<Home/>}/>

          <Route path="/AlgoVisual/sorting" element={<SortingVisualizer/>}/>

          <Route path="/AlgoVisual/pathfinding" element={<PathfindingVisualizer/>}/>

          <Route path="/AlgoVisual/documentation/*" element={<Documentation/>}/>

          <Route path="/AlgoVisual/about"/>

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
