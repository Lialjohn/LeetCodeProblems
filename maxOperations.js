// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3608/

// You are given an integer array nums and an integer k.

// In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

// Return the maximum number of operations you can perform on the array.

// //---------------------------------------

// easy way would be to move through the array, subtracting elements from k and stashing the results in a map. If I come across a number that exists in the map, I know I've found a match.
// the map will count the number of times a result has been found, in case of doubles.

const maxOperations = (nums, k) => {
    let counter = 0
    let memo = new Map()
    for (let n of nums) {
        if (memo.get(n) > 0) {
            counter++
            memo.set(n, memo.get(n) - 1)
        }
        else if (k > n) {
            memo.set(k - n, (memo.get(k - n) || 0) + 1)
        }
    }
    return counter
}

// time and space both O(n)
// there's also the 2 pointer approach, although I'd have to sort() the array first making the time O(nlogn). Space would be reduced to O(1) though so it has that advantage.

const maxOperations2P = (nums, k) => {
    nums.sort()
    let counter = 0
    let i = 0
    let j = nums.length - 1
    while (i < j) {
        if (nums[i] + nums[j] > k) j--
        else if (nums[i] + nums[j] < k) i++
        else {
            counter++
            i++
            j--
        }
    }
    return counter
}

console.log(maxOperations2P([1,2,3,4], 5)) // 2
console.log(maxOperations2P([3,1,3,4,3], 6)) // 1
console.log(maxOperations2P([2,5,4,4,1,3,4,4,1,4,4,1,2,1,2,2,3,2,4,2], 3)) // 4