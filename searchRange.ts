// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/597/week-5-april-29th-april-30th/3725/

// Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// Follow up: Could you write an algorithm with O(log n) runtime complexity?

// ----------------------------------------------------------------------------

// ok very easy and lazy O(n) solution is to return [nums.indexOf(target), nums.lastIndexOf(target)]
// but there's a way to do this is O(logn) time, so focusing on that
// sorted in ascending order means I can use binary search to find the target number which will be logn time, although I'd still have to find the first and last indices where they appear.
// binary search doesn't have to return as soon as it finds a number. If one pointer continues to move if the element is === to the target, it'll find the left or rightmost element for me. Then I can do another binary search, but for the number that would naturally be right next to the target number, target +/- 1

const searchRange = (nums: number[], target: number): [number, number] => {
    const biSearch = (a: number[], t: number, left: number = 0, right: number = nums.length - 1) => {
        let mid
        while (left <= right) {
            mid = Math.floor((left + right) / 2)
            if (a[mid] < t) left = mid + 1
            else right = mid - 1
        }
        return left
    }
    const l = biSearch(nums, target)
    if (nums[l] !== target) return [-1, -1] // if no match was found and I just some close but not right number, or undefined.
    const r = biSearch(nums, target + 1) - 1
    return [l,r]
}

console.log(searchRange([5,7,7,8,8,10], 8)) // [3,4]
console.log(searchRange([5,7,7,8,8,10], 6)) // [-1,-1]
console.log(searchRange([], 0)) // [-1,-1]