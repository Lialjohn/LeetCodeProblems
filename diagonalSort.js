// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3614/

// A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].

// Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.

//---------------------------------------------------

// looks like the numbers only have to be sorted within their respective bounds-- I don't have to pull smaller numbers on the right over to the left or anything like that
// I don't have to worry about the bottom left and top right cells then, they'll always be sorted because they just have the one cell. I'll start at row n - 2 and end at col m - 2.
// well... drawing a grid out, there's a pattern to where the smallest to largest numbers go. The furthest left and top get the smallest numbers. The problem is making sure the groups diagonal elements stay in their lane so to speak.
// the most straightforward way to do this in my mind is to loop through each starting set and then iterating through those elements, picking them up and sorting them as I go. Once I reach the end, I move back through the set replacing elements with the correctly sorted ones. I think that'd be pretty pricey in terms of time though. Just need to start with something that works though, might be able to improve on it.
// the position of an element within its set could be row or column, whichever is smaller. 
// a heap will sort the numbers as I pick them up
// although I can't just put all numbers in the head. I can single out diagonal sets by row - col. 0 - 0 gives me an element from one set, 1 - 1 will be the next number in that set, then 2 - 2 the third and so on. 
// so set the results for row - col in a map and give each one their own heap. add elements to their respective heaps as I loop through the matrix.
// then add them all back in a separate set of loops.
// oof

class MinHeap {
    constructor() {
        this.values = []
    }
    insert(v) {
        this.values.push(v)
        this.bubble()
        return this
    }
    bubble() {
        const vals = this.values
        let child = vals.length - 1
        let parent = Math.floor((child - 1)/2)
        while (vals[child] < vals[parent]) {
            ;[vals[child], vals[parent]] = [vals[parent], vals[child]]
            child = parent
            parent = Math.floor((child - 1)/2)
        }
    }
    remove() {
        const vals = this.values
        ;[vals[0], vals[vals.length-1]] = [vals[vals.length-1], vals[0]]
        const popped = vals.pop() 
        this.sink()
        return popped
    }
    sink() {
        const vals = this.values
        let parent = 0
        let child = 1
        while (vals[child] < vals[parent] || vals[child + 1] < vals[parent]) {
            if (vals[child + 1] < vals[child]) child++
            ;[vals[child], vals[parent]] = [vals[parent], vals[child]]
            parent = child
            child = (parent * 2) + 1
        }
    }
}

const diagonalSort1 = matrix => {
    const heaps = new Map()
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const ind = row - col
            // if the heap doesn't exist for this set yet, make it
            if (heaps.get(ind) === undefined) heaps.set(ind, new MinHeap)
            // then add the current element to a heap
            heaps.get(ind).insert(matrix[row][col])
        }
    }
    // then replace all elements in the matrix with the correctly sorted ones by removing elements from their heaps.
    // could also avoid mutation by making a new matrix and populating + returning it instead
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const ind = row - col
            matrix[row][col] = heaps.get(ind).remove()
        }
    }
    return matrix
}

// so I'm going through each element which is n * m. Each element gets sorted into the heap which is logn time. O(nmlogn) time, I think. For space there's the map which has n + m entries and then there are the heaps which will have 1 to n entries. O((n+m) * n) just about. O(n**2) maybe, because heaps will have n - row or n - col elements.
// If I sorted the numbers after collecting all of each diagonal set, would I be able to improve time? Maybe I jumped to heaps too quickly. I do love my heaps.

const diagonalSort = matrix => {
    const diagonals = new Map()
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const ind = row - col
            if (diagonals.get(ind) === undefined) diagonals.set(ind, [])
            diagonals.get(ind).push(matrix[row][col])
        }
    }
    for (const key of diagonals.keys()) {
        diagonals.get(key).sort((a, b) => a - b)
    }
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const ind = row - col
            const pos = Math.min(row, col)
            matrix[row][col] = diagonals.get(ind)[pos]
        }
    }
    return matrix
}

// so here instead of doing logn inserts and removals m*n times, I do nlogn sorts n+m times. test case time on leet is significantly better, woo.

console.log(diagonalSort([[3,3,1,1], [2,2,1,2], [1,1,1,2]])) 
// [[1,1,1,1], [1,2,2,2], [1,2,3,3]]