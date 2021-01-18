// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3605/

// You are given an integer n. An array nums of length n + 1 is generated in the following way:

// nums[0] = 0
// nums[1] = 1
// nums[2 * i] = nums[i] when 2 <= 2 * i <= n
// nums[2 * i + 1] = nums[i] + nums[i + 1] when 2 <= 2 * i + 1 <= n
// Return the maximum integer in the array nums​​​.

//-----------------------------

// it seems like an easy O(n) solution would be to simply build the array and save the highest found sum as I go.

const getMaximumGenerated = n => {
    if (n <= 1) return n
    let a = [0, 1]
    let max = 0
    for (let i = 2; i <= n; i++) {
        let j = Math.floor(i/2)
        let res = i % 2 === 0 ? a[j] : a[j] + a[j + 1]
        a.push(res)
        max = Math.max(max, res)
    }
    return max
}

// yep, v simple.

console.log(getMaximumGenerated(7)) // 3
console.log(getMaximumGenerated(1)) // 1
console.log(getMaximumGenerated(3)) // 2
console.log(getMaximumGenerated(95)) // 21