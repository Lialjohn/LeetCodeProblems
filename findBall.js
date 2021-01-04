// https://leetcode.com/problems/where-will-the-ball-fall/

// You have a 2-D grid of size m x n representing a box, and you have n balls. The box is open on the top and bottom sides.

// Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to the right or to the left.

// A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is represented in the grid as 1.
// A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented in the grid as -1.
// We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either wall of the box.

// Return an array answer of size n where answer[i] is the column that the ball falls out of at the bottom after dropping the ball from the ith column at the top, or -1 if the ball gets stuck in the box.
//--------------------------------------------------------

// the array returned should be grid[i].length/the width of the 'box', and each element needs to be the column # that index's path ends at.
// 1 directs right, -1 directs left. if a path hits 2 of the same value in a row, it also gets moved downwards. Never upwards.
// going out of bounds in n[i] would indicate an unsuccessful path. going out of bounds in m indicates a successful path.
// say I do this simply with 2 loops, the outer loop sets variables for the current ball, 1 set for each col, and the inner is a while loop that directs the ball on it's path.
// I can change the indices col++ & row++ OR col-- & row++. The row always increases because the ball will always have to move down every time it moves left or right, as long as it doesn't get stuck or out of bounds
// fail conditions: if y goes out of bounds, if the value changes from 1 to -1 when the 'prev' var is -1

const findBallI = grid => {
    const results = []
    for (let i = 0; i < grid[0].length; i++) {
        let row = 0 
        let col = i
        let prev = grid[row][col]
        let dir = 'down' // drop the ball :)
        while (row < grid.length) {
            // fail conditions
            // if col goes out of bounds, if the current val is less 
            if (!grid[row][col] || (grid[row][col] !== prev && dir !== 'down')) {
                results.push(-1)
                break
            }
            if (grid[row][col] === prev && dir !== 'down') dir = 'down'
            else if (grid[row][col] === -1) dir = 'left'
            else dir = 'right'
            // set prev now that we know where we're going
            prev = grid[row][col]
            // update coords
            if (dir === 'down') row++
            else if (dir ==='left') col--
            else col++
        }
        if (row === grid.length) results.push(col)
    }
    return results
}

const findBall = grid => {
    const results = []
    for (let i = 0; i < grid[0].length; i++) {
        let row = 0
        let col = i
        let prev = null
        while (row < grid.length) {
            if (grid[row][col] === 1 && col + 1 < grid[0].length && grid[row][col + 1] === 1) col++
            else if (grid[row][col] === -1 && col - 1 >= 0 && grid[row][col - 1] === -1) col--
            else {
                results.push(-1)
                break
            }
            row++
        }
        if (row === grid.length) results.push(col)
    }
    return results
}

// this seems like a really simple solution but it's faster than 80% of all javascript submissions, huh.
// maybe they don't have many js submissions :O
// time is about O(n*m), space O(m)

// recursive version is about the same time!
const findBallR = grid => {
    const results = Array(grid[0].length)
    const roll = (row, col) => {
        if (row === grid.length) return col
        if (col < 0 || col >= grid[0].length) return -1
        if (grid[row][col] === 1 && col + 1 < grid[0].length && grid[row][col + 1] === 1)
            return roll(row + 1, col + 1)
        else if (grid[row][col] === -1 && col - 1 >= 0 && grid[row][col - 1] === -1)
            return roll(row + 1, col - 1)
        return -1
    }
    for (let i = 0; i < results.length; i++) result[i] = roll(0, i)
    return results
}

console.log(findBall([[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]])) // [1,-1,-1,-1,-1]
console.log(findBall([[-1]])) // [-1]
console.log(findBall([[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]])) // [0,1,2,3,4,-1]