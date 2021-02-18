// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/586/week-3-february-15th-february-21st/3644/

// A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

// For example, these are arithmetic sequences:

// 1, 3, 5, 7, 9
// 7, 7, 7, 7
// 3, -1, -5, -9

// The following sequence is not arithmetic.

// 1, 1, 2, 5, 7
 
// A zero-indexed array A consisting of N numbers is given. A slice of that array is any pair of integers (P, Q) such that 0 <= P < Q < N.

// A slice (P, Q) of the array A is called arithmetic if the sequence:
// A[P], A[P + 1], ..., A[Q - 1], A[Q] is arithmetic. In particular, this means that P + 1 < Q.

// The function should return the number of arithmetic slices in the array A.

// -----------------------------------------------------------

// elements can be part of more than 1 slice
// getting the differences is the first thing to think about. I could make a new array to store the differences between a[i] and a[i + 1] and work with that. any 2 consecutive duplicate values would indicate a slice and I could add to the count for every additional dupe.
// say I have the sequence 12345. 123 would add 1 to the count. 1234 adds 2. 12345 adds 3 for a total of 6. every extra consecutive slice adds 1 to the amount that count needs to be increased.
// so let's say I iterate through the array, checking the differences between i and i + 1. I could keep an extra variable that keeps track of how many dupes I've found. Like I found 1 arithmetic slice, increase that by 1. add it to the count. found another one, increase it again and add it to count. when the difference is not the same as the previous, that variable goes back to zero. I'll call it roll, cause... I'd be on a roll :D
// that would be O(n) time and O(1) space.

const numberOfArithmeticSlices = (a: number[]): number => {
    let count = 0
    let roll = 1
    for (let i = 2; i < a.length; i++) {
        if (a[i] - a[i - 1] === a[i - 1] - a[i - 2]) count += roll++
        else roll = 1
    }
    return count
}

console.log(numberOfArithmeticSlices([1,2,3,4])) // 3
console.log(numberOfArithmeticSlices([1,3,5,7,9])) // 6
console.log(numberOfArithmeticSlices([1,3,5,7,10,13])) // 4