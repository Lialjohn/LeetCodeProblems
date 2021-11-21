// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/601/week-4-may-22nd-may-28th/3758/

// You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.

// Return the maximum score you can get by erasing exactly one subarray.

// An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

// -------------------------------------------------------------------

// aight so I need to keep a count starting from a pointer (l) to another (r). At the same time, I need to keep track of unique numbers within the subarray. 
// If I run through the array, with l & r both starting at zero, I can keep track of unique elements in a map. each element (r) moves to will be checked against the map, and if it's not in there, the number will be added to both the map and the current sum. if it is in the map, the current count is compared against the highest found count, and (l) subtracts the current element from count and increments. Will also have to check count at the end of the array.

const maximumUniqueSubarray = (nums: number[]): number => {
    let res = 0
    const seen = {}
    let sum = 0
    for (let l = 0, r = 0; r < nums.length; r++) {
        sum += nums[r]
        while (seen[nums[r]]) {
            sum -= nums[l]
            seen[nums[l]] = false
            l++
        }
        seen[nums[r]] = true
        res = Math.max(res, sum)
    }
    return res
}

// easy O(n) time and space

console.log(maximumUniqueSubarray([4,2,4,5,6])) // 17
console.log(maximumUniqueSubarray([5,2,1,2,5,2,1,2,5])) // 8