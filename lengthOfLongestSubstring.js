// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3595/

// Given a string s, find the length of the longest substring without repeating characters.

//------------------------------

// how will I know if a character has been seen before? map obj.
// one pointer will iterate through the string first (right) and logging them in the map. if it comes across a character that's already logged, the second pointer (left) will begin to iterate through the previous characters, removing characters from the log as it goes
// when left removes the problem character from the map, right will resume, logging the current element before moving to the next which will make sure the correct count is being kept
// longest count can be kept by Math.max()ing a kept variable and the indices on each iteration. Every time r increases, will compare (count, righti-lefti)
// easy O(2n) or O(n)

const lengthOfLongestSubstring = s => {
    const seen = {}
    let l = 0
    let r = 0
    let count = 0
    while (l < s.length && r < s.length) {
        if (seen[s[r]]) {
            delete seen[s[l++]]
        } else {
            seen[s[r++]] = 1
            count = Math.max(count, r - l)
        }
    }
    return count
}

// oof my answer is on the lower end of time for other submissions, even though it looks nearly identical!?
// I wonder if my internet affects these at all or what

console.log(lengthOfLongestSubstring('abcabcbb')) // 3
console.log(lengthOfLongestSubstring('bbbbb')) // 1
console.log(lengthOfLongestSubstring('pwwkewl')) // 4
console.log(lengthOfLongestSubstring('')) // 0