// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/593/week-1-april-1st-april-7th/3699/

// You are given a string s of even length. Split this string into two halves of equal lengths, and let a be the first half and b be the second half.

// Two strings are alike if they have the same number of vowels ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'). Notice that s contains uppercase and lowercase letters.

// Return true if a and b are alike. Otherwise, return false.

// -----------------------------------------------------

// so this is a vowel counting problem, except with two words instead of just one
// split the string, then count the cumulative vowels for each resulting string. Checking an object with vowels seems like a quick way to check each character in the string, so I'll make one of those and then check each character of both strings at the same time. One will raise a count, the other will lower it. if the count remains 0 after iterating through the strings, they'll have the same vowel count.

const halvesAreAlike = (s: string): boolean => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
    let count = 0
    for (let i = 0, mid = ~~s.length/2; i < mid; i++) {
        if (vowels.has(s[i])) count++
        if (vowels.has(s[s.length - i - 1])) count--
    }
    return count === 0
}

// O(n) time for the loop and O(1) space. ez.

console.log(halvesAreAlike('book')) // true
console.log(halvesAreAlike('textbook')) // false
console.log(halvesAreAlike('MerryChristmas')) // false
console.log(halvesAreAlike('AbCdEfGh')) // true