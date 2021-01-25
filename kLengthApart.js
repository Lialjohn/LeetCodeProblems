// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3616/

// Given an array nums of 0s and 1s and an integer k, return True if all 1's are at least k places away from each other, otherwise return False.

// //-----------------------------------------------

// kk
// loop through array elements, every time I encounter a 1, reset a countdown variable.
// each time I hit a zero, decrement the variable. If I hit a 1 before the countdown has reached zero, that's a false. Easy O(n)

const kLengthApart = (nums, k) => {
    let countdown = 0
    for (const n of nums) {
        if (n && countdown > 0) return false
        if (n) countdown = k
        else countdown--
    }
    return true
}

// easy peasy :O
// I could also solve this using prefix sums but it wouldn't improve time at all.
// struggling to think of a solution that beats O(n) though. Apparently other people are, too, because this solution is in the 90th percentile of time on leetcode.

console.log(kLengthApart([1,0,0,0,1,0,0,1], 2)) // true
console.log(kLengthApart([1,0,0,1,0,1], 2)) // false
console.log(kLengthApart([1,1,1,1,1,1], 0)) // true
console.log(kLengthApart([0,1,0,1], 1)) // true
console.log(kLengthApart([0,0,0,0], 1)) // true