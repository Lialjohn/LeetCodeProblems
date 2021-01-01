// https://leetcode.com/problems/cherry-pickup/

// You are given an n x n grid representing a field of cherries, each cell is one of three possible integers.

// 0 means the cell is empty, so you can pass through,
// 1 means the cell contains a cherry that you can pick up and pass through, or
// -1 means the cell contains a thorn that blocks your way.
// Return the maximum number of cherries you can collect by following the rules below:

// Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right or down through valid path cells (cells with value 0 or 1).
// After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
// When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
// If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.
// -----------------------------------------------

// my understanding is you can pick up cherries:
// - on the way to n-1,n-1, for which you can only move right and down or row++ and col++
// - on the way back to 0,0 from n-1,n-1, moving only up and left or row-- and col--
// - if n-1,n-1 can't be reached on the first trip, return 0

// I want to hit as many 1s as I can on each trip
// any path that the first trip can make, the second trip can also make, just technically in reverse. If that's the case, I could just find the two best paths via incrementing rather than write a whole other set of conditionals for the other direction. Just have to be careful not to count 1s twice.
// how can I check all paths while only marking the cherries in the correct paths with 0s? do I actually need to change it? the problem description implies yes but that might only be there to indicate that there's only one cherry pickup per cell. perhaps it would be better to find the maximum amount of cherries in two separate paths and not worry about changing any of the cells in the grid for the second path.
// I'll be combining the values at two separate points on the grid for every iteration. Once I reach (n-1,n-1) I can compare results for all paths and return the largest. Yeah this will definitely need a recursive approach.
// doing two paths at one time means I'll have to keep track of four indices, two each. I can do a recursive call for each set of directions they might take, down-right, down-down, right-down, right-right. When an invalid cell is reached, either out of bounds or a -1, I'll return the path
// As I'm checking all paths, having an extra grid for tracking visited cells would be appropriate.

// problem: As long as one of the paths hits the final cell, I'm getting the two most cherry-licious paths regardless of whether or not they are paths that reach the end of the road or not. I need some way to differentiate invalid paths from valid paths.
// I start the sum of each path from the ends of them first, so I can do it by passing negative numbers down and checking for them. If the result of all four options is -1, then it means there's no valid path available. I can skip over 'collecting' the cherry/1 from that cell and pass -1 back up instead.

const cherryPickup = grid => {
    const n = grid.length // I think I'm gonna have to write grid.length a lot otherwise
    const memo = Array.from({length: n}, () => Array.from({length: n}, () => Array.from({length: n}, () => null)))
    // need to examine cells at two paths. technically I could call it one path, I'm just examining two different cells on each iteration.
    const travel = (row1, col1, row2, col2) => {
        // check if either set is out of bounds, either by leaving the grid params or encountering a -1/wall
        if (row1 >= n || col1 >= n || row2 >= n || col2 >= n ||
        grid[row1][col1] === -1 || grid[row2][col2] === -1) {
            return -1
        }
        // if we hit the end, we'll end up with no valid paths and will return a -1, so it gets its own return line woo
        if ((row1 === n-1 && col1 === n-1) || (row2 === n-1 && col2 === n-1)) return grid[n-1][n-1]
        if (memo[row1][col1][row2] !== null) return memo[row1][col1][row2]
        // they can potentially land on cherries at the same time, so make sure cherries aren't counting twice
        let basket = grid[row1][col1] //add value at first set
        // and then if the current coords aren't identical, add the second
        if (row1 !== row2 || col1 !== col2) basket += grid[row2][col2]
        let check = Math.max(
            travel(row1+1, col1, row2+1, col2), // down down
            travel(row1, col1+1, row2, col2+1), // right right
            travel(row1+1, col1, row2, col2+1), // down right
            travel(row1, col1+1, row2+1, col2)  // right down
        )
        // check will only be -1 if all paths from here are -1, meaning no paths. return a -1 instead of whatever number basket is so that this fact is passed down the call stack
        if (check === -1) {
            memo[row1][col1][row2] = -1
            return -1
        }
        // if all is well, add check to this cell's value (0 or 1) to be passed back down for a final sum
        basket += check
        memo[row1][col1][row2] = basket
        return basket
    }
    const cherries = travel(0,0,0,0)
    return cherries > 0 ? cherries : 0
}  

console.log(cherryPickup([[0,0,0,0,0], [1,-1,1,-1,1], [1,-1,1,-1,1],[1,-1,-1,-1,1],[1,1,-1,-1,0]])) // 3
console.log(cherryPickup([[0,1,-1], [1,0,-1], [1,1,1]])) // 5
console.log(cherryPickup([[1,1,-1], [1,-1,1], [-1,1,1]])) // 0
console.log(cherryPickup([[1,-1,-1,-1,-1], [1,0,1,-1,-1], [0,-1,1,0,1], [1,0,1,1,0], [-1,-1,-1,1,1]])) // 10 
console.log(cherryPickup([[1,-1,1,1,1,1,1,1,-1,1],[1,1,1,1,-1,-1,1,1,1,1],[-1,1,1,-1,1,1,1,1,1,1],[1,1,-1,1,-1,1,1,1,1,1],[-1,1,1,1,1,1,1,1,1,1],[-1,-1,1,1,1,-1,1,1,-1,1],[1,1,1,1,1,1,1,-1,1,1],[1,1,1,1,-1,1,-1,-1,1,1],[1,-1,1,-1,-1,1,1,-1,1,-1],[-1,1,-1,1,-1,1,1,1,1,1]])) // 23

// oof this one was tough. Must do more dp questions.