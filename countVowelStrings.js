// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/weej-3-january-15th-january-21st/3607/

// Given an integer n, return the number of strings of length n that consist only of vowels (a, e, i, o, u) and are lexicographically sorted.

// A string s is lexicographically sorted if for all valid i, s[i] is the same as or comes before s[i+1] in the alphabet.

//--------------------------------

// at first glace this seems like a permutation problem. My favorite D:
// permutations of 5 letters-- or really numbers 'cause their codes are used for comparison-- where the only valid permutations are where the larger values can only come after the smaller ones. like 12345, n = 3 valid perms would be 111 122 123 124 125 134 etc.
// so the strings must all be the same length, and whatever the values at i, i + 1 can't be smaller than it, i + 1 can only be >=.
// if I add in a couple extra arguments I can do this recursively. a vowels variable to limit the available permutations to valid ones only, and another counter variable to use for the base case. if the counter variable === n, I can return 1 valid permutation.
// I could also use n, by reducing n in every iteration I can return 1 when n = 0. I can do this because n has to be between 1 and 50 for these test cases.
// scratch the previous vowels idea. there's only 5 vowels and they can only be in order, I might as well just count down from 5.

const countVowelStringsPerms = (n, char = 0) => {
    if (n === 0) return 1
    let perms = 0
    for (let i = char; i < 5; i++) {
        perms += countVowelStrings(n - 1, i)
    }
    return perms
}

// this isn't super slow because of the limitations on which characters can go where, but I think the time is around O(n * vowels) and space O(n). DP solution is similar, although it uses a bit more space at O(n * vowels), too.

const countVowelStrings = n => {
    // make the dp matrix, filling them up with zeroes
    const dp = Array.from({length: n + 1}, _ => Array.from({length: 6}, (_,i) => 0))
    for (let i = 1; i <= n; i++) {
        for(let j = 1; j <= 5; j++) {
            // dp[i][j] is the total number of strings of length i that has that ends in vowel j. a always has 1 because any string that ends in a can only be all a's. the next vowel picks up the number of permutations from the previous vowel [j - 1] with the number of permutations the current vowel had in the last round [i - 1]. This is because the current round of permutations for a vowel will just be the previous total # of permutations at that vowel + the vowel. add that the total number of possible permutations for the previous vowel to get a new total.
            // check if on the first row. If not, add the sum from the previous column to the sum from the previous row for current row/col
            if (i > 1) dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
            else dp[i][j] = dp[i][j - 1] + 1
        }
    }
    // return final sum
    return dp[n][5]
}

// also there's apparently a formula for this kind of problem, neat

countVowelStringsMATH = n => {
    return (n + 1) * (n + 2) * (n + 3) * (n + 4) / 24
}

console.log(countVowelStrings(1)) // 5
console.log(countVowelStrings(2)) // 15
console.log(countVowelStrings(4)) // 70
console.log(countVowelStrings(33)) // 66045