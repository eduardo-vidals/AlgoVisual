export function getQuickSortAnimations(arr: number[]) {
    let animations: [number, number, boolean][] = [];
    quickSort(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSort(arr: number[], l: number, h: number, animations: [number, number, boolean][]) {
    if (l < h) {
        let j = partition(arr, l, h, animations);
        quickSort(arr, l, j, animations);
        quickSort(arr, j + 1, h, animations);
    }
}

function partition(arr: number[], l: number, h: number, animations: [number, number, boolean][]) {
    let pivot = arr[randomIntFromInterval(l, h)];
    let i = l - 1;
    let j = h + 1;

    while (true) {
        do {
            i++;
            animations.push([i, i, true]);
            animations.push([i, i, true]);
        } while (arr[i] < pivot);

        do {
            j--;
            animations.push([j, j, true]);
            animations.push([j, j, true]);
        } while (arr[j] > pivot);

        if (i >= j) {
            return j;
        }

        animations.push([i, arr[j], false]);
        animations.push([j, arr[i], false]);
        swap(arr, i, j);
    }
}

function swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}