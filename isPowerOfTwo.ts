// https://leetcode.com/problems/power-of-two/

// Given an integer n, return true if it is a power of two. Otherwise, return false.

// An integer n is a power of two, if there exists an integer x such that n == 2x.

// ---------------------------------------

// extra challenge is to solve without loops or recursion, which I have to assume includes related in-built methods
// I might be able to use bit operations for this, but I'll save that for last.
// Any number that's a power of 2 will appear in binary as a 1 and possibly followed by a bunch of zeroes. So say I remove all zeroes at the tail end, I'll always end up with a single 1. 
// but does toString and replace violate the no loops rule? uhh almost definitely not
// also the n & (n - 1) trick. 

const isPowerOfTwo = (n: number): boolean => {
    let b = n.toString(2).replace(/0+/, '')
    return b === '1'
}

const isPowerOfTwoTwo = (n: number): boolean => {
    while (n % 2 === 0) n /= 2
    return n === 1
}

const isPowerOfTwoThree = (n: number): boolean => {
    console.log(n.toString(2))
    return n > 0 && ((n & (n-1)) === 0)
}

// console.log(isPowerOfTwoThree(1)) // true
// console.log(isPowerOfTwoThree(16)) // true
console.log(isPowerOfTwoThree(3)) // false
console.log(isPowerOfTwoThree(7)) // false
console.log(isPowerOfTwoThree(12)) // false