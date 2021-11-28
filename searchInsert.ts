// https://leetcode.com/problems/search-insert-position/

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

// --------------------------------------------

// array is sorted, so it seems easy to run through the array, looking for the target number or a number that's greater than the target number.
// easy optimization option is to make it binary search for the target. if no target is found, return index that would be greater

const searchInsert = (nums: number[], target: number): number => {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) return i
    }
    return nums.length
}

// if nums[m] === target is easy
// depending on whether target is greater or lesser than middle element, move left to m + 1 or right to m - 1
// if target doesn't exist, either left or right will overlap each other
// if element should be at the end, left will end up as nums.length, so left will be returned. if element should be at the start, right overlaps left at 0, the target index should be 0 so left should also be returned
// In the middle, m will end up at whatever left is. nums[m] will be less than target, so left will move up so that l & r & m are all overlapping at > target. right will overlap left, leaving left at the correct position.
// in other words, if target isn't found return left in all other cases
// I could also add O(1) cases if target < nums[0] return 0 or if target > nums[n] return n + 1, to save a little extra time, since those can probably be quite likely to show up

const searchInsertBS = (nums: number[], target: number): number => {
    let l = 0, r = nums.length - 1, m
    while (l <= r) {
        m = Math.floor((l + r) / 2)
        if (nums[m] === target) return m
        else if (nums[m] < target) l = m + 1
        else r = m - 1
    }
    return l
}

console.log(searchInsertBS([1,3,5,6], 5)) // 2
console.log(searchInsertBS([1,3,5,6], 2)) // 1
console.log(searchInsertBS([1,3,5,6], 7)) // 4
console.log(searchInsertBS([1,3,5,6], 0)) // 0
console.log(searchInsertBS([1], 1)) //0
console.log(searchInsertBS([1,3,5,6,7,8,10], 4)) // 2