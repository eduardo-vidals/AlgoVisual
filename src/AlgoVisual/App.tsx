import React from 'react';
import './App.css';
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Home from "./Layout/Main/Home/Home";
import Documentation from "./Layout/Main/Documentation/Layout/Documentation";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SortingVisualizer from "./Layout/Main/SortingVisualizer/SortingVisualizer";

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div id={"app-wrapper"}>
                    <Header/>
                    <Switch>
                        <Route exact path="/AlgoVisual">
                            <Home/>
                        </Route>

                        <Route exact path="/AlgoVisual/sorting">
                            <SortingVisualizer/>
                        </Route>

                        <Route exact path="/AlgoVisual/pathfinding">

                        </Route>

                        <Route path="/AlgoVisual/documentation">
                            <Documentation/>
                        </Route>

                        <Route path="/AlgoVisual/about">

                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default App;
