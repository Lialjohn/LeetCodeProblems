// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/586/week-3-february-15th-february-21st/3642/

// Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.

// Return a list of all possible strings we could create. You can return the output in any order.

// -----------------------------------------------------

// let's see, the number of total perms should be the number of letters ** 2
// the strings always have to be in the same order as the original
// since there are separate 'paths' to take it seems natural to use recursion
// I'll make a helper function that takes the current index of s and a new string that's being built. if the current character is alphabetical, I'll call the function 2 times for each version of it. if not, I can just call it the once. Once the new string is s.length, I can push it to an array in the outer function.

const letterCasePermutations = (s: string): string[] => {
    const perms: string[] = []
    const build = (i: number, newStr: string): void => {
        if (i === s.length) {
            perms.push(newStr)
        } else {
            const c = s.charCodeAt(i)
            if ((c > 64 && c < 91) || (c > 96 && c < 123)) {
                build(i + 1, newStr + s[i].toLowerCase())
                build(i + 1, newStr + s[i].toUpperCase())
            } else build(i + 1, newStr + s[i])
        }
    }
    build(0, '')
    return perms
}

// worst case time and space is O(n^2), due to, again, the number of possible permutations for a given string.

console.log(letterCasePermutations("a1b2"))
console.log(letterCasePermutations("3z4"))
console.log(letterCasePermutations("12345"))
console.log(letterCasePermutations("C"))