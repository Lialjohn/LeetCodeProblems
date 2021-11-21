// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/601/week-4-may-22nd-may-28th/3756/

// A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.

// Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.

// ----------------------------------------------------------

// the number of deci-binary numbers needed for any num is equal to the highest digit present in the string. Binary numbers are comprised of 1s and 0s, but there's no limit to how long they can be for this challenge, or how many 1s or 0s are in each, according to the rules. so you're allowed to tailor the numbers according to how many you'd need. The only thing holding you back is having to add up to a particular digit one by one... so, largest digit up to & including 9.
// ez O(n)

const minPartitions = (n: string): number => {
    let min = '0'
    for (let num of n) {
        if (num > min) min = num
    }
    return +min
}

console.log(minPartitions('32')) // 3
console.log(minPartitions('82734')) // 8
console.log(minPartitions('27346209830709182346')) // 9