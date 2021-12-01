// https://leetcode.com/problems/house-robber/

// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

// -----------------------------------------------------

// you could rob every other house, but that leaves at least two options-- and while one set could be overall more lucrative, there may be points where skipping 2 or more houses for higher value targets is optimal.
// in other words starting from 0, for every number nums[i] added to a sum, nums[i + 1] must be skipped, but I can also skip more than one index if it creates a better sum.
// because one or the other is off limits, I'm considering 2 'paths' with each choice. the current nums[i] or nums[i + 1]. the numbers after the choice all matter, but in a single iteration it's not possible to see all combinations at once.
// max length for nums is not particularly long (100), so a search of all combinations is an option
// could I do the sums as I iterate through the array? add nums[i] with nums[i + 2] and nums[i + 3]. any further wouldn't be necessary because if there are higher numbers ahead, they'll be reachable by at least one of the two results. take this example:
// [3, 10, 2, 2, 2, 10, 30]
//  3 compares against 2 and 2, the answer is 5 either way. now nums[2] and nums[3] = 5
// 10's turn to be nums[i]. nums[i] checks nums[i + 2] against (nums[i + 2](5) - nums[i - 1](3)) + 10. nums[i + 3] + 10 becomes nums[i + 3]. and so on, until either nums[nums.length - 1] or nums[nums.length - 2] comes out as the highest sum
// checking so far ahead of the current index doesn't seem ideal for simplicity, but this way I'll get through in O(n) time

const rob = (nums: number[]): number => {
    if (nums.length === 1) return nums[0]
    let res = [...nums]
    let n = res.length - 1
    for (let i = 0; i + 2 <= n; i++) { // final sums are for the last two numbers, so it can end 2 indices early
        // res[i + 3] will be nums[i] + nums[i + 3] unless it's out of bounds, in which case skip the operation
        if (res[i + 3] !== undefined) res[i + 3] += res[i]
        // res[i + 2] will equal whatever's higher: res[i] + (res[i + 2] - res[i - 1]), or res[i + 2]
        res[i + 2] = Math.max(res[i + 2], res[i] + (res[i + 2] - (res[i - 1] ?? 0)))
    }
    return Math.max(res[n], res[n - 1])
}

// here's a less confusing one that just uses two variable to keep track of the two different sums to compare.

const robOpt = (nums:number[]): number => {
    let prev1 = 0
    let prev2 = 0
    for (let i = 0; i < nums.length; i++) {
       let temp = prev1
       prev1 = Math.max(prev2 + nums[i], prev1)
       prev2 = temp
    }
    return prev1
}

console.log(rob([1,2,3,1])) // 4
console.log(rob([2,7,9,3,1])) // 12
console.log(rob([3, 10, 2, 2, 10])) // 20
console.log(rob([3, 10, 2, 2, 2, 10, 30])) // 42
console.log(rob([3])) // 3
console.log(rob([3, 4])) // 4