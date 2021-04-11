// Coding Challenge

const getPivotIndex = (numArray) => {
    // Assumes we are passed a list of at least length 1.
    // If the length IS 1, return index 0 because the sum on both sides is 0.
    if(numArray.length === 1) return 0

    // Set up objects to track the edge and total of each side.
    // Start from 0 and lastIndex and move the edges inward.
    const lastIndex = numArray.length - 1
    const left = {
        edge: 0, //last addded-index
        sum: numArray[0],
        count: 1 // how many numbers have been added to this side
    }
    const right = {
        edge: lastIndex,
        sum: numArray[lastIndex],
        count: 1
    }

    // Don't break when the sum is equal because we need to include all elements,
    // so we only break when we have counted all but 1 index, the pivot.
    while(left.count + right.count !== numArray.length - 1){
        if(left.sum <= right.sum){
            left.edge++
            left.sum += numArray[left.edge]
            left.count++
        }
        else if(left.sum > right.sum){
            right.edge--
            right.sum += numArray[right.edge]
            right.count++
        }
    }

    // left edge is the index *before* the pivot
    if(left.sum === right.sum) return left.edge + 1
    else return -1
}

// Tests:
console.log(getPivotIndex([1, 4, 6, 3, 2])) // 2
console.log(getPivotIndex([1, 1, 1, 0, 3])) // 3
console.log(getPivotIndex([1, 1, 1, 1, 1, 0, 2, 3])) // 5
console.log(getPivotIndex([1, 1, 1, 1, 1, 0, 2, 3])) // 5
console.log(getPivotIndex([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 12])) // 12
console.log(getPivotIndex([12, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,])) // 1
console.log(getPivotIndex([0, 0, 0, 3, 3])) // -1
console.log(getPivotIndex([2])) // 0