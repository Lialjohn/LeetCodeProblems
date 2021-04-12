// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3705/

// Given two integers n and k, you need to construct a list which contains n different positive integers ranging from 1 to n and obeys the following requirement:
// Suppose this list is [a1, a2, a3, ... , an], then the list [|a1 - a2|, |a2 - a3|, |a3 - a4|, ... , |an-1 - an|] has exactly k distinct integers.

// If there are multiple answers, print any of them.

// ---------------------------------------------------------------------

// I'm at a loss here. The requirement is that I suppose I have two different lists... how do these interact to form the final list? Am I missing something?
// I had to look at the discussion boards D: the list k is supposed to be distinct differences between list n numbers
// I could start with a list 1 to k + 1 and arrange those as needed, then fill up the rest of the array with the remaining numbers in n.
// the largest difference will be k, so 1 will always be next to k+1. following this logic, 2 will always be next to k, 3 next to k-1, and so on. A pattern is there.
// so I'll start to iterate and for the first k + 1 numbers, I'll alternate 1, k+1, 2, k, 3, k-1, etc.,incrementing one number and decrementing another by turn. Then fill the rest of the array from k+1 to n.
// time and space O(n) ez

const constructArray = (n:number, k: number): number[] => {
    const list: number[] = Array(n).fill(0)
    k++
    for (let i = 0, j = k, x = 1; i < n; i++) {
        if (i >= k) list[i] = i + 1
        else list[i] = (i % 2 === 0) ? x++ : j--
    }
    return list
}

console.log(constructArray(2, 1)) // [1,2]
console.log(constructArray(3, 1)) // [1,2,3]
console.log(constructArray(3, 2)) // [1,3,2]
console.log(constructArray(16,14)) // [1,15,2,14,3,13,4,12,5,11,6,10,7,9,8,16]