// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/590/week-3-march-15th-march-21st/3676/

// Given an integer array nums, return the length of the longest wiggle sequence.

// A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with fewer than two elements is trivially a wiggle sequence.

// For example, [1, 7, 4, 9, 2, 5] is a wiggle sequence because the differences (6, -3, 5, -7, 3) are alternately positive and negative.
// In contrast, [1, 4, 7, 2, 5] and [1, 7, 4, 5, 5] are not wiggle sequences, the first because its first two differences are positive and the second because its last difference is zero.
// A subsequence is obtained by deleting some elements (eventually, also zero) from the original sequence, leaving the remaining elements in their original order.

// ---------------------------------------------------------------

// I can discount numbers that don't fit the wiggle pattern as they are effectively deleted as I go through the array, cool. 
// that means unless the array is length 1 or it's filled with just one number, the lowest number that can be returned is 2
// count will always start at 1
// ok iterate through array with a pointer on the current element and a variable holding the previous valid element, which starts at nums[0]. I need to hold the variable because if the number is a dupe, i'll need to skip. I also need some indicator of whether the previous difference was positive or negative, so maybe a switch variable will do.
// I could also iterate through the array and make a new one with differences between each number and the next. if past number was positive and current negative or vice versa, count + 1. this would take up more memory if I don't mutate the original array.
// so if the next number is greater than curr and positive switch is false, count++. if next number is lesser than curr and positive is true, count++. in both cases, flip positive. else no changes.
// 

const wiggleMaxLength = (nums: number[]): number => {
    let count = 1
    let j = 1
    let prev = nums[0]
    while (prev === nums[j]) j++
    let positive = prev < nums[j]
    for (let i = j; i < nums.length; i++) {
        if ((prev < nums[i] && positive) || (prev > nums[i] && !positive)) {
            count++
            positive = !positive
        }
        prev = nums[i]
    }
    return count
}

// O(n) time and O(1) space, woo

console.log(wiggleMaxLength([1,7,4,9,2,5])) // 6
console.log(wiggleMaxLength([1,17,5,10,13,15,10,5,16,8])) // 7
console.log(wiggleMaxLength([1,2,3,4,5,6,7])) // 2
console.log(wiggleMaxLength([1,1,1,1,1,1])) // 1
