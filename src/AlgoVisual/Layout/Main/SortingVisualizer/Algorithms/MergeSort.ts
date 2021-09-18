export function getMergeSortAnimations(array: number[]) {
    let animations: [number, number, boolean][] = [];
    const auxiliaryArray = array.slice();
    mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSort(mainArray: number[], startIdx: number, endIdx: number, auxiliaryArray: number[], animations: [number, number, boolean][]) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray: number[], startIdx: number, middleIdx: number, endIdx: number, auxiliaryArray: number[], animations: [number, number, boolean][]) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j, true]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j, true]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i], false]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j], false]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i, true]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i, true]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i], false]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j, true]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j, true]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j], false]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}