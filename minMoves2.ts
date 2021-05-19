// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/600/week-3-may-15th-may-21st/3748/

// Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

// In one move, you can increment or decrement an element of the array by 1.

// -------------------------------------------------------

// it would be really helpful if I could find a target number that all elements will eventually average out to. I don't think just trying out all numbers in between then smallest and largest numbers would would considering nums can be 10^5 and each element is between -10^9 and 10^9. So how do I find the magic number
// ideally one number wouldn't change at all
//  I could try averaging the numbers and comparing nums from there. Problem is I wouldn't know when to stop
// averaging seems only work when the numbers are evenly apart
// perhaps handle numbers 1 at a time. the difference between 1 and 10 is 9. the next number 2 is 8 away from 10 and 1 away from 1 so the number stays at 9. 9 is 7 away from 2 which gives a total 0f 16
// I do think it'd be helpful to sort the numbers first. Numbers in the first half of the array are change to the higher number being compared whereas numbers in the second half are changed down
// by doing that, the result is always that the numbers end up as whatever number is in the middle of the array. That simplifies things: add to count whatever the difference is between the current number and the middle number
// time O(nlogn) because of sort, space O(1)

const minMoves2 = (nums: number[]): number => {
    nums.sort((a,b) => a - b)
    let count = 0
    const l = Math.floor(nums.length/2)
    for (let i = 0; i < nums.length; i++) {
        count += (Math.abs(nums[i] - nums[l]))
    }
    return count
}

console.log(minMoves2([1,2,3])) // 2
console.log(minMoves2([1,10,2,9])) // 16
console.log(minMoves2([1,2,3,10])) // 10
console.log(minMoves2([1,2,3,18,7,11,10])) // 33