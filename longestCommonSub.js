// https://leetcode.com/problems/longest-common-subsequence/

// Given two strings text1 and text2, return the length of their longest common subsequence.

// A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.

// If there is no common subsequence, return 0.

// ----------------------------------------------------

// the hints said to use dynamic programming, but I'm more familiar with recursion so...

// break the words down via recursion 
// seperate recurisive calls for each index - 1 will make sure every letter gets compared
// return 0 or 1 depending on whether we get a match or not. add the returns together to get the total
// keep a visited/memo object to save time on repeated combos

const longestCommonSubsequence = (text1, text2, i = text1.length - 1, j = text2.length - 1, memo = {}) => {
  // base case
  if (i < 0 || j < 0) return 0
  // key for memo, will save the result
  const key = `${i}&${j}`
  if (key in memo) return memo[key]
  let result
  // if letters at current indices match, the next iteration will skip both and add 1 to result
  if (text1[i] === text2[j]) {
    result = longestCommonSubsequence(text1, text2, i - 1, j - 1, memo) + 1
  } else {
    // if they don't match, do recursive call for each index - 1. Whichever returns the largest match gets grabbed
    result = Math.max(longestCommonSubsequence(text1, text2, i - 1, j, memo), longestCommonSubsequence(text1, text2, i, j - 1, memo))
  }
  // save in memo
  memo[key] = result
  return result
}

// time O(2^n) darn you recursion

// the hints also basically gave away the DP answer so what the heck I'll give it a shot
// but honestly why would you write a hint like that
// ok create a matrix to record results in

const longestCommonSubsequenceDP = (text1, text2) => {
  // DP matrix
  // relying on upper left/previous cells to add to totals in the other cells, so we need an extra row of zeros. It gets an extra +1 buffer for each array
  let dp = Array(text1.length + 1).fill(0).map(_ => Array(text2.length + 1).fill(0))
  // if either string is empty, no CSs
  if (!text1 || !text2) return 0
  for (let i = 1; i <= text1.length; i++){
    for (let j = 1; j <= text2.length; j++) {
      // if the characters match, assign the value of previous cell + 1 to current cell
      if (text1[i-1] === text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1
      // otherwise assign whatever is the larger number in the neighboring cells
      else dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j])
    }
  }
  // the highest number of matching characters will be in the bottom right cell
  return dp[text1.length][text2.length]
}

// O(nm), much better :p

console.log(longestCommonSubsequenceDP("abcde", "ace")) // "ace" 3
console.log(longestCommonSubsequenceDP("abc", "def")) // 0
console.log(longestCommonSubsequenceDP("abcdefdfasdgayertya", "pcefmxcvbcxza")) // 4
console.log(longestCommonSubsequence("abjcdelfgx", "bhydeiyfgt")) // 5
console.log(longestCommonSubsequence("abcdefghij", "klmnopqrst")) // 0
console.log(longestCommonSubsequence("uvirivwbkdijstyjgdahmtutav", "apazcdspcnolsvmlorqxazglyjq")) // 4