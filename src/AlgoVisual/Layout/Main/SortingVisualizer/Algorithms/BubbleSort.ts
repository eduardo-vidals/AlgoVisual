export function getBubbleSortAnimations(arr: number[]): [[number, number, string, string][], number[]] {
    let animations: [number, number, string, string][] = [];
    arr = arr.slice();
    bubbleSort(arr, animations);
    return [animations, arr];
}

function bubbleSort(arr: number[], animations: [number, number, string, string][]) {
    for (let i = 0; i < arr.length - 1; i++) {
        let count = 0;
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // comparing values
            animations.push([j, j + 1, 'color', 'insert']);
            animations.push([j, j + 1, 'color', 'revert']);
            if (arr[j] > arr[j + 1]) {
                animations.push([j, arr[j + 1], 'swap', 'swap']);
                animations.push([j + 1, arr[j], 'swap', 'swap']);
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
