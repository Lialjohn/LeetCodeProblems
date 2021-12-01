// https://leetcode.com/problems/maximal-rectangle/

// Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

// -----------------------------------

// can have 4 points representing corners, do a search for all areas where the top right corner is 1.
// all start at matrix[0][0]. the upRight and downRight pointers moves right, checking the space between them for 0s. if a zero is found, backtrack.
// record number of consecutive 1s in each row along with their indices left and right
// perform a dfs, checking each set of each row against each other. # of overlap * depth of search will get an area. data structure to hold these sets will be an array, with each index indicating a row. withing each index will be a 2d matrix where each set of coordinates will be compared against each set of coordinates in the next row. overlap and depth can be recorded recursively. 
// aight I needed help for this one so I found an answer in discussion and worked through it to understand it

const maximalRectangle = (matrix: string[][]): number => {
    let row = matrix.length
    if (!row) return 0
    let col = matrix[0].length
    let maxArea = 0
    const heights = Array(col).fill(0)
    const left = Array(col).fill(0)
    const right = Array(col).fill(col - 1)
    
    // left = leftmost boundaries of rectangles. right = rightmost boundaries 
    // the left side will be filled, if the index is '1', the height 1s it can reach (all 1s in curr col), otherwise 0. on the right side, it'll be n - current height or just n if no '1' is present.
    for (let i = 0; i < row; i++) {
        let r = col - 1
        for (let j = col - 1; j >= 0; j--) {
            console.log('right: ', right, i)
            if (matrix[i][j] === '1') {
                // right[j] will either take on the same index as the row above it (right[j]) or the current index, whichever is smaller
                // takes previous index to possibly identify other 1s and take on their boundary. current index to identify new boundary.
                right[j] = Math.min(right[j], r)
            } else {
                right[j] = col - 1
                // r changes for the next iteration to potentially use
                r = j - 1
            }
        }
        // onto left side. will also record current heights.
        let l = 0
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] === "1") {
                // left[j] identifies left boundary of a rectangle, it will either be the current index i (l) or whatever index the last row[j] was marked as (or 0 if we're in row 0)
                left[j] = Math.max(left[j], l)
                // count heights for this index j
                heights[j]++
                // check for max area on every iteration through this set of (i, j), since we now have all relevant information left, right, and height
                maxArea = Math.max(maxArea, heights[j] * (right[j] - left[j] + 1))
            } else {
                // reset height, set left[j] to 0, and update next potential edge index
                heights[j] = 0
                left[j] = 0
                l = j + 1
            }
        }
    }
    return maxArea
}

console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 6
console.log(maximalRectangle([["0","0"]])) // 0