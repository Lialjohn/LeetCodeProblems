// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3609/

// Given a string s, return the longest palindromic substring in s.

//-------------------------------------------------------------------

// s can include digits and lower/uppercase letters
// I have to think about how I'm going to find multiple palindromes, and then how to extract them to return.
// 4 pointers is where my mind goes right away. 2 to go through the string checking every letter for character matches and another 2 to check for palindrome when a character match is found. O(n^2) for the first two, O(2x) for the second. bah.

const longestPalindrome4p = s => {
    let longest = ''
    for (let i = 0; i < s.length - longest.length; i++) {
        for (let j = s.length - 1; j >= i; j--) {
            let x = i
            let y = j
            if (s[i] === s[j]) {
                while (s[x] === s[y]) {
                    if (x >= y) {
                        let newStr = s.slice(i, j + 1)
                        if (newStr.length > longest.length) longest = newStr
                        break
                    } else {
                        x++
                        y--
                    }
                }
            }
        }
    }
    return longest
}

// But I could cut that down to three pointers if I start from the center of each potential palindrome outward. I move along the array and on each character, use another loop to send pointers in either direction to check for matches.

const longestPalindrome = s => {
    if (s.length <= 1) return s
    // go through each index, then move two pointers away
    let longest = [0,1] // end index for longest substring
    for (let i = 0; i < s.length; i++) {
        let left = i
        let right = i
        while (left > 0 && s[left - 1] === s[i]) left--
        while (right < s.length && s[right + 1] === s[i]) right++
        while (s[left] === s[right] && left >= 0 && right < s.length) {
            if ((right + 1) - left > longest[1] - longest[0]) longest = [left, right + 1]
            left--
            right++
        }
        
    }
    return (s.slice(longest[0], longest[1]))
}

// still O(n^2). taking down the indices and only slicing at return is much better though.

console.log(longestPalindrome('babad')) // bab or aba
console.log(longestPalindrome('cbbd')) // bb
console.log(longestPalindrome('ababa ababa ababa')) // ababa ababa ababa
console.log(longestPalindrome('ac')) // a