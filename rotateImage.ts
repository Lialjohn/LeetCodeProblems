// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/596/week-4-april-22nd-april-28th/3720/

// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

// --------------------------------------------

// rotating clockwise means that each top row (row[i] < ~~(n - 1)/2) will become a column on the right, each right column will become a row[i] > ~~(n - 1)/2, each bottom row will move to the left, left to top.
// I can try grabbing the numbers from each set of rotating numbers, the ones comprising a square, starting from the bottom left, recording them, then going around a second time starting from top-left to overwrite the old numbers. move inward and repeat. 

class Queue {
    list: object
    head: number
    tail: number
    constructor() {
        this.list = {}
        this.head = 0
        this.tail = 0
    }
    push(v) {
        this.list[this.tail++] = v
    }
    shift() {
        if (this.head === this.tail) return undefined
        else {
            const shifted = this.list[this.head]
            delete this.list[this.head++]
            return shifted
        }
    }
}

const rotateM = (matrix: number[][]): void => {
    const n = matrix.length - 1
    const queue = new Queue
    for (let i = 0; i <= Math.floor(n / 2); i++) {
        // collect row[i], row[n - i], col[i], col[n - i]
        for (let j = i; j <= n - i; j++) queue.push(matrix[i][j])
        for (let j = i + 1; j <= n - i; j++) queue.push(matrix[j][n - i])
        for (let j = n - i - 1; j >= i; j--) queue.push(matrix[n - i][j])
        for (let j = n - i - 1; j > i; j--) queue.push(matrix[j][i])

        for (let j = i; j <= n - i; j++) matrix[j][n - i] = queue.shift()
        for (let j = n - i - 1; j >= i; j--) matrix[n - i][j] = queue.shift()
        for (let j = n - i - 1; j > i; j--) matrix[j][i] = queue.shift()
        for (let j = i; j < n - i; j++) matrix[i][j] = queue.shift()
    }
    console.log(matrix)
}

// overall this seems clunky. What if I use two pointers to swap numbers as I go around? 
// O(n) time and I think space is technically O(n) because I'm making new pointers for each row? granted in this particular problem that won't ever go higher than 2.

const rotate = (matrix: number[][]): void => {
    const n = matrix.length - 1
    for (let i = 0; i <= Math.floor(n / 2); i++) {
        // swap the numbers starting from j to n - i. first j = i, then 3 swaps happen. matrix[i][j] will swap with matrix[i + new counter][n - i], then matrix[n - i][n - j], then finally matrix[n - j][i]
        for (let j = i, c = 0; j <= n - i - 1; j++, c++) {
            ;[matrix[i][j], matrix[i + c][n - i]] = [matrix[i + c][n - i], matrix[i][j]]
            ;[matrix[i][j], matrix[n - i][n - j]] = [matrix[n - i][n - j], matrix[i][j]]
            ;[matrix[i][j], matrix[n - j][i]] = [matrix[n - j][i], matrix[i][j]]
        }
    }
    console.log(matrix)
}

console.log(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
console.log(rotate([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
console.log(rotate([[1,2],[3,4]])) // [[3,1],[4,2]]
console.log(rotate([[1]])) // [[1]]
console.log(rotate([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]])) // [[21,16,11,6,1],[22,17,12,*7*,2],[23,18,13,*8*,3],[24,19,*14*,9,4],[25,20,15,10,5]]