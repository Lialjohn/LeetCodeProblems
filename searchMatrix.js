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

const searchMatrix1 = (matrix, target) => {
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
// could also try binary search since these arrays are all sorted ho ho
// finding the right array first is a little trickier because we're looking for a range instead of a single value
// so first well start at the middle index and check if the element[0] is < target
// if it isn't, we'll move the pointer to the left
// if it is, we'll check the next element, too. If THAT element[0] is > target, we'll have found the correct array to search
// if it's lesser, instead, then we'll move the pointer to the right

// seperate the binary search for the 1d array because modularity yay
const binarySearch = (array, target) => {
  let start = 0
  let end = array.length - 1
  while (start <= end) {
    // since start and end change depending on the conditional below, we can calculate a new midpoint each loop easily by adding and dividing them
    let mid = Math.floor((start + end) / 2)
    if (array[mid] === target) return true
    else if (array[mid] > target) end = mid - 1
    else start = mid + 1
  }
  return false
}

const searchMatrix = (matrix, target) => {
  // edge cases!
  if (!matrix || !matrix.length) return false
  // somewhat less dry than I'd like
  let start = 0
  let end = matrix.length - 1
  while (start <= end) {
    let mid = Math.floor((start + end) / 2)
    if (matrix[mid][0] === target) return true
    else if (matrix[mid][0] > target) end = mid - 1
    else {
      if (!matrix[mid + 1] || matrix[mid + 1][0] > target) return binarySearch(matrix[mid], target)
      else start = mid + 1
    }
  }
  return false
}

// much better!

console.log(searchMatrix([[1],[3]], 3))