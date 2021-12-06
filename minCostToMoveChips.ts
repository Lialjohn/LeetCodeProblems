// https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/

// We have n chips, where the position of the ith chip is position[i].

// We need to move all the chips to the same position. In one step, we can change the position of the ith chip from position[i] to:

// position[i] + 2 or position[i] - 2 with cost = 0.
// position[i] + 1 or position[i] - 1 with cost = 1.
// Return the minimum cost needed to move all the chips to the same position.

// -------------------------------------------------------------------

// so +-2 is free while +-1 costs 1
// position is not determined by i, it's position[i]
// any even destination position is free for any other even number, and any odd destination is free for any odd position, because skipping a space is free. the opposite has a free ride up until they're exactly one space away.
// so the total cost can be calculated as Math.min(odds, evens)
// will have to run through each number checking if it's even or odd, will have to be O(n)

const minCostToMoveChips = (position: number[]): number => {
    let evens = 0
    let odds = 0
    for (let n of position) n % 2 === 0 ? evens++ : odds++
    return Math.min(odds, evens)
}

// gg ez

console.log(minCostToMoveChips([1,2,3])) // 1
console.log(minCostToMoveChips([2,2,2,3,3])) // 2
console.log(minCostToMoveChips([1,1000000000])) // 1