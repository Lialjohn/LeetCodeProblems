// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3703/

// Given an m x n integers matrix, return the length of the longest increasing path in matrix.

// From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

// ---------------------------------------------

// so by increasing path, each number in the path has to be larger than the previous, and it continues until there're no more adjacent numbers that fit that criteria.
// I can start anywhere in the matrix. I could try and begin with the lowest numbers I can find but what if there's a 1 surrounded by max ints while another more gradually increasing path sits outside? edge case but it's something I'd expect in the tests.
// so this is like a directional, non-weighted graph, so it might help to think of it like one. I can find the solution with dfs but with multiple start points it won't be very fast at all. TLE expected.
// for dfs, iterate through each cell in the matrix (unless it's already been visited) follow any valid paths with a recursive helper function. when each path reaches its end, compare to a 'longest' variable.
// if I make a another paths matrix, I can record the longest found path starting from each cell. say I recursively follow a path until reaching a highest count of 7. as I return down the call stack, I can take that number and subtract it from the current count for a 'this is the longest found path from this cell' value.
// when I follow a different path and encounter a cell that's been given a value higher than 0, I can take that value and add it to the current count instead of following down all those potential paths again, saving some time.

const longestIncreasingPath = (matrix: number[][]): number => {
    const dirs: number[][] = [[1,0], [0,1], [-1,0], [0,-1]]
    let longest = 0
    const paths: number[][] = Array(matrix.length).fill(null).map(c => Array(matrix[0].length).fill(0))
    const traverse = (a: number, b: number, count: number): number => {
        let path = count
        for (const dir of dirs) {
            const [y, x] = dir
            const i = a + y
            const j = b + x
            if (j >= 0 && i >= 0 && i < matrix.length && j < matrix[0].length && matrix[i][j] > matrix[a][b]) {
                path = Math.max(path, paths[i][j] ? count + paths[i][j] : traverse(i, j, count + 1))
            }
        }
        paths[a][b] = path - count + 1
        return path
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (paths[i][j] === 0) longest = Math.max(longest, traverse(i, j, 1))
        }
    }
    return longest
}

// phew, worked. for time I'd estimate O(n*m) as I move through each cell in the matrix 2 times (as well as making a whole other matrix). Once in the double for loop checking each cell for a value, and again with the traverse function that marks paths. There's the 4 directions which are constant, and the memoization will ensure I don't go over any path more than once.

console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])) // 4
console.log(longestIncreasingPath([[3,4,5],[3,2,6],[2,2,1]])) // 4
console.log(longestIncreasingPath([[1]]))  // 1