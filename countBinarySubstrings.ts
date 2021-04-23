// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/596/week-4-april-22nd-april-28th/3718/

import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants"

// Give a string s, count the number of non-empty (contiguous) substrings that have the same number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped consecutively.

// Substrings that occur multiple times are counted the number of times they occur.

// -------------------------------------------------------

// I'll need to iterate through the string. Keep a count of whichever number I'm on. 

const countBinarySubstrings = (s: string): number => {
    let count = 0, bCount = 0, prevCount = 0
    for (let i = 0; i < s.length; i++) {
        // count the current number
        // if the current number is different than the previous && > 0, and add to count whichever is smaller, bCount or prevCount. Assign bcount to prevCount and reset bcount.
        bCount++
        if (s[i] !== s[i + 1]) {
            count += Math.min(bCount, prevCount)
            prevCount = bCount
            bCount = 0
        }
    }
    return count
}

// ez O(n) time, O(1) space woo

console.log(countBinarySubstrings("00110011")) // 6
console.log(countBinarySubstrings("10101")) // 4