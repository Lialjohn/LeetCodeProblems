// https://leetcode.com/problems/dungeon-game/

// The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

// The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

// Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

// In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

// Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

//------------------------------

// this seems like a fun dp problem
// so if I find every path to calculate HP needs, what would I be looking for. perhaps keep a lowest gained total per path? Not necessarily including every number, just the negative sums that comes as close to 0 as possible. 
// I'd only need to consider sums <= 0. The HP necessary to survive a given path would be abs(lowest sum <= 0) + 1
// if there's a path where the total never goes <= 0, the answer is 1, as that's as close to dead as K can get on that path.
// if I'm keeping variables for each path, I can do this with a recursive function that keeps track of the lowest sum and current sum
// let's say I keep track of the answer variable outside a recursive helper function. I'm going through these individual paths looking for the lowest possible sum to get to n-1/m-1. I'd also need to compare the damage for all paths against each other, to find the highest of all of them. I can return the damage on each path by Math.min()'ing the two different paths I can take on each call

const calculateMinimumHPdfs = dungeon => {
    const travel = (row, col, currHP, damage) => {
        // check if in bounds. Infinity will ensure it never wins the Math.min battle
        if (row >= dungeon.length || col >= dungeon[0].length) return Infinity
        // calculate currHP and damage
        currHP += dungeon[row][col]
        damage = Math.min(damage, currHP)
        // if we're on the final tile, return the worst damage for the 
        if (row === dungeon.length - 1 && col === dungeon[0].length - 1) return damage
        else return Math.min(
            Math.abs(travel(row + 1, col, currHP, damage)),
            Math.abs(travel(row, col + 1, currHP, damage))
        )
    }
    return Math.abs(travel(0, 0, 0, 0)) + 1
}

// the above does work generally but it got timed out D:
// time to increase efficiency >:O
// first I have to ask: do I need to go through a whole set of calls for every path?
// maybe I could make a whole dp matrix and fill in minimum HPs as I go along. iteratively. I could avoid re-traveling different cells this way and just hit every cell the one time.
// ok I needed help for this. direction matters. Tried to go from (0,0) to (n,m) and it was a mess. Only by starting from the end and working backwards can I get the sums to work because I can go back to the base start of 1 when K has been completely healed, and that means any damage K picks up towards P doesn't matter. Going forward means I would need to keep track of multiple variables.


const calculateMinimumHP = dungeon => {
    const n = dungeon.length
    const m = dungeon[0].length 
    const dp = Array.from({length: n}, () => Array(m))
    for (let row = n - 1; row >= 0; row--) {
        for (let col = m - 1; col >= 0; col--) {
            // record the minimum health needed to get to this spot
            // to start with, the first cell where I won't be subtracting from other cells
            if (row === n - 1 && col === m - 1) {
                dp[row][col] = Math.max(1, 1 - dungeon[row][col])
            } else if (row === n - 1) { // if at the bottom of the grid (to avoid undefined cells)
                dp[row][col] = Math.max(1, dp[row][col + 1] - dungeon[row][col])
            } else if (col === m - 1) { // if at the rightmost side
                dp[row][col] = Math.max(1, dp[row + 1][col] - dungeon[row][col])
            } else { // every other cell
                dp[row][col] = Math.max(1, Math.min(dp[row + 1][col], dp[row][col + 1]) - dungeon[row][col])
            }
        }
    }
    return dp[0][0]
}

console.log(calculateMinimumHP([[-2,-3,3], [-5,-10,1], [10,30,-5]])) // 7
console.log(calculateMinimumHP([[2,3,3], [-5,-10,1], [10,30,-5]])) // 1
console.log(calculateMinimumHP([[2,-40,-50], [3,-100,-10], [-1,-3,-5]])) // 5
console.log(calculateMinimumHP([[-3]])) // 4