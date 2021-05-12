// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/599/week-2-may-8th-may-14th/3740/

// Given a 2D matrix matrix, handle multiple queries of the following type:

// Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
// Implement the NumMatrix class:

// NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
// int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

// ----------------------------------------------------------

// could save some time with multiple calls to sumregion if I make a new matrix, use prefix sums to come up with every possible sum starting from the top left corner, and then grab numbers from there. 
// get sum in bottom right cell specified, then subtract number from row2, col1 - 1, as well as (row1 - 1, col2) - (col1 - 1, row1 - 1). if those coords are out of bounds, don't have to subtract anything.
// this way the time will be O(n*m) on instantiation, but any calls to the method sumRegion will be O(1)
// let's try eet

class NumMatrix {
    private matrix: number[][]
    constructor(matrix: number[][]) {
        this.matrix = matrix
        this.sum()
        console.log(this.matrix)
    }
    private sum() {
        // record the row prefix sums first
        for (let e of this.matrix) {
            for (let i = 1; i < e.length; i++) {
                e[i] += e[i - 1]
            }
        }
        for (let j = 0; j < this.matrix[0].length; j++) {
            for (let i = 1; i < this.matrix.length; i++) {
                this.matrix[i][j] += this.matrix[i - 1][j]
            }
        }
    }
    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        return this.matrix[row2][col2] - (this.matrix[row2][col1 - 1] || 0) - ((this.matrix[row1-1] && this.matrix[row1-1][col2] || 0) - (this.matrix[row1-1] && this.matrix[row1 - 1][col1 - 1] || 0))
        // a bit of a convoluted line D:
    }
}

const m = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]])

console.log(m.sumRegion(2,1,4,3)) // 8
console.log(m.sumRegion(1,1,2,2)) // 11
console.log(m.sumRegion(1,2,2,4)) // 12