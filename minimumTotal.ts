// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/595/week-3-april-15th-april-21st/3715/

// Given a triangle array, return the minimum path sum from top to bottom.

// For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

// -----------------------------------------------------------------

// so picking the smallest of the two available numbers seems obvious at first, but what if a path starts high and gets real small, and another vice versa? like if I have two potential paths to begin with 9 1. the 9 path has a 9 1 1 1 sum but the min 1 path is 1 9 9 9. I'd need to know the sum a ways down the triangle before I could pick which number to sum at the top. There's also the matter of, what if my two options are the same? need to know the numbers further down.
// I could copy triangle (so it doesn't mutate), then move through each array starting from the end - 2. for each cell, replace the number with a math.min(sum row and row + 1[j], sum row and row + 1[j+1]). the top cell will always have the smallest available sum from that point downward. Could also do it from top to bottom but this way avoids having to pick out the smallest number from the bottom row.

const minimumTotal = (triangle: number[][]): number => {
    const t = Array(triangle.length).fill(null).map((row, i) => [...triangle[i]])
    for (let i = t.length - 2; i >= 0; i--) {
        for (let j = 0; j < t[i].length; j++) {
            t[i][j] = Math.min(t[i][j] + t[i + 1][j], t[i][j] + t[i + 1][j + 1])
        }
    }
    return t[0][0]
}

// time and space O(n) approx. O(n + n + (n-1) + (n-2)... etc.)

console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])) // 11
console.log(minimumTotal([[-10]])) // -10