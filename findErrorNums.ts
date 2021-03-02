// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3658/

// You have a set of integers s, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, one of the numbers in s got duplicated to another number in the set, which results in repetition of one number and loss of another number.

// You are given an integer array nums representing the data status of this set after the error.

// Find the number that occurs twice and the number that is missing and return them in the form of an array.

// ---------------------------------------------------------------

// numbers don't have to be in order
// I have to find a number that occurs more than once as well as the number that doesn't occur at all between 1 through n.
// could sort it and then return the number that doesn't match their index, but that's nlogn time and I think I could do this in less
// could run through the array keeping count in another array. the one that ends up being more than 1 is the dupe number. Then I run through the second array looking for the index that's undefined. that would give me the missing number at a time of O(2n), but space would also be at O(n)
// alternatively I could get the sum for 1 through n, find the dupe, and then find the missing number through the dupe + number missing from the sum. Still O(n) overall in time and space though. 

const findErrorNums = (nums: number[]): number[] => {
    const ans: number[] = [0,0]
    const counts: number[] = Array(nums.length + 1).fill(0)
    for (let n of nums) {
        counts[n]++
    }
    for (let i = 1; i <= counts.length; i++) {
        if (counts[i] > 1) ans[0] = i
        if (counts[i] === 0) ans[1] = i
    }
    return ans
}

console.log(findErrorNums([1,2,2,4])) // [2,3]
console.log(findErrorNums([1,1])) // [1,2]
console.log(findErrorNums([1,5,2,4,3,3])) // [3,6]