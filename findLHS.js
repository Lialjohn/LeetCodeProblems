// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3628/

// We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.

// Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

// A subsequence of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

// /--------------------------------------------------------

// I need to find the greatest number of numbers that are just 1 away from each other.
// If I sort the array, I'd have adjacent numbers right next to each other. I could use 2 pointers to count. sort would give it an nlogn time though.
// I could also count the numbers in a map, then go through the map. for each element found, check if its adjacent elements exist. If y, add them togther and check the result against the current champion. if n move on to the next. that would be O(n+m) where m is the number of unique elements in the array, worst being O(2n). space would be... O(m)

const findLHS = nums => {
    const seen = new Map
    let most = 0
    for (let n of nums) {
        seen.set(n, seen.get(n) + 1 || 1)
    }
    for (let n of seen.keys()) {
        if (seen.get(n + 1)) most = Math.max(most, seen.get(n) + seen.get(n + 1))
        if (seen.get(n - 1)) most = Math.max(most, seen.get(n) + seen.get(n - 1))
    }
    return most
}

// this is faster than most other js submissions. looks like other people went for the sort method :O

console.log(findLHS([1,3,2,2,5,2,3,7])) // 5
console.log(findLHS([1,3,5,7,9,11,13,15,17])) // 0
console.log(findLHS([1,2,3,4])) // 2
console.log(findLHS([1,1,1,1])) // 0