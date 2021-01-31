// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/583/week-5-january-29th-january-31st/3623/

// Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

// If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

// The replacement must be in place and use only constant extra memory.

//------------------------------------------------------------------------

// I think what I need to do here is find an index where nums[i] < nums[i + 1] to find the point where I want to rearrange numbers, since it's the first opportunity I'll have to make the number larger. the exception being if there is no such index, in which case I return a reversed array.
// I can also swap more than once
// I'd need to start the search for this index at the back of the array because I'll get smaller increases than if I swapped numbers at the front.
// so find this element at i, then swap it with a larger element in the subarray.
// after that point, the goal would be to keep the subsequent elements in order from smallest to largest. Since the element at i is the first element that breaks descending order, everything after i is already reverse sorted really.
// if I swap i with the first element that is larger than it (iterating starting from the back) it should stay in order, too.
// so just reverse it :O

const nextPermutation = nums => {
    let i = nums.length - 2
    // find our cutoff point where nums[i] < nums[i + 1]
    while (i >= 0 && nums[i] >= nums[i + 1]) i--
    // if a cutoff was successfully found
    if (i >= 0) {
        // now find the first element closest to the back that is > the cutoff element
        let j = nums.length - 1
        while (j >= 0 && nums[j] <= nums[i]) j--
        // swap them
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
    }
    let j = nums.length - 1
    i++
    // reverse everything that comes after the cutoff point, as they'll be in descending order and reversing them puts them into ascending order (if there was no cutoff, i will be 0 and the whole array will be reversed) 
    while (i < j) {
        ;[nums[i], nums[j]] = [nums[j], nums[i]]
        i++
        j--
    }
    return nums // not really necessary for the problem, just my convenience
}

// i could be at 0, so finding i will be O(n). the larger element it's swapped with could be just the one after it, so O(2n). then there's the reversal which is O(n/2). overall worst time is O(n), not too bad. Space O(1).

console.log(nextPermutation([1,7,8,4,3,9,2])) // [1,7,8,4,9,2,3]
console.log(nextPermutation([1,7,8,4,1,9,4,3,2])) // [1,7,8,4,2,1,3,4,9]
console.log(nextPermutation([4,3,2,1])) // [1,2,3,4]
console.log(nextPermutation([1,1,5])) // [1,5,1]