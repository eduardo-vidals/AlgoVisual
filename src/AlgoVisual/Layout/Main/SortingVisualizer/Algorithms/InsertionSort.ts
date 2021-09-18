export function getInsertionSortAnimations(arr: number[]) {
    let animations: [number, number, boolean][] = [];
    insertionSort(arr, animations);
    return animations;
}

function insertionSort(arr: number[], animations: [number, number, boolean][]) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            animations.push([j + 1, j, true]);
            animations.push([j + 1, j, true]);
            animations.push([j + 1, arr[j], false]);
            arr[j + 1] = arr[j];
            j--;
        }
        animations.push([j + 1, i, true]);
        animations.push([j + 1, i, true]);
        animations.push([j + 1, key, false]);
        arr[j + 1] = key;
    }
}