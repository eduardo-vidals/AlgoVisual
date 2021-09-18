export function getBubbleSortAnimations(arr: number[]) {
    let animations: [number, number, boolean][] = [];
    bubbleSort(arr, animations);
    return animations;
}

function bubbleSort(arr: number[], animations: [number, number, boolean][]) {
    for (let i = 0; i < arr.length - 1; i++) {
        let count = 0;
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // comparing values
            animations.push([j, j + 1, true]);
            animations.push([j, j + 1, true]);
            if (arr[j] > arr[j + 1]) {
                animations.push([j, arr[j + 1], false]);
                animations.push([j + 1, arr[j], false]);
                swap(arr, j, j + 1);
            } else {
                count++;
            }
        }
        if (count === arr.length - 1){
            break;
        }
    }
}

function swap(arr: number[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}