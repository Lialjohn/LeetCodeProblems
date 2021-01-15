// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/580/week-2-january-8th-january-14th/3603/

// You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.

// Return the minimum number of operations to reduce x to exactly 0 if it's possible, otherwise, return -1.

// //--------------------------------

// This seems like a prefix sum kind of problem
// I could go through the array from left to right checking prefix sums, and also do it from right to left, and compare those sums. This sounds clunky. I know there's a way to use prefix sums here somehow though.
// the sum of x exists somewhere on the ends of the array, the rest of the array is the remainder, or the sum of every element - x. The answer to the problem is the fewest number of operations, but it could also be helpful to find the highest number of operations that equal all elements - x in the middle, especially since this subarray would be whole and not possibly broken up into two pieces.
// from there I can do a 2Sum. I'm doing a lot of nSum lately huh.

const minOperations = (nums, x) => {
    let target = -x
    for (let n of nums) target += n
    if (target === 0) return nums.length
    // have to put in 0 preemptively because summing to zero means I've found a match, but it needs to exist in memo to be counted as a result. In this case, result will be whatever the current index is + 1.
    let memo = { 0: -1 }
    let sum = 0
    let result = null
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        if ((sum - target) in memo) {
            if (result !== null) result = Math.max(result, i - memo[sum - target])
            else result = i - memo[sum - target]
        }
        memo[sum] = i
    }
    return result === null ? -1 : nums.length - result
}

console.log(minOperations([1,1,4,2,3], 5)) // 2
console.log(minOperations([5,6,7,8,9], 4)) // -1
console.log(minOperations([3,2,20,1,1,3], 10)) // 5
console.log(minOperations([1,3,6,2,9,1,4,5,8,1,3,8,1,3,9], 30)) // 6