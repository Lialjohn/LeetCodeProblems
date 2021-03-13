// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/589/week-2-march-8th-march-14th/3669/

import { strict } from "assert"

// Given a binary string s and an integer k.

// Return True if every binary code of length k is a substring of s. Otherwise, return False.

// ------------------------------------------------------

// so it seems like you have to come up with all permutations of a binary substring of length k as well as checking s for them. let's assume I have them.
// I can use a 'window' method and check off every one of the variations seen in the string by grabbing the first substring and mutating it as I iterate through s. this would be O(n+k)
// alternatively, since I'm only working with 0s and 1s of a certain length, I don't actually need to know each perm because the exact number of perms will be 2**k. If I use the same window method except I log each string in a map and keep count of newly encountered combinations counting down from k, that would work slightly better. O(n)

const hasAllCodes = (s: string, k: number): boolean => {
    let str = s.slice(0, k)
    const perms = {}
    let count = 2**k - 1 // minus one for the first str
    perms[str] = true
    for (let i = k; i < s.length; i++) {
        str = str.replace(/^./, '') + s[i]
        if (!perms[str]) count--
        perms[str] = true
    }
    return count === 0
}

console.log(hasAllCodes('0110', 1)) // true
console.log(hasAllCodes('00110', 2)) // true
console.log(hasAllCodes('0000000001011100', 4)) // false
