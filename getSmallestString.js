// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3619/

// The numeric value of a lowercase character is defined as its position (1-indexed) in the alphabet, so the numeric value of a is 1, the numeric value of b is 2, the numeric value of c is 3, and so on.

// The numeric value of a string consisting of lowercase characters is defined as the sum of its characters' numeric values. For example, the numeric value of the string "abe" is equal to 1 + 2 + 5 = 8.

// You are given two integers n and k. Return the lexicographically smallest string with length equal to n and numeric value equal to k.

// Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

// //----------------------------------------------------------

// so I need to make a string within these two parameters and also make it the smallest possible - meaning that the lowest value letters possible should be used from smallest -> largest. I need to find a sum of n numbers that equal k.
// first idea: start with a string of all 'a's and then adjust the character at the back depending on if it's higher or lower.
// although since the n can get high, it's probably not ideal
// I can also do it the opposite way and start at the end with a 'z'
// this seems better as it's really only the first letters that are important. anything else just gets filled with z to minimize the letters in front.
// subtract that amount from k, keep stacking 'z's until k is < 26. or rather divide k by 26.
// also need to take remaining numbers n into account though
// k will have to stay >= n, otherwise completing the problem is impossible.
// really it just seems like finding the right amount of 'z's and 'a's and then the one character in the middle to bridge the gap
// I want to reduce k by 26 until k === n, ideally. If I reduce k and it's < n, it means the letter being used is too large and I need to size down until I get === n

const getSmallestString = (n, k) => {
    // starting string and char value
    let str = ''
    // while k !== n, reduce k by 26 and add a z to str
    // if k - curr(26 start) makes k < n, reduce curr until k - curr === n - 1
    // fill the rest of the string with 'a's
    let curr = 26
    while (k - curr > n - 1) {
        str += 'z'
        k -= curr
        n--
    }
    if (k - curr <= n - 1) {
        str = String.fromCharCode(k - n + 97) + str
        n--
    }
    return 'a'.repeat(n) + str
}

// a nice O(n). Got a pretty decent percentage on leet, too, at 80%. Don't think there's a better time since you have to add characters to the string one at a time no matter what. 

console.log(getSmallestString(3, 27)) // 'aay'
console.log(getSmallestString(5, 73)) // 'aaszz'
console.log(getSmallestString(5, 5)) // 'aaaaa'
console.log(getSmallestString(5, 130)) // 'zzzzz'