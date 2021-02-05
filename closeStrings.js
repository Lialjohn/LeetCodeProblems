// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3613/

// Two strings are considered close if you can attain one from the other using the following operations:

// Operation 1: Swap any two existing characters.
// For example, abcde -> aecdb
// Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
// For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
// You can use the operations on either string as many times as necessary.

// Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

//--------------------------------------

// ok, so you can either swap exactly two existing characters in place or you can transform all of one character into all of another.
// It does seem as though if the strings are not the same length, that's an automatic false return.
// just working with word1, word2 is a target to hit
// the count of letters also has to be the same-- not the same letters but if one word has 3 'a's and 2 'b's, it's ok if the other word has 3 'b's and 2 'a's etc.
// same letters, same counts, same length. Just gotta make sure those variables match up.

const closeStrings = (w1, w2) => {
    if (w1.length !== w2.length) return false // check for mismatched length
    const counter1 = new Map
    const counter2 = new Map
    for (let a of w1) {
        counter1.set(a, counter1.get(a) + 1 || 1)
    }
    for (let a of w2) {
        if (!counter1.has(a)) return false // check for mismatched letters
        counter2.set(a, counter2.get(a) + 1 || 1)
    }
    let counts1 = Array.from(counter1.values())
    let counts2 = Array.from(counter2.values())
    return counts1.sort().join() === counts2.sort().join() // check for mismatched counts
}

// sort() makes this nlogn. Gotta say I didn't like this problem much. couldn't think of anything better than this sort of very straightforward solution, so I went onto the discussion board to see what other people were doing -- but this or something very like this is the common approach.

console.log(closeStrings('abc', 'bca')) // true
console.log(closeStrings('a', 'aa')) // false
console.log(closeStrings('cabbba', 'abbccc')) // true
console.log(closeStrings('cabbba', 'abbss')) // false