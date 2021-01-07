// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3594/

// Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

// Find the kth positive integer that is missing from this array.

//-------------------------------

// trying this with simple iteration first
// since we're looking for the kth number, the number cannot be < k
// I can expect every number n, if they were in their proper place, to be at index n - 1. n - i = 1.
// to count how many numbers are missing between indices, n - i = d, and n - i - d = mn. If the difference is ever greater than 1, that'll mean I'm mission some numbers and it's just a matter of finding all the ones between the number at i and i - 1.
// since we're skipping numbers that can be changed to n - i - 
// so if 3 is at 0i, I'd get a discrepancy of 2 with 3-0-1, so 0 < n < 3 are missing, getting d up to 2. the equation would also change from n - i = 1 to n - i = 3
// continuing, let's say 5 is at 1i. 5-1-3 = 1. there's 1 number missing between 3 and 5. k++, and then n - i should equal 4, if there are no missing numbers. 

// O(n)
const findKthPositive = (a, k) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] - i - 1 >= k) {
            // once I reach a point where the number of missing numbers is -ge than k, I can add the current i to k to get the number
            return i + k
        }
    }
    // if the loop is exited, need to get the answer from where we left off. the final i + k
    return a.length + k
}

// since the array is sorted, the obvious way to improve it would be to stop looking through every element. binary search y'all.

// O(logn)
const findKthPositiveBS = (a, k) => {
    let start = 0
    let end = a.length - 1
    let mid
    while (start <= end) {
        mid = Math.floor((start + end) / 2)
        if (a[mid] - mid <= k) start = mid + 1
        else end = mid - 1
    }
    return start + k
}

console.log(findKthPositive([2,3,4,7,10], 5)) // 9
console.log(findKthPositive([1,2,3,4], 2)) // 6