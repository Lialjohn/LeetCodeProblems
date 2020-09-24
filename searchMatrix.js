// https://leetcode.com/problems/search-a-2d-matrix/

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

//     Integers in each row are sorted from left to right.
//     The first integer of each row is greater than the last integer of the previous row.

// Example 1:

// Input:
const matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
// target = 3
// Output: true

// we want to search through the rows (matrix elements) and columns (matrix element indices) to find our target element
// the elements being in sorted order from the start is very helpful woo
// the elements at the beginning and end of the array are the most important ones for finding the relevant array to search
// we'll need one where arr[0] < target and arr[arr.length-1] > target
// we can use pointers to keep track of those and move through the matrix

const searchMatrix = (matrix, target) => {
  //almost forgot this edge case oof
  if (!matrix || !matrix.length) return false
  //pointers!
  let row = 0
  //the problem doesn't state whether all the arrays are of equal length but I'll start with this
  let col = matrix[0].length - 1
  while (row < matrix.length && col >= 0) {
    console.log(row, col)
    if (matrix[row][col] === target) return true
    // if first is greater than target or the last is lesser than target, move on
    else if (matrix[row][0] > target || matrix[row][matrix[row].length - 1] < target) row++
    // if the final element in the current row is greater than target, begin to search the array
    else if (matrix[row][col] !== target) col--
  }
  //if the loop ends, can only be false
  return false
}


// works, but not super efficient at O(n + m)
// could also try binary search since these arrays are all sorted

console.log(searchMatrix(matrix, 55))