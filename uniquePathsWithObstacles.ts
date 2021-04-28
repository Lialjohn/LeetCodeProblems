// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/596/week-4-april-22nd-april-28th/3723/

// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

// Now consider if some obstacles are added to the grids. How many unique paths would there be?

// An obstacle and space is marked as 1 and 0 respectively in the grid.

// --------------------------------------------------------------------

// this seems like a pretty straightforward dfs problem
// use dfs to search unique routes. every time a path reaches the end cell, add 1 to a count. start at coords [0, 0] check if either path is valid. if n return 0, if y recursively search. return 1 on a successful path.

const uniquePathsWithObstaclesDFS = (grid: number[][]): number => {
    const travel = (i: number, j: number): number => {
        if (i === grid.length || j === grid[0].length || grid[i][j] !== 0) return 0
        else if (i === grid.length - 1 && j === grid[0].length - 1) return 1
        else return travel(i, j + 1) + travel(i + 1, j)
    }
    return travel(0,0)
}

// though this gives me TLE. dfs always TLEs, d'oh
// alright then I can turn it into a dp solution with O(nm) time and space.

const uniquePathsWithObstacles = (grid: number[][]): number => {
    if (grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) return 0
    const dp = Array(grid.length).fill(0).map(_ => Array(grid[0].length).fill(0))
    dp[0][0] = 1
    for (let i = 1; i < grid.length; i++)  dp[i][0] = grid[i][0] === 0 ? dp[i - 1][0] : 0
    for (let j = 1; j < grid[0].length; j++) dp[0][j] = grid[0][j] === 0 ? dp[0][j - 1] : 0
    for (let i = 1; i < grid.length; i++) {
        for (let j = 1; j < grid[0].length; j++) {
            if (grid[i][j] === 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[grid.length - 1][grid[0].length - 1]
}

console.log(uniquePathsWithObstacles([[0,0,0],[0,0,0],[0,0,0]])) // 6
console.log(uniquePathsWithObstacles([[0,1,0,0],[0,0,0,0],[0,0,0,0]])) // 4
console.log(uniquePathsWithObstacles([[0,1],[0,0]])) // 1