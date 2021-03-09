// https://leetcode.com/problems/trapping-rain-water/

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// ------------------------------

// march challenges are too easy so far, need extra challenge.
// how would I change this problem into a smaller one.
// by height. starting from height 0, how many units of water can there be? 0, because it's height 0 oi
// at height 1, how many calls are land, how many are units in between land that can be filled with water? at height 2? at height 3? continue summing until height has 1 or 0 land cells.
// run through the array. find the first positive number on either side of the array.
// decrement and move to the next element. every time a zero is found, add 1 to a count.
// once the pointers meet, start over and do it all again.
// continue until the pointer meet without starting the subtraction/counting process.

const trapHeightCount = (heights: number[]): number => {
    let p1 = 0
    let p2 = heights.length - 1
    let count = 0
    while (p1 < p2) {
        // look for positive number
        while (heights[p1] === 0) p1++
        while (heights[p2] === 0) p2--
        // when I have two (different) positive numbers in the array, increment count for each zero between them, and decrement every positive/land number.
        let left = p1
        let right = p2
        while (left <= right) {
            if (heights[left]) {
                heights[left]--
            } else if (heights[left] === 0) count++
            left++
        }
    }
    return count
}

// This works, but it's absolutely not the fastest way to solve the problem. time would be O(n * h). Plus it mutates the original array, which isn't ideal. I know there's a way to do this in O(n) time
// A more efficient solution would look at height differences. What do I need to know?
// let's say I begin at the start of the heights array. the first thing I'd need to look for is a number that's smaller than one I've already encountered. I'd need the difference between that number and the smaller of two greater numbers it's in between. I need to have those 2 numbers available.
// I'd definitely have to do at least 2 passes through heights to get those numbers for all possible buckets.
// if I go through the array and record the highest number available at the time at that point in the array (it'd have to be an array of highest numbers) and then do the same in the opposite direction, I could subtract the original height from the highest available height at the time. add those differences together, get the final sum!

const trap = (heights: number[]): number => {
    if (!heights.length) return 0
    let max = heights[0]
    const highest: number[] = [max]
    // go through the array from 1 - n, if heights[i] is smaller than the previous (i-1) value, highest[i]
    for (let i = 1; i < heights.length; i++) {
       if (heights[i] > max) max = heights[i]
        highest.push(max)
    }
    max = heights[heights.length - 1]
    // in the opposite direction, do exactly the same with max, but highest[i] will equal whichever is smallest: highest[i] or max. 
    for (let i = heights.length - 1; i >= 0; i--) {
        if (heights[i] > max) max = heights[i]
        highest[i] = Math.min(highest[i], max)
    }
    // then sum the differences between heights and highest together
    const res = highest.reduce((a, v, i) => a + (v - heights[i]), 0)
    return res
}

// much better, and this time beats the other approach by about 10x. O(n) time and space, not bad.

console.log(trap([3,1,0,1,2])) // 4
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])) // 6
console.log(trap([4,2,0,3,2,5])) // 9