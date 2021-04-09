// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3702/

// In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

// Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.

// --------------------------------------------------------

// hm. could use a pointer for both words and order; for each word's first letter, order's pointer will move through the string in search for it. when the letter is found, order's pointer will stay where it is. if the next word's first letter is different, I can return false if the letter isn't found in the remaining section of order. if each letter in the words array continues to be found in order while its pointer only moves forward and never resets, I can return true.
// I do have to account for the whole word though, and not just the first letter.
// in the event I have 2 words with the same first letter, I'd need a different strategy. The simplest way (although not necessarily efficient) would be to move through each index and compare.
// this seems clunky af though at O(n*j*26) where k is individual word length
// I essentially want to check each word against the one before it. 

const isAlienSorted = (words: string[], order: string): boolean => {
    for (let i = 1; i < words.length; i++) {
        let j = 0
        while (words[i][j] === words[i - 1][j] && (words[i - 1][j] && words[i][j])) j++
        let k = 0
        while (words[i - 1][j] !== order[k]) k++
        while (words[i][j] !== order[k] && words[i-1][j]) {
            k++
            if (k >= 26) return false
        }
    }
    return true
}

console.log(isAlienSorted(["hello","leetcode", "able", "blab", "car"], "hlabcdefgijkmnopqrstuvwxyz")) // true
console.log(isAlienSorted(["hello","leetcode", "tough", "tar"], "hlabcdefgijkmnopqrstuvwxyz")) // false
console.log(isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz")) // false
console.log(isAlienSorted(["tough", "tug", "vee", "vee"], "abcdefghijklmnopqrstuvwxyz")) // true