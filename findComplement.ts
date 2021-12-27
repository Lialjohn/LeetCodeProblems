// https://leetcode.com/problems/number-complement/

// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer num, return its complement.

// ------------------------------------------------------

// you can flip a number's binary by using the bitwise NOT operator ~, but that converts to a negative number, which isn't what this problem is looking for, I don't think.
// easy brute force way: convert the number to binary string, build new number except for every '1' input a 0 and vice versa. convert back to number, return number.
// Should consider other bit operators first before doing something that clunky, though.
// left shift will ** 2 a number. right shift counts down by bits. xor takes two numbers and returns 1s where bits are either/or, and 0s when bits match up.
// for ex. If I xor 10101 ^ 11111 I'll get what I'm looking for: 1010. opposite number woo.

const findComplement = (num: number): number => {
    let c = 0
    let count = num
    while (count) {
        c <<= 1
        console.log(c.toString(2))
        c ^= 1 // turns the last bit just added with << to a 1
        count >>= 1 // counts down by number of bits in num
    }
    return c ^ num // xor num with a bunch of 1s so that it returns the opposite number
}

// console.log(findComplement(5)) // 2
// console.log(findComplement(1)) // 0
console.log(findComplement(178)) // 77