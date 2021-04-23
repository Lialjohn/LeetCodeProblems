// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/596/week-4-april-22nd-april-28th/3717/

// There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the top to the bottom and cross the least bricks.

// The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

// If your line goes through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

// You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

// -------------------------------------------------------------

// so what I think I want is to find the most common prefix sum among the arrays of numbers given. The answer would be the number of arrays that don't share that common sum.
// I want to get the sum that appears the highest number of times, then return the length of the wall minus the count.
// how about: as I prefix sum each element in the array, count the number of times the number appears with a map. After that's all catalogued, run through the map contents to find the highest count.
// O(nm) time, O(nm) space, as every sum could be unique in the counts object. I could probably avoid mutating the wall array somehow. Another variable outside the inner loop probs.

const leastBricks = (wall: number[][]): number => {
    let mostCommon = 0
    const counts = {}
    for (let i = 0; i < wall.length; i++) {
        let preSum = 0
        for (let j = 0; j < wall[i].length - 1; j++) {
            preSum += wall[i][j]
            counts[preSum] = counts[preSum] + 1 || 1
            mostCommon = Math.max(mostCommon, counts[preSum])
        }
    }
    return wall.length - mostCommon
}

// [[1,3,5,6], [3,4,6], [1,4,6], [2,6], [3,4,6], [1,4,5,6]]
console.log(leastBricks([[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]])) // 2