// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3591/

// Suppose you have n integers from 1 to n. We define a beautiful arrangement as an array that is constructed by these n numbers successfully if one of the following is true for the ith position (1 <= i <= n) in this array:

// The number at the ith position is divisible by i.
// i is divisible by the number at the ith position.
// Given an integer n, return the number of the beautiful arrangements that you can construct.
// ------------------------------------------

// I was all: divide by zero, whaa? but it seems 0 doesn't exist even as i in this problem
// i starts at 1, and n goes to 15 max.
// only 1 of the things has to be true.
// I know I have n numbers which are unique.
// I suppose I should find all possible correct matches for each number. The numbers with the fewest matches will be larger primes like 11 and 13, whereas 1 could be swapped with any number.
// this is a permutation problem --> good thinking, self. oi.
// I can make a new array and simply swap like any other perm problem, but halting iterations where the rule isn't working.

const countArrangement = n => {
    const a = Array.from({length: n}, (_, i) => i + 1)
    let count = 0
    const findPermutations = num => {
        // if num has reached a.length, it's gone through all of one set of swaps, so permutations + 1
        if (num === a.length) count++
        // swap the element at index num with every element that comes after it. Loop through, make the swap with each one, do a recursive call, and then swap back so that the next iteration
        // the first permutation will be the default one. the first loops always swaps the element at a[num] with itself
        for (let i = num; i < a.length; i++) {
            console.log('e: ', a[num],'num: ', num)
            ;[a[i], a[num]] = [a[num], a[i]] // swap
            // check if the current swap is valid. if y, continue finding permutations, else just swap back and move on
            if (!(a[num] % (num + 1)) || !((num + 1) % a[num])) {
                findPermutations(num + 1)
            }
            ;[a[i], a[num]] = [a[num], a[i]] // swap back for the next iteration of the loop
        }
    }
    findPermutations(0)
    return count
}

// O(n!) oof

// console.log(countArrangement(1)) // 1
console.log(countArrangement(2)) // 2
console.log(countArrangement(5)) // 10 
console.log(countArrangement(7)) // 41