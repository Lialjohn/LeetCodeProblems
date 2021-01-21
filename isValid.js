// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3610/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.

//-----------------------------------------

// left parentheses must always come before right parentheses, so it makes sense to count them.
// I can use a stack to count different parens, and every time a right parens comes up, it will need to match whatever's on top of the stack. If it matches, pop the last parens off the stack and continue on, if not answer must be false.
// better yet I can put the different types of parens into an object to avoid 100 if else statements.
// O(n) space and time

const isValid = s => {
    const parens = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    const stack = []
    for (const p of s) {
        if (!(p in parens)) stack.push(p)
        else {
            let popped = stack.pop()
            if (popped !== parens[p]) return false
        }
    }
    return stack.length === 0
}

console.log(isValid("()")) // true
console.log(isValid("()[]{}")) // true
console.log(isValid("(}")) // false
console.log(isValid("([)]")) // false
console.log(isValid("{[]}")) // true