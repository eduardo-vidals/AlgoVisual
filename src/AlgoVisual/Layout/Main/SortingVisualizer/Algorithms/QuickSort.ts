export function getQuickSortAnimations(arr: number[]): [[number, number, string, string][], number[]] {
    let animations: [number, number, string, string][] = [];
    arr = arr.slice();
    quickSort(arr, 0, arr.length - 1, animations);
    return [animations, arr];
}

function quickSort(arr: number[], l: number, h: number, animations: [number, number, string, string][]) {
    if (l < h) {
        let j = partition(arr, l, h, animations);
        quickSort(arr, l, j, animations);
        quickSort(arr, j + 1, h, animations);
    }
}

function partition(arr: number[], l: number, h: number, animations: [number, number, string, string][]) {
    let pivotIndex = randomIntFromInterval(l, h);
    let swappedPivotIndex: any;
    let pivot = arr[pivotIndex];
    animations.push([pivotIndex, pivotIndex, 'pivot', 'insert']);
    let i = l - 1;
    let j = h + 1;
    while (true) {
        do {
            i++;
            animations.push([i, i, 'color', 'insert']);
            animations.push([i, i, 'color', 'revert']);
        } while (arr[i] < pivot);

        do {
            j--;
            animations.push([j, j, 'color', 'insert']);
            animations.push([j, j, 'color', 'revert']);
        } while (arr[j] > pivot);

        if (i >= j) {
            animations.push([swappedPivotIndex, swappedPivotIndex, 'pivot', 'revert']);
            return j;
        }


        animations.push([i, arr[j], 'swap', 'swap']);
        animations.push([j, arr[i], 'swap', 'swap']);
        swap(arr, i, j);


        if (i === pivotIndex) {
            animations.push([j, j, 'pivot', 'insert']);
            swappedPivotIndex = j;
        } else if (j === pivotIndex) {
            animations.push([i, i, 'pivot', 'insert']);
            swappedPivotIndex = i;
        }
    }
}

function swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min) + min);
}
