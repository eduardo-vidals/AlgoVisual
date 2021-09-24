import React, {ChangeEvent, createRef} from "react";
import "./SortingVisualizer.css";
import {getInsertionSortAnimations} from "./Algorithms/InsertionSort";
import {getBubbleSortAnimations} from "./Algorithms/BubbleSort";
import {getMergeSortAnimations} from "./Algorithms/MergeSort";
import {getQuickSortAnimations} from "./Algorithms/QuickSort";
import {getHeapSortAnimations} from "./Algorithms/HeapSort";
import {getSelectionSortAnimations} from "./Algorithms/SelectionSort";
import {Slider} from "@mui/material";

// This is the main color of the array bars.
const PRIMARY_COLOR = '#98d6e8';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#33435d';

// sorting algorithms
const options = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort"];

type Props = {};

type State = {
    arr: number[],
    numberOfBars: number,
    sortingSpeed: number,
    sortingAlgorithm: string,
    showSortingOptions: boolean,
    optionsDisabled: boolean,
    animationLength: number,
    sliderStyle: any,
    keepTimeout: boolean
}

class SortingVisualizer extends React.Component<Props, State> {
    private dropdownSelection = createRef<HTMLDivElement>();
    private dropdownCaret = createRef<HTMLDivElement>();
    private runButton = createRef<HTMLButtonElement>();
    private resetButton = createRef<HTMLButtonElement>();
    private timer: any;

    constructor(props: Props) {
        super(props);
        this.timer = null;
        this.state = {
            arr: [],
            numberOfBars: 100,
            sortingSpeed:  20,
            sortingAlgorithm: "Quick Sort",
            showSortingOptions: false,
            optionsDisabled: false,
            animationLength: 0,
            sliderStyle: {
                color: "#33435d",
                ":hover": {
                    boxShadow: 0
                },

                '& .MuiSlider-thumb': {
                    bgcolor: "#85a4d9",
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: '0',
                    },
                },
                '& .MuiSlider-valueLabel': {
                    display: "none"
                }
            } as const,
            keepTimeout: true
        };
        this.resetArray = this.resetArray.bind(this);
        this.changeWidthBasedOnSize = this.changeWidthBasedOnSize.bind(this);
        this.numberOfBars = this.numberOfBars.bind(this);
        this.sliderSpeed = this.sliderSpeed.bind(this);
        this.runSortingAlgorithm = this.runSortingAlgorithm.bind(this);
        this.buttonEnter = this.buttonEnter.bind(this);
        this.buttonLeave = this.buttonLeave.bind(this);

        // methods
        this.showSortingAlgorithms = this.showSortingAlgorithms.bind(this);
        this.closeSortingAlgorithms = this.closeSortingAlgorithms.bind(this);
        this.displaySortingAlgorithms = this.displaySortingAlgorithms.bind(this);
        this.changeAlgorithm = this.changeAlgorithm.bind(this);
    }

    componentDidMount() {
        this.resetArray();
        window.addEventListener('resize', () => {
            this.resetArray();
        }, true);
    }

    resetArray() {
        // resize the array based on
        if (!this.state.optionsDisabled){
            let screenHeight = document.getElementById("app-wrapper")!.clientHeight;
            let headerHeight = document.getElementById("header")!.clientHeight;
            let footerHeight = document.getElementById("footer")!.clientHeight;
            let containerHeight = screenHeight - headerHeight - footerHeight;
            let maxBarHeight = containerHeight - 100;
            const arr = [];
            for (let i = 0; i < this.state.numberOfBars; i++) {
                arr.push(randomIntFromInterval(5, maxBarHeight));
            }

            // use changeBarsWidth here as a callback to ensure the arr is already updated!!
            this.setState({arr}, () => this.changeWidthBasedOnSize(this.state.arr));
        }
    }

    // change width of bars
    changeWidthBasedOnSize(arr: number[]) {
        if (arr.length <= 20) {
            this.changeBarsWidth(60)
        } else if (arr.length <= 40) {
            this.changeBarsWidth(35)
        } else if (arr.length <= 100) {
            this.changeBarsWidth(10);
        } else if (arr.length <= 150) {
            this.changeBarsWidth(8);
        } else if (arr.length <= 200) {
            this.changeBarsWidth(5);
        } else {
            this.changeBarsWidth(3);
        }
    }

    changeBarsWidth(width: number) {
        let arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            let bar = arrayBars[i] as HTMLElement;
            bar.style.width = width + "px";
        }
    }

    // displaying the settings
    numberOfBars(e: Event, value: number | number[]) {
        this.setState({numberOfBars: value as number}, () => {
            // this ensures that the slider does not reset the array once the min/max is reached
            if (this.state.numberOfBars > 10 && this.state.numberOfBars < 250) {
                this.resetArray()
            }
        });
    }

    sliderSpeed(e: Event, value: number | number[]) {
        this.setState({sortingSpeed: value as number});
    }

    // button hover settings
    buttonEnter(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.state.optionsDisabled) {
            e.currentTarget.style.color = "#98d6e8";
        }
    }

    buttonLeave(e: React.MouseEvent<HTMLButtonElement>) {
        if (!this.state.optionsDisabled) {
            e.currentTarget.style.color = "#fff";
        }
    }

    // methods for dropdown menu
    showSortingAlgorithms(e: React.MouseEvent) {
        // ensures that you close menu when clicked again
        if (!this.state.showSortingOptions) {
            this.setState({showSortingOptions: true}, () => this.displaySortingAlgorithms());
            // not sure why this works but will figure out soon
            // makes dropdown work magically!
            e.stopPropagation();
            document.addEventListener("click", this.closeSortingAlgorithms);
        }
    }

    closeSortingAlgorithms() {
        this.setState({showSortingOptions: false}, () => this.displaySortingAlgorithms());
        document.removeEventListener("click", this.closeSortingAlgorithms)
    }

    displaySortingAlgorithms() {
        if (this.state.showSortingOptions) {
            this.dropdownSelection.current!.style.display = "block";
            this.dropdownCaret.current!.style.transform = "rotate(180deg)";
            this.dropdownCaret.current!.style.transition = "all 250ms linear";
        } else {
            this.dropdownSelection.current!.style.display = "none";
            this.dropdownCaret.current!.style.transform = "rotate(0deg)";
            this.dropdownCaret.current!.style.transition = "all 250ms linear";
        }
    }

    changeAlgorithm(option: string) {
        this.setState({sortingAlgorithm: option});
    }

    // sorting algorithms
    bubbleSort() {
        let animations = getBubbleSortAnimations(this.state.arr);
        this.sort(animations, 2);
    }

    insertionSort() {
        let animations = getInsertionSortAnimations(this.state.arr);
        this.sort(animations, 3);
    }

    selectionSort() {
        let animations = getSelectionSortAnimations(this.state.arr);
        this.sort(animations, 2);
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.arr);
        this.sort(animations, 3);
    }

    quickSort() {
        let animations = getQuickSortAnimations(this.state.arr);
        this.sortTest(animations);
    }

    heapSort() {
        let animations = getHeapSortAnimations(this.state.arr);
        this.sort(animations, 3);
    }

    sortTest(animations: [number, number, string, string][]){
        let animationLength = animations.length * this.state.sortingSpeed;
        this.enableSettings(animationLength);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            if (arrayBars !== undefined) {
                let animationType = animations[i][2];
                if (animationType === 'color') {
                    let [barOneIdx, barTwoIdx] = animations[i];
                    let barOne = arrayBars[barOneIdx] as HTMLElement;
                    let barTwo = arrayBars[barTwoIdx] as HTMLElement;
                    let colorState = animations[i][3];
                    let color = colorState === 'insert' ? SECONDARY_COLOR : PRIMARY_COLOR;
                    // keep track of timer to cancel timer operations once the component is unmounted
                    let t = setTimeout(() => {
                        if (barOne !== undefined || barTwo !== undefined) {
                            barOne.style.backgroundColor = color;
                            barTwo.style.backgroundColor = color;
                        }
                    }, i * this.state.sortingSpeed);
                    // clear timeout if bars are undefined (component is unmounted)
                    if (barOne === undefined || barTwo === undefined){
                        clearTimeout(t);
                    }
                } else if (animationType === 'swap') {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOne = arrayBars[barOneIdx] as HTMLElement;
                    // keep track of timer to cancel timer operations once the component is unmounted
                    let t = setTimeout(() => {
                        if (barOne !== undefined) {
                            barOne.style.height = newHeight + `px`;
                        }
                    }, i * this.state.sortingSpeed);
                    // clear timeout if bars are undefined (component is unmounted)
                    if (barOne === undefined){
                        clearTimeout(t);
                    }
                }else if (animationType === 'pivot') {
                    let [barOneIdx, barTwoIdx] = animations[i];
                    let barOne = arrayBars[barOneIdx] as HTMLElement;
                    let barTwo = arrayBars[barTwoIdx] as HTMLElement;
                    let colorState = animations[i][3];
                    let color = colorState === 'insert' ? '#83f57f' : PRIMARY_COLOR;
                    // keep track of timer to cancel timer operations once the component is unmounted
                    let t = setTimeout(() => {
                        if (barOne !== undefined || barTwo !== undefined) {
                            barOne.style.backgroundColor = color;
                            barTwo.style.backgroundColor = color;
                        }
                    }, i * this.state.sortingSpeed);
                    // clear timeout if bars are undefined (component is unmounted)
                    if (barOne === undefined || barTwo === undefined){
                        clearTimeout(t);
                    }
                }

            }
        }
    }

    // sorting helper method
    sort(animations: [number, number, boolean][], modulus: number) {
        let animationLength = animations.length * this.state.sortingSpeed;
        this.enableSettings(animationLength);
        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            if (arrayBars !== undefined) {
                let isColorChange = animations[i][2];
                if (isColorChange) {
                    let [barOneIdx, barTwoIdx] = animations[i];
                    let barOne = arrayBars[barOneIdx] as HTMLElement;
                    let barTwo = arrayBars[barTwoIdx] as HTMLElement;
                    let color = i % modulus === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                    // keep track of timer to cancel timer operations once the component is unmounted
                    let t = setTimeout(() => {
                        if (barOne !== undefined || barTwo !== undefined) {
                            barOne.style.backgroundColor = color;
                            barTwo.style.backgroundColor = color;
                        }
                    }, i * this.state.sortingSpeed);
                    // clear timeout if bars are undefined (component is unmounted)
                    if (barOne === undefined || barTwo === undefined){
                        clearTimeout(t);
                    }
                } else {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOne = arrayBars[barOneIdx] as HTMLElement;
                    // keep track of timer to cancel timer operations once the component is unmounted
                    let t = setTimeout(() => {
                        if (barOne !== undefined) {
                            barOne.style.height = newHeight + `px`;
                        }
                    }, i * this.state.sortingSpeed);
                    // clear timeout if bars are undefined (component is unmounted)
                    if (barOne === undefined){
                        clearTimeout(t);
                    }
                }
            }
        }
    }

    // run the sorting algorithm and disable buttons
    runSortingAlgorithm() {
        this.setState({optionsDisabled: true}, () => {
            switch (this.state.sortingAlgorithm) {
                case 'Bubble Sort':
                    this.bubbleSort();
                    break;
                case 'Insertion Sort':
                    this.insertionSort();
                    break;
                case 'Selection Sort':
                    this.selectionSort();
                    break;
                case 'Merge Sort':
                    this.mergeSort();
                    break;
                case 'Quick Sort':
                    this.quickSort();
                    break;
                case 'Heap Sort':
                    this.heapSort();
                    break;
            }
        });
        const buttons = document.getElementsByClassName('sidebar-button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i] as HTMLButtonElement;
            button.style.color = "#f5a0a0";
            button.style.cursor = "revert";
        }

        this.setState((state) => ({
            sliderStyle: {
                '& .MuiSlider-thumb': {
                    bgcolor: "#f5a0a0",
                    ":hover": {
                        boxShadow: 0
                    },
                },
            } as const
        }));
    }

    // enable settings once the the animation is over
    enableSettings(animationLength: number) {
        setTimeout(() => {
            this.setState({
                optionsDisabled: false,
                sliderStyle: {
                    color: "#33435d",
                    ":hover": {
                        boxShadow: 0
                    },
                    '& .MuiSlider-thumb': {
                        bgcolor: "#85a4d9",
                        ":hover": {
                            boxShadow: 0
                        },
                    },
                    '& .MuiSlider-valueLabel': {
                        display: "none"
                    }
                } as const
            });

            const buttons = document.getElementsByClassName('sidebar-button');
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i] as HTMLButtonElement;
                button.style.color = "#fff";
                button.style.cursor = "pointer";
            }
        }, animationLength);
    }

    render() {
        const {arr} = this.state;
        let bars = arr.map((value, idx) => (
            <div className="array-bar"
                 key={idx}
                 style={{backgroundColor: PRIMARY_COLOR, height: value + `px`}}>
            </div>
        ))

        return (
            <main className="main-sidebar">
                <div className={"sidebar"}>
                    <div className={"sidebar-settings"}>
                        <div className={"sidebar-setting"}>
                            <p> Control number of bars </p>
                            <p> {this.state.numberOfBars} bars </p>
                            <Slider sx={this.state.sliderStyle} disabled={this.state.optionsDisabled} min={10}
                                    onChange={this.numberOfBars} max={250} defaultValue={100} valueLabelDisplay="auto"/>
                        </div>

                        <div className={"sidebar-setting"}>
                            <p> Control visualizer speed </p>
                            <p> {this.state.sortingSpeed} ms </p>
                            <Slider sx={this.state.sliderStyle} disabled={this.state.optionsDisabled} min={1}
                                    onChange={this.sliderSpeed} max={100} defaultValue={1} valueLabelDisplay="auto"/>
                        </div>

                        <div className={"sidebar-setting"}>
                            <p> Choose an algorithm </p>

                            <div className={"selection-dropdown"} onClick={this.showSortingAlgorithms}>
                                <div className={"current-option"}>
                                    <p> {this.state.sortingAlgorithm} </p>
                                </div>

                                <div className={"caret-down"}>
                                    <i className="fas fa-caret-down" ref={this.dropdownCaret}> </i>
                                </div>
                            </div>
                            <div className={"selection-options"} ref={this.dropdownSelection}>
                                <ul>
                                    {
                                        options.map(option => (
                                            <div onClick={() => this.changeAlgorithm(option)}
                                                 key={option}> {option} </div>
                                        ))
                                    }
                                </ul>
                            </div>

                            <button disabled={this.state.optionsDisabled} className={"sidebar-button"}
                                    onClick={this.runSortingAlgorithm}
                                    onMouseEnter={this.buttonEnter} onMouseLeave={this.buttonLeave}
                                    ref={this.runButton}> Run
                            </button>
                        </div>

                        <div className={"sidebar-setting"}>
                            <p> Reset the array </p>
                            <button disabled={this.state.optionsDisabled} className={"sidebar-button"}
                                    onClick={this.resetArray}
                                    onMouseEnter={this.buttonEnter} onMouseLeave={this.buttonLeave}
                                    ref={this.resetButton}> Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div id={"bars-wrapper"}>
                    <div id={"bars"}>
                        {bars}
                    </div>
                </div>
            </main>
        );
    }
}

export default SortingVisualizer;

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}