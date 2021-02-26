// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/586/week-3-february-15th-february-21st/3645/

// Given a string s of '(' , ')' and lowercase English characters. 

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.

// --------------------------------------------------------------------------------

// potentially all parens could be invalid and I'd have to remove all of them.
// I think I can do this by rebuilding the string 2 times. I go through it once checking for left parens. every left parens is added in, but excess right parens are left out. The second time will be from last to first character, doing the same but with right parens. all right parens are counted, excess lefts are out.

const minRemoveToMakeValid1 = (s: string): string => {
    let lefts = 0
    let rights = 0
    let str = ''
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ')' && !lefts) continue
        if (s[i] === '(') lefts++
        if (s[i] === ')' ) lefts--
        str += s[i]
    }
    s = str
    str = ''
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(' && !rights) continue
        if (s[i] === ')') rights++
        if (s[i] === '(' ) rights--
        str = s[i] + str
    }
    return str
}

// so many if statements though
// could also use a stack to check parens. Split the original string into an array, removing the invalid parens at their indices, and then returning the joined string array.

const minRemoveToMakeValid = (s: string): string => {
    const stack = []
    const sArr = s.split('')
    // get rid of excess rights by replacing them with ''
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] === '(') stack.push(i)
        else if (sArr[i] === ')') {
            if (stack.length) stack.pop()
            else sArr[i] = ''
        }
    }
    // then get rid of excess lefts
    while (stack.length) sArr[stack.pop()] = ''
    return sArr.join('')
}

// Both of these round to O(n), although I think the stack solution is a little bit cleaner

console.log(minRemoveToMakeValid("lee(t(c)o)de)")) // lee(t(c)o)de
console.log(minRemoveToMakeValid("a)b(c)d")) // ab(c)d
console.log(minRemoveToMakeValid("))((")) // ''
console.log(minRemoveToMakeValid("(a(b(c)d)")) // a(b(c)d)