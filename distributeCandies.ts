// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3657/

// Alice has n candies, where the ith candy is of type candyType[i]. Alice noticed that she started to gain weight, so she visited a doctor.

// The doctor advised Alice to only eat n / 2 of the candies she has (n is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor's advice.

// Given the integer array candyType of length n, return the maximum number of different types of candies she can eat if she only eats n / 2 of them.

// -----------------------------------------------------------------

// seems like the problem requires filtering of duplicates. Since I'm looking for types of candies and not overall number of candies, I could divide the length first first (n always 2) and then make a new set to filter out dupes. if the length of the set is smaller than n/2, use that instead. if not, then there are enough unique candies to hit the ceiling number of n/2.

const distributeCandies = (candyTypes: number[]): number => {
    const n = candyTypes.length / 2
    const candies = new Set(candyTypes)
    return n > candies.size ? candies.size : n
}

// making the new set makes this O(n) on time and space.
// instead of making the set I could also use candyTypes.filter((v, i) => candyTypes.indexOf(v) === i) but that's so much slower. 

console.log(distributeCandies([1,1,2,2,3,3])) // 3
console.log(distributeCandies([1,1,2,3])) // 2
console.log(distributeCandies([6,6,6,6])) // 1