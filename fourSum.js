// https://leetcode.com/problems/4sum/

// Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

// Notice that the solution set must not contain duplicate quadruplets.
//----------------------------------------------

// another day another nSum problem
// Like threeSum, it seems prudent to sort() the array in order to discover dupes
// I'll up the number of pointers to 4. Will base off of threeSum with a for loop pointer at the start, but add one more to make i and j. The last two pointers will cover the elements between j and the end of the array, starting at opposite ends.
// after each pointer's iteration I'll check with while loops to see if the already seen element is the same as the next. Skip over each one until I get to a new number.

const fourSum = (nums, target) => {
    const quads = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        for (let j = i + 1; j < nums.length - 2; j++) {
            // other two pointers that cover elements between j and nums.length
            let x = j + 1
            let y = nums.length - 1
            while (x < y) {
                let sum = nums[i] + nums[j] + nums[x] + nums[y]
                if (sum === target) { // on success, adjust both x and y indices but keep iterating to look for more combinations
                    quads.push([nums[i], nums[j], nums[x], nums[y]])
                    while (nums[x] === nums[x + 1]) x++ // skip dupes
                    while (nums[y] === nums[y - 1]) y-- // skip dupes
                    x++
                    y--
                } // on failure, adjust indices depending on sum
                else if (sum < target) x++
                else if (sum > target) y--
            }
            while (nums[j] === nums[j + 1]) j++ // skip dupes
        }
        while (nums[i] === nums[i + 1]) i++ // skip dupes
    }
    return quads
}

console.log(fourSum([1,0,-1,0,-2,2], 0)) // [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]
console.log(fourSum([], 0)) // []
console.log(fourSum([-2,-1,-1,1,1,2,2], 0)) // []

// works! time looks like O(n^3) oof