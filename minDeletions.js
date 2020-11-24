// https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/

// A string s is called good if there are no two different characters in s that have the same frequency.

// Given a string s, return the minimum number of characters you need to delete to make s good.

// The frequency of a character in a string is the number of times it appears in the string. For example, in the string "aab", the frequency of 'a' is 2, while the frequency of 'b' is 1.


// lemme see
// the deletions will have to come from any character subset that shares the same frequency as another
// since we'll need frequencies, it makes sense that we need an object to hold the count for each one
// a simple but not super time/space efficient way to do it could be: make the freq map, go through each one and assign to an array index based on freq, if the index is occupied then increase a 'deletions' counter until I find an empty index or get to 0

const minDeletions = str => {
  const freqMap = {}
  const freqInd = []
  let deletions = 0
  for (let char of str) {
    freqMap[char] = freqMap[char] + 1 || 1
  }
  for (let char in freqMap) {
    let ind = freqMap[char]
    // while the index is occupied, delete until I find an unoccupied space
    // the && ind is so that I'm not unneccessarily placing a value at index 0
    while (freqInd[ind] && ind) {
      ind--
      deletions++
    }
    // if ind reached 0, skip the assignment
    if (!ind) continue
    // else assign that char to the index
    freqInd[ind] = char
  }
  return deletions
}

console.log(minDeletions("aaabbbcc"))
console.log(minDeletions("ceabaacb"))
console.log(minDeletions("aab"))

// accepted at leetcode, although I think the time/space could be better. right now n can only go up to 26, but assuming each has a freq of n, I'll be performing increasing operations (up to 25) on each iteration. Not quite n^2 but close.