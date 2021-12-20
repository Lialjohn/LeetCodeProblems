// https://leetcode.com/problems/minimum-absolute-difference/

// Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements. 

// Return a list of pairs in ascending order(with respect to pairs), each pair [a, b] follows

// a, b are from arr
// a < b
// b - a equals to the minimum absolute difference of any two elements in arr

// --------------------------------------------------

// first I'd need to find the minimum absolute difference (mad), then I'd need to find pairs of numbers that, when subtracted, equal that number
// to get the mad, I'd need to find two numbers that are closest together within the array. It's unsorted and each number is unique so I'd potentially need to check every number against each other. Orrrr... sort the array and iterate through it, checking differences as I go.
// but that's mad only.
// to find pairs, I'd potentially need to compare every number to the number closest to it in value. If I were to sort the array, I could subtract i - 1 from i and push it to some set.
// perhaps I could record the current mad, check whether i - (i - 1) is lesser than or equal to the current mad. 
// if lower, reset the result array and push. if equal, just push.
// this makes the time O(nlogn), as the sort is the worst time. O(n) space for potentially pushing and resetting res array about 2n times.

const minimumAbsDifference = (arr: number[]): number[][] => {
    arr.sort((a, b) => a - b)
    let res: number[][] = []
    let mad = Infinity
    for (let i = 1; i < arr.length; i++) {
        let diff = Math.abs(arr[i] - arr[i - 1])
        if (diff < mad) {
            mad = diff
            if (res.length) res = []
        }
        if (diff === mad) res.push([arr[i - 1], arr[i]])
    }
    return res
}

console.log(minimumAbsDifference([4,2,1,3])) // [[1,2],[2,3],[3,4]]
console.log(minimumAbsDifference([1,3,6,10,15])) // [[1,3]]
console.log(minimumAbsDifference([3,8,-10,23,19,-4,-14,27])) // [[-14,-10],[19,23],[23,27]]