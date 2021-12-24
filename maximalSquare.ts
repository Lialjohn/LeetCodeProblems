// https://leetcode.com/problems/maximal-square/

// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

// --------------------------------------------------

// wait I've seen this problem recently. Although that one was counting ones and returning area, I can still do something similar but can't count rectangles, just areas where the width and height are proportional. iterating through a row, I can count how many 1's are in a row, and check height for each 1 found-- I only check as many spaces down as consecutive '1's found horizontally.
// when a zero is found, max is recalculated and the 1s count is reset.
// there's a dp way to approach this problem. record 1 for each 1 on left and top sides. for all other elements, if top and left side and top-left == some number higher than 1, take the smallest of the three and add 1.
// any rectangle will be made up of squares, as as long as you've got even numbers on all three of those elements, you'll be able to bump up your current square size.


const maximalSquare = (matrix: string[][]): number => {
    let max = 0
    const dp = Array(matrix.length).fill(0).map(e => Array(matrix[0].length))
    for (let i = 0; i < matrix[0].length; i++) {
        dp[0][i] = Number(matrix[0][i])
        if (dp[0][i]) max = 1
    }
    for (let j = 1; j < matrix.length; j++) {
        dp[j][0] = Number(matrix[j][0])
        if (dp[j][0]) max = 1
    }

    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[i].length; j++) {
            if (matrix[i][j] === '1') {
                if (dp[i - 1][j - 1] && dp[i - 1][j] && dp[i][j - 1]) dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                else dp[i][j] = 1
                max = Math.max(max, dp[i][j] * dp[i][j])
            } else dp[i][j] = 0
        } 
    }
    return max
}

console.log(maximalSquare([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])) // 4
console.log(maximalSquare([['0','1'], ['1','0']])) // 1
console.log(maximalSquare([["1","1","1","0","0"],
                           ["1","1","1","0","0"],
                           ["1","1","1","1","1"],
                           ["0","1","1","1","1"],
                           ["0","1","1","1","1"],
                           ["0","1","1","1","1"]])) // 16
console.log(maximalSquare([["1","1","1","1"],
                           ["1","1","1","1"],
                           ["0","1","1","1"],
                           ])) // 9
console.log(maximalSquare([["1","0","1","0"],
                           ["1","0","1","1"],
                           ["1","0","1","1"],
                           ["1","1","1","1"]])) // 4