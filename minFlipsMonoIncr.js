// https://leetcode.com/problems/flip-string-to-monotone-increasing/

// A string of '0's and '1's is monotone increasing if it consists of some number of '0's (possibly 0), followed by some number of '1's (also possibly 0.)

// We are given a string S of '0's and '1's, and we may flip any '0' to a '1' or a '1' to a '0'.

// Return the minimum number of flips to make S monotone increasing.


// so valid monotone sequences include 000111, 011111, and 000000
// I could go through the string until I find a one and then count everything that comes after
// Because zeroes are supposed to go first, we can ignore them until we find that 1
// then start counting ones and zeroes seperately
// ehh although zeroes doesn't have to be zeroes, since we're not simply comparing the number of each after the first occurance of 1. if the number of ones becomes greater than the number of zeroes but some of those ones are at the end and therefore totally valid, that would mess up the count
// so instead, if the count of zeroes becomes greater than the count of ones (after that first 1), it would make more sense to sort of reset the zeroes count - call it a flips count? - to the smaller number, which would be the ones. Then go on counting the rest of the string


const minFlipsMonoIncr = str => {
  if (typeof str !== 'string') return 0
  let ones = 0
  let flips = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      // only increment flips when ones has a non-zero int
      if (ones) {
        flips++
      }
    } else ones++
    if (flips > ones) {
      flips = ones
    }
  }
  return flips
}

// this passes all of the test cases on leetcode but fails with something like 1110111, HMMM
// the problem is that it's counting all 1s as valid in certain cases. 111111 returns 0 which is a bummer