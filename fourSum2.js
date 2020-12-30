// https://leetcode.com/problems/4sum-ii/

// Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.

// To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.
// -------------------------------------------

// this problem is different from the first fourSum in that the four elements being summed have to come from one each of the given arrays, can't just combine and sort and so on.
// I suppose I could combine them into a 2d array, and iterate through them one subArray at a time.
// let's say I did do that, looping through each array. the first element in the first array would start a sum, and then the each element of each subsequent array would be experimentally added to it. The problem here is that I'd need to create multiple sums -- a[0] + b[0] would need to be tested against multiple possibilities along with a[0] + b[1]. Do I plan to create 4 loops? I suppose I could, but oof
// I could split it into a 2/2 problem. Take the first 2 arrays, find different possible sums, and then compare those against the sums of the other 2. Because the target is always zero, the second set of sums would be the same number as the first set but negative where the first set is positive and vice versa. 
// How to set up the map to hold the first set of sums? I need a way to tell if I'm getting multiple combinations of numbers that make the same sum, since duplicates apparently aren't a problem for this challenge. Oh, but also I don't need to record specific numbers or indices, so I suppose a counter would do-- Each time a sum is found, increase it's value count by 1

const fourSumCount = function (a, b, c, d) {
    let count = 0
    const sums = {}
    for (const numA of a) {
        for (const numB of b) {
            const sum = numA + numB
            sums[sum] = sums[sum] + 1 || 1
        }
    }
    for (const numC of c) {
        for (const numD of d) {
            const sum = numC + numD
            if (sums[-sum]) count += sums[-sum]
        }
    }
    return count
}

console.log(fourSumCount([1,2], [-2,-1], [-1,2], [0,2])) // 2
console.log(fourSumCount([-1,-1], [-1,1], [-1,1], [1,-1])) // 6

// success, time & space is a straightforward O(n^2)