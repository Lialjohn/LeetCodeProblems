// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3637/

// Given a non-negative integer num, return the number of steps to reduce it to zero. If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.

// --------------------------------------------------------------

// ok.. if the number is odd, subtract 1 and if the number is even divide by 2.

const numberOfSteps = (num: number): number => {
    if (num === 0) return 0
    if (num % 2 === 1) return numberOfSteps(num - 1) + 1
    return numberOfSteps(num / 2) + 1
}

// That's simple enough. time would be about logn + odds, space O(1).

console.log(numberOfSteps(14)) // 6
console.log(numberOfSteps(8)) // 4
console.log(numberOfSteps(123)) // 12