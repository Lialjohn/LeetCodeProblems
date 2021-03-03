// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3659/

// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

// Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?

// --------------------------------------------------------------

// could sort the numbers and then iterate through, returning at the first number that doesn't match it's index or if the loop finishes, nums.length. O(nlogn)
// alternatively could use an extra array to 'sort' the numbers by index, returning only the missing one. O(n) space O(n)
// the problem is telling me there's a solution for O(n) time and O(1) space though
// how about I use a while loop to jump around, swapping numbers into their correct indices? then got through a second time looking for the number that's out of place. which will be whatever number nums.length is, because there'll be nowhere to swap it to. if the index exists in the array, swap it. if it doesn't, skip the swap.
// this kind of sorting would be approx 2n. Since a number will be swapped right into it's correct index, you can only swap a max of n times, and then iterating through the array would also be O(n)
// 

const missingNumberSwap = (nums: number[]): number => {
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== i && nums[i] !== nums.length) {
            // swap
            let temp = nums[i]
            nums[i] = nums[temp]
            nums[temp] = temp
        }
    }
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) return i
    }
    return nums.length
}

// alternatively, because the array has to be comprised of elements 0 through n, a sum should be able to tell me what the missing number is. get the sum with length * (length + 1) / 2, and then subtract each element of the array until hitting the end.

const missingNumber = (nums: number[]): number => {  
    let sum = nums.length * (nums.length + 1) / 2
    for ( const n of nums ) {      
        sum -= n
    }
    return sum
}

// which is actually O(n) :D

console.log(missingNumber([3,4,2,1])) // 0
console.log(missingNumber([3,0,1])) // 2
console.log(missingNumber([0,1])) // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])) // 8
console.log(missingNumber([0])) // 1