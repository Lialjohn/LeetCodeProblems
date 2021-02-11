// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3636/

// Given two strings s and t , write a function to determine if t is an anagram of s.

// ----------------------------------------------------------

// classic problem. Can be solved with a character count map.
// if you're not using a string of methods .split().sort().join(), but that's a bit slower than the map.
// feb challenges are really easy so far
// as soon as I think that, the next one will be ulta hard :D

const isAnagram = (s :string, t: string): boolean => {
    if (s.length !== t.length) return false
    const m = {}
    for (let c of s) m[c] = m[c] + 1 || 1
    for (let c of t) {
        if (!m[c]) return false
        m[c]--
    }
    return true
}

console.log(isAnagram("anagram", "nagaram"))
console.log(isAnagram("rat", "car"))