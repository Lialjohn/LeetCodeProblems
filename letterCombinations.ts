// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3701/

// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// ------------------------------------------------------------

// a perm problem. first I need a reference to get each set of letters corresponding to each number. map!
// I can iterate through each number's letters one at a time, since only one of them will be used in each result string. so make a helper function that iterates through each set and makes a recursive call to itself for the next set of letters. when each word is as long as it can get (digits.length), end the recursion.

const letterCombinations = (digits: string): string[] => {
    if (!digits) return []
    const letters = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    const res = []
    const perm = (n: number, s: string): void => {
        if (n === digits.length) res.push(s)
        else {
            for (let i = 0; i < letters[digits[n]].length; i++) perm(n + 1, s + letters[digits[n]][i])
        }
    }
    perm(0, '')
    return res
}

// time and space O(4**n)

console.log(letterCombinations('23')) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations('5')) // [ 'j', 'k', 'l' ]
console.log(letterCombinations('')) // []