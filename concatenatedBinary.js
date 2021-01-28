// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/582/week-4-january-22nd-january-28th/3618/

// Given an integer n, return the decimal value of the binary string formed by concatenating the binary representations of 1 to n in order, modulo 10**9 + 7.
//------------------------------------------------

// n can go up to 10**5 oof
// so because these binary strings can get so long, js will end up interpreting them as infinity. Have to prevent the numbers from getting too big.
// distributive property means that (a + b) % (10**9 + 7) === (a % (10**9 + 7)) + (b % (10**9 + 7)) % (10**9 + 7) which could be useful
// a brute force approach would just be to actually concat the strings and do the division, or even just add the appropriate powers of 2 together, but I don't think that would fly with the larger numbers.
// there's a pattern to the values of these concatenated numbers. if I multiply the number at each step of concatenation with the length of the result number and add the new number, I get the next number without having to actually convert anything to binary or concat strings.
// the length will be the number of bits needed to accommodate the newly concatenated bits.

// I needed some help on this because I'm not super familiar with bitwise operators-- it was fun to learn what left and right shift operators were though :D

const concatenatedBinary = n => {
    let mod = 10**9 + 7
    let num = 1
    let l = 4 // after 1, minimum new bits needed is 2, so start at 4 (100)
    for (let i = 2; i <= n; i++) {
        // if i reaches a power of 2, shift l to the next power of 2
        if (i === l) l <<= 1
        // then do the math. new num will be old num * the number of new bits needed in a power of 2 + the current number.
        // also don't forget the mod
        num = (num * l + i) % mod
    }
    return num
}


console.log(concatenatedBinary(1)) // 1
console.log(concatenatedBinary(3)) // 27
console.log(concatenatedBinary(12)) // 505379714
console.log(concatenatedBinary(30)) // 754521863
console.log(concatenatedBinary(300)) // 163231064