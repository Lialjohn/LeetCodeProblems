// https://leetcode.com/problems/wildcard-matching/

// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).

// ---------------------------------------

// I specifically chose this problem to practice dp so here we go. How do I break this problem down into a smaller one?
// obvious choice seems to be take the first letter of each string and compare. Or rather, compare them to each other and to the answer to the simplest problem, which would be empty string vs empty string.

const isMatch = (s: string, p: string): boolean => {
    const dp = Array(s.length + 1).fill(false).map(b => Array(p.length + 1).fill(false))
    dp[0][0] = true // s: empty && p: empty = true
    // empty s can only return true if there are only *s in p
    // so for the first row, I'll just check for that.
    for (let i = 1; i < dp[0].length; i++) {
        if (p[i - 1] === "*") dp[0][i] = dp[0][i - 1]
    }
    // now for everything that isn't in the first row or column. This'll need a specific set of rules to work.
    // if the current letter in s matches the current letter in p or p is '?', dp[i][j] will take its value from [i - 1][j - 1]
    // if the values don't match and p[i] isn't '?', don't set dp, which will mean the current cell will remain false.
    // if p[i] is an '*', then the dp cell will take it's value from one of the surrounding cells, left, left-top, or top. if any one of these is true, so will be the current dp cell. otherwise it'll be false.
    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            console.log(i, j)
            if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) dp[i][j] = dp[i - 1][j - 1]
            else if (p[j - 1] === '*') dp[i][j] = dp[i - 1][j] || dp[i - 1][j - 1] || dp[i][j - 1]
        }
    }
    return dp[s.length][p.length]
}

// console.log(isMatch('aa', 'a')) // false
// console.log(isMatch('aa', '*')) // true
// console.log(isMatch('cb', '?a')) // false
console.log(isMatch('adceb', '*a*b')) // true
console.log(isMatch('acdcb', 'a*c?b')) // false