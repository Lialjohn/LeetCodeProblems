// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/587/week-4-february-22nd-february-28th/3654/

// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

// Return the quotient after dividing dividend by divisor.

// The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

// Note:

// Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For this problem, assume that your function returns 231 − 1 when the division result overflows.

// -----------------------------------------------------

// divide without dividing :|
// could subtract the divisor from the dividend until I got < 0, then return the number of iterations. not a sophisticated solution but it's good to start somewhere

const divideWrongForSomeReason = (dividend: number, divisor: number): number => {
    if (!dividend) return 0
    if (dividend === -2147483648 && divisor === -1) return 2147483647 // extremely strange edge case
    // divisor can't be 0 for the test cases so I'm ignoring that
    let i = 0
    let a = Math.abs(dividend)
    const b = Math.abs(divisor)
    while (a - b >= 0) {
        a -= b
        i++
    }
    if ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)) i = -i
    return i
}

// I could understand a TLE but the test cases expect a weird return on a long int. No wonder this problem has over 6000 dislikes. I had to add in a unique return for that one bizarre edge case.
// well good to practice with bitwise ops anyway

const divide = (dividend: number, divisor: number): number => {
    if (!dividend) return 0
    if (dividend === -2147483648 && divisor === -1) return 2147483647  
    let res = 0
    let sign = 1
    if (dividend < 0) dividend = -dividend, sign = -sign
    if (divisor < 0) divisor = -divisor, sign = -sign
    for (let i = 0, val = divisor; dividend >= divisor; i = 0, val = divisor) {
        while (val > 0 && val <= dividend) val = divisor << ++i
        dividend -= divisor << i - 1, res += 1 << i - 1
    }
    return sign < 0 ? -res : res
}

console.log(divide(10, 3)) // 3
console.log(divide(7, -3)) // -2
console.log(divide(-7, 3)) // -2
console.log(divide(-2147483648, -1)) // 2147483647 ??????? wat