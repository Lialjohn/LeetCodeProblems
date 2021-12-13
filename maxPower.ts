// https://leetcode.com/problems/consecutive-characters/

// The power of the string is the maximum length of a non-empty substring that contains only one unique character.

// Given a string s, return the power of s.

// ----------------------------------

// so the max power of a string is the length of a consecutive series of the same letter. ee would be power of 2, eee would be power of 3, and so on.
// I do wonder is separate letters that are the same still count, or do they all have to be adjacent to one another.
// seems like 'no' because in the 'leetcode' example, only the double 'ee' counts towards the number
// simplest approach seems to just iterate through the string and count. could I possibly avoid doing this and get faster?
// using indices won't work because there's no guarantee of what's between two letters of the same type. I'd really have to check each and every letter to see if it's the same as the last. 

const maxPower = (s: string): number => {
    let res = 0
    let count = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i - 1]) count++
        else count = 1
        res = Math.max(res, count)

    }
    return res
}

console.log(maxPower('leetcode')) // 2
console.log(maxPower('abbcccddddeeeeedcba')) // 5
console.log(maxPower('triplepillooooow')) // 5
console.log(maxPower('hooraaaaaaaaaaay')) // 11
console.log(maxPower('tourist')) // 1