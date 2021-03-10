// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/589/week-2-march-8th-march-14th/3667/

// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

// I can be placed before V (5) and X (10) to make 4 and 9. 
// X can be placed before L (50) and C (100) to make 40 and 90. 
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given an integer, convert it to a roman numeral.

// ----------------------------------------------

// this seems like a problem that could easily devolve into a lot of conditionals
// although if I were thinking like someone who knew these numbers as my base numeric system, used them on a daily basis, etc, I'd have them easily accessible. For this it'll be a dictionary object
// number position is important, so I could convert the number to a string.
// how many groups of numbers to be aware of: 1-3, 4, 5-8, 9
// to find numbers with the right base of 10, I can use a number and bitwise right shift it with every iteration through the stringified number


const intToRoman = (n: number): string => {
    const rn = { 1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M' }
    const s = n.toString()
    let place = 1
    let res = ''
    for (let i = s.length - 1; i >= 0; i--) {
        let x = +(place.toString(2))
        if (+s[i] < 4) res = rn[1 * x].repeat(s[i]) + res
        else if (s[i] === '4') res = rn[1 * x] + rn[5 * x] + res
        else if (s[i] === '9') res = rn[1 * x] + rn[10 * x] + res
        else {
            res = rn[5 * x] + rn[1 * x].repeat(+s[i] - 5) + res
        }
        place <<= 1
    }
    return res
}

// O(length of number * 3) in this case it'd be a max of like 12 iterations.

console.log(intToRoman(3)) // III
console.log(intToRoman(4)) // IV
console.log(intToRoman(58)) // LVIII
console.log(intToRoman(1994)) // MCMXCIV