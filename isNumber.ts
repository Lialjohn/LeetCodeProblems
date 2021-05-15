// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/600/week-3-may-15th-may-21st/3744/

// A valid number can be split up into these components (in order):

// A decimal number or an integer.
// (Optional) An 'e' or 'E', followed by an integer.
// A decimal number can be split up into these components (in order):

// (Optional) A sign character (either '+' or '-').
// One of the following formats:
// At least one digit, followed by a dot '.'.
// At least one digit, followed by a dot '.', followed by at least one digit.
// A dot '.', followed by at least one digit.
// An integer can be split up into these components (in order):

// (Optional) A sign character (either '+' or '-').
// At least one digit.
// For example, all the following are valid numbers: ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"], while the following are not valid numbers: ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].

// Given a string s, return true if s is a valid number.

// ---------------------------------------------------------------

// invalid numbers seem to be anything with invalid numbers or symbols in it. the pass rate for this problem is less than 20% I'm scared :')
// still, they give a list of validity rules to follow so that'll help. this seems like a lil bit like the regex type problems
// can check for + or - at the start or directly after an e/E
// aside from those two opt symbols, check whether the characters in between are valid decimals or ints. if and e/E is encountered, check for a second int.
// then again there're built in methods specifically for parsing strings and turning them into numbers so
// time for isNaN()
// I got it wrong because I forgot about Infinity oof

const isNumberMethods = (s: string): boolean => {
    if (s.endsWith('Infinity')) return false
    return !Number.isNaN(Number(s))
}

// alternatively I can use switches and do checks for every condition while iterating through the string.
// check: 
// if there's a +/- symbol at the front.
// if there's a floating point present
// if e/E is present
// if there's a +/- symbol directly after e/E
// if a number is present

const isNumber = (s: string) => {
    let hasPoint = false
    let hasNumber = false
    let hasE = false
    let hasSign = false
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= '0' && s[i] <= '9') {
            hasNumber = true
        } else if ((s[i] === '+' || s[i] === '-') && (!hasSign || !hasPoint || !hasNumber)) {
            hasSign = true
        } else if (s[i] === 'e' || s[i] === 'E') {
            hasE = true
            hasSign = false
            hasNumber = false
            hasPoint = false
        } else if (s[i] === '.' && (!hasE || !hasPoint)) {
            hasPoint = true
        }
        else return false
    }
    return hasNumber
}

console.log(isNumber('+Infinity')) //false
// console.log(isNumberMethods('+Infinity')) //false
console.log(isNumber('0')) // true
// console.log(isNumberMethods('0')) // true
console.log(isNumber('2e')) // false
// console.log(isNumberMethods('2e')) // false
console.log(isNumber('.')) // false
// console.log(isNumberMethods('.')) // false
console.log(isNumber('.1')) // true
// console.log(isNumberMethods('.1')) // true