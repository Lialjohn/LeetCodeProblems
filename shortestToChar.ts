// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3631/

// Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the shortest distance from s[i] to the character c in s.

// -------------------------------------------------------

// position has to be relative to the nearest target char.
// If I use a pointer, I'll need to be aware of whichever two target characters I'm in between and calculate accordingly.
// I'll try three pointers. One will search for target characters. Once found, the second will iterate through the rest of the characters starting at 0. I can push to a res array the Math.min(next target position - current position, prev target pos + curr pos). 
// once the current pointer reaches the target pointer, the target pointer will move on in search of another target.
// if next reaches the end of input, then next will be set to prev.
// time for this is O(3n) because of indexOf() and I'm iterating through the array with the char pointer as well as the... all-other-chars pointer. Space is O(n) because of the res array.

const shortestToChar = (s: string, c: string): number[] => {
    let prev: number = s.length
    let next: number = s.indexOf(c)
    const res: number[] = []
    for (let i = 0; i < s.length; i++) {
        res.push(Math.min(Math.abs(next - i), Math.abs(prev - i)))
        if (s[i] === c) {
            prev = next++
            while(s[next] && s[next] !== c) next++
            if (next === s.length) next = prev
        }
    }
    return res
}

console.log(shortestToChar('loveleetcode', 'e')) // [3,2,1,0,1,0,0,1,2,2,1,0]
console.log(shortestToChar('aaab', 'b')) // [3,2,1,0]