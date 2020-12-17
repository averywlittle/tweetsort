
const mergeSort = (unsortedArray, mergeParams) => {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2)

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle)
    const right = unsortedArray.slice(middle)

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left, mergeParams), mergeSort(right, mergeParams), mergeParams
    )
}

const merge = (left, right, mergeParams) => {
    let resultArray = [], leftIndex = 0, rightIndex = 0

    // Concatenate values to result array in order
    while (leftIndex < left.length && rightIndex < right.length) {

        let comparison = mergeParams.comparator(left[leftIndex], right[rightIndex])

        // Already returned in descending order, so just flip if ascending was sent
        if (mergeParams.order === "asc") {
            comparison = !comparison
        }

        if (comparison) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
          }
    }

    // Capture possible leftover elements
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex))
}

exports.sortTweets = mergeSort