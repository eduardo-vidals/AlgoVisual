export function getSelectionSortAnimations(arr: number[]) {
    let animations: [number, number, boolean][] = [];
    selectionSort(arr, animations);
    return animations;
}

function selectionSort(arr: number[], animations: [number, number, boolean][]) {
    for (let i = 0; i < arr.length; i++) {
        let min = arr[i];
        let minIndex = i;
        for (let j = i; j < arr.length; j++) {
            animations.push([j, j, true]);
            animations.push([j, j, true]);
            if (min > arr[j]){
                min = arr[j];
                minIndex = j;
            }
        }
        animations.push([i, arr[minIndex], false]);
        animations.push([minIndex, arr[i], false]);
        swap(arr, i, minIndex);
    }
}

function swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}