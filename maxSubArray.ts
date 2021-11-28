// https://leetcode.com/problems/maximum-subarray/

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

// A subarray is a contiguous part of an array.

// --------------------------------------------------------------------

// so: need to sum combinations of adjacent numbers, and return the largest one
// start with 2 variables, representing the result/highest sum and another which is a temporary or test sum
// With each iteration through the array, add current element to the test sum. if the result is larger than test sum, replace test sum.
// also if the current element is bigger than the current sum + current element, the current element will replace the sum. Removes part of the array that will only lower the total. 
// start with first element of the array as that could potentially be the highest subarray sum itself. Will build off that element.
// if the test sum gets bigger, the final sum is also replaced

const maxSubArray = (nums: number[]):number => {
    let res = nums[0]
    let sum = nums[0]
    for (let i = 1; i < nums.length; i++) {
        sum = Math.max(nums[i], sum + nums[i])
        res = Math.max(res, sum)
    }
    return res
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])) // 6 
console.log(maxSubArray([1])) // 1
console.log(maxSubArray([5,4,-1,7,8])) // 23
console.log(maxSubArray([-2,-1])) // -1