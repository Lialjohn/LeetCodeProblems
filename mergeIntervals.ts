// https://leetcode.com/problems/merge-intervals/

// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// ------------------------------

// intervals[i][0] must be lesser than intervals[i][1]
// to be considered overlapping, either number in one set must be between the other. need to check if one set is completely eaten by another, as well.
// resulting intervals[i][0] will be the smallest intervals[i][0] and resulting intervals[i][1] will be the largest intervals[i][1].
// make an array, fill indices intervals[i][0], intervals[i][1], and in between with elements. overlap would be when the space at one index is already filled. I could get the results from iterating through it. Problem is this could potentially be very slow.
// N^2 if I simply check each set against one another. when one is merged, push the merged array and wipe the elements that were merged, so it can be skipped later. possible, but kind of a headache.
// alternatively can sort all sets and then run through intervals array one time, comparing sets. the first set will be guaranteed to have the lowest left, and all I have to do is check whether right overlaps i + 1. I could use a while loop. while right[i] >= left[i + 1], adjust current variable set and increase i. when the condition fails, push variable to res
// O(nlogn) time set by sort(). space is n

const merge = (intervals: number[][]): number[][] => {
    // res array that will take pieces that'll be merged
    const res = []
    intervals.sort((a,b) => a[0] - b[0])
    for (let i = 0; i < intervals.length; i++) {
        let temp = intervals[i]
        while(intervals[i + 1] && temp[1] >= intervals[i + 1][0]) {
            temp[1] = Math.max(temp[1], intervals[i + 1][1])
            i++
        }
        res.push(temp)
    }
    return res
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]])) // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]])) // [[1,5]]
console.log(merge([[1,3],[2,6],[8,10],[15,18],[0,20]])) // [[0,20]]
console.log(merge([[1,4],[0,2],[3,5]])) // [[0,5]]