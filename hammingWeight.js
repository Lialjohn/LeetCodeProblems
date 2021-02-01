// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3625/

// Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

// Note:

// Note that in some languages such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 3 above, the input represents the signed integer. -3.
// Follow up: If this function is called many times, how would you optimize it?
//The input must be a binary string of length 32

//------------------------------------------

// hamming wight is the number of 'on' bits in a binary number, cool info.
// could count the 1s of the number as a string but that's boring.
// again, I could also convert the number to a string, replace all the zeroes with empty strings, and then return the remaining length. replace() still makes it O(n) though.
// I think I need a better understanding of bitwise operators to optimize this so off to research I go.
// ok the expression n & (n - 1) is useful because n - 1 is only different from n in their smallest/least significant bit. 1111 -> 1110. the result is 1110. take that result and compare it again to n & (n - 1). 1110 -> 1101, the result is 1100. Each iteration removes 1 on bit from the number until I reach 0, and all I have to do is count the number of iterations.
// that didn't work because when numbers get too large, they're expressed with e notation and you have to subtract a more significant number than 1 to get a different representation. blagg. replace() it is then, blagg.
// oh wait it does work when I run it through the leetcode console. I need something to stop the numbers in node from being converted.

const hammingWeight = n => {
    let count = 0
    while (n !== 0) {
        count++
        n = n & (n - 1)
    }
    return count
}

// time O(ones)/O(n)

console.log(hammingWeight(00000000000000000000000000001011)) // 3
console.log(hammingWeight(00000000000000000000000010000000)) // 1
console.log(hammingWeight(11111111111111111111111111111101)) // 31 waah