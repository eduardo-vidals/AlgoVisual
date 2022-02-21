export function getInsertionSortAnimations(arr: number[]): [[number, number, string, string][], number[]] {
    let animations: [number, number, string, string][] = [];
    arr = arr.slice()
    insertionSort(arr, animations);
    return [animations, arr];
}

function insertionSort(arr: number[], animations: [number, number, string, string][]) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            animations.push([j + 1, j, 'color', 'insert']);
            animations.push([j + 1, j, 'color', 'revert']);
            animations.push([j + 1, arr[j], 'swap', 'swap']);
            arr[j + 1] = arr[j];
            j--;
        }
        animations.push([j + 1, i, 'color', 'insert']);
        animations.push([j + 1, i, 'color', 'revert']);
        animations.push([j + 1, key, 'swap', 'swap']);
        arr[j + 1] = key;
    }
}
