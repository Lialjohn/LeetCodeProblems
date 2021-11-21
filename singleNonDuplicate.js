// https://leetcode.com/problems/single-element-in-a-sorted-array/

// You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

// Return the single element that appears only once.

// Your solution must run in O(log n) time and O(1) space.
// --------------------------------------------------------------

// if I didn't have to worry about time, the simplest solution would be to iterate through from position 1, checking whether or not the previous element matches the current one, and then skipping 2 positions, returning the number that doesn't match the current number.
// but I do so. if each number appears twice then the odd position will match the previous even position. At any point in the array, if this isn't the case, it will mean the single number has been passed.
// to be logn I'll probably have to use a binary search
// pick points l = 1 and r = n - 1. the mid point will always have to be an odd number, to account for the double elements. the total number of elements will always be odd, so a midpoint will always be exactly in the middle. so for middle... depending on even/odd index, check preceding or proceeding element for discrepancies. if it's even, the proceeding number should match. if odd, the preceding number should match. if the match isn't found, another search begins on the first half of the array. if it does match, another search is made on the second half.

const singleNonDupe = nums => {
    let l = 0, r = nums.length - 1
    let m, match
    while (l <= r) {
        m = l + Math.floor((r - l) / 2)
        match = m % 2 === 0 ? m + 1 : m - 1
        if (nums[m] === nums[match]) {
            l = m > match ? m + 1 : m + 2
        } else {
            r = m > match ? match : m
            if (nums[r] !== nums[r - 1] && nums[r] !== nums[r + 1]) return nums[r]
        }
    }
}

console.log(singleNonDupe([1,1,2,3,3,4,4,8,8])) // 2
console.log(singleNonDupe([3,3,7,7,10,11,11])) // 10
console.log(singleNonDupe([1,2,2,3,3,4,4,5,5])) // 1
console.log(singleNonDupe([1,1,2,2,3,3,4,4,10,10,11])) // 1