// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/586/week-3-february-15th-february-21st/3643/

// Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

// Notice that you may not slant the container.

// ----------------------------------------------------------

// final area will be the max height the water can go * the distance between the container heights
// important that heights don't impede each other's ability to hold water. the heights in between the container heights may as well not exist
// the smallest of any two container walls will determine the height of the water. width will be j - i
// width is more likely to create more volume but the heights can get really high.
// I'll start on the outermost edges of heights to maximize volume from the start and then move inward. get the volume, then whichever side is smaller is moved until it reaches a height that is larger than previous. calculate a new volume and compare, then continue iterating whichever side is smaller.

const maxArea = (heights: number[]): number => {
    let i = 0
    let j = heights.length - 1
    let biggest = 0
    while (i < j) {
        biggest = Math.max(biggest, Math.min(heights[i], heights[j]) * (j - i))
        if (heights[j] <= heights[i]) j--
        else i++
    }
    return biggest
}

// time O(n), space O(1)

console.log(maxArea([1,8,6,2,5,4,8,3,7])) // 49
console.log(maxArea([1,1])) // 1
console.log(maxArea([4,3,2,1,4])) // 16