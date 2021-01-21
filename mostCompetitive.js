// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3611/

// Given an integer array nums and a positive integer k, return the most competitive subsequence of nums of size k.

// An array's subsequence is a resulting sequence obtained by erasing some (possibly zero) elements from the array.

// We define that a subsequence a is more competitive than a subsequence b (of the same length) if in the first position where a and b differ, subsequence a has a number less than the corresponding number in b. For example, [1,3,4] is more competitive than [1,3,5] because the first position they differ is at the final number, and 4 is less than 5.

//---------------------------------------

// seems like order is key for this problem. the first number where subarrays differ is important. although the description doesn't mention numbers that come after, it also doesn't say there can be multiple answers and the test case examples make me think I should grabbing only the smallest possible numbers for the returning subarray.
// so what the problem's asking for is a subarray of the smallest possible numbers, with the left elements being the most competitive/small.
// loop through the array looking for the smallest number. push it, then go through again starting from that index. finish when k = 0
// which will be around O(nk), I think. the test case numbers can go pretty high so it's not a great solution.

const mostCompetitiveSlowAF = (nums, k) => {
    let smallest = Infinity
    let j = 0
    const result = []
    while (k) {
        for (let i = j; i <= nums.length - k; i++) {
            if (nums[i] < smallest) {
                smallest = nums[i]
                j = i + 1
            }
        }
        result.push(smallest)
        smallest = Infinity
        k--
    }
    return result
}

// ok how about I make an array of length k and then assign numbers to the indices based on how small they are.

const mostCompetitive = (nums, k) => {
    const result = Array(k).fill(Infinity)
    let j = 0
    for (let i = 0; i < nums.length; i++) {
        // go through each number in nums, compare to the pointer in result
        // if the element that j is pointing to is > than the current element, replace it and move the pointer up.
        // if result[j] > nums[i], move down until an element is found that is < or j reaches 0. set everything to Infinity as I pass
        if (result[j] > nums[i]) {
            // if the numbers left in result (res.length - j) are less than the free numbers left in nums, move j back down the result array
            while (result[j - 1] > nums[i] && result.length - j < nums.length - i) {
                result[j--] = Infinity
            }
            result[j] = nums[i]
            // only increment j if it's in bounds
            if (j < k - 1) j++
        }
    }
    return result
}

// the time for this one seems to be much better. I go through each element in nums that's O(n) and worst case for the while statement is that it fills up as I go through i and then have to backtrack to the start of the result array so... O(2n). not too bad for unsorted array ops.

console.log(mostCompetitive([3,5,2,6], 2)) // [2,6]
console.log(mostCompetitive([2,4,3,3,5,4,9,6], 4)) // [2,3,3,4]
console.log(mostCompetitive([3,3,4,6,2,6,4,2,2,2], 5)) // [2,4,2,2,2]
console.log(mostCompetitive([20,21,22,23,16,17,18,19,12,13,14,15,8,9,10,11,4,5,6,7,1,2,3,4], 4)) // [1,2,3,4]