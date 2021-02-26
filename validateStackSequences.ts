// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/587/week-4-february-22nd-february-28th/3653/

// Given two sequences pushed and popped with distinct values, return true if and only if this could have been the result of a sequence of push and pop operations on an initially empty stack.

// -----------------------------------------------------------

// so no number that's been pushed before a second number (also pushed) cannot show up in popped before that second number.
// I could actually make the stack. Start pushing from pushed. each push checked against the first element in popped: does this element get popped right away? if false, continue pushing. if true, pop.
// if the last element in the stack !== the current element in popped and there's nothing left to push, then I know I've got a false. If the iterations are able to finish, I've got true.

const validateStackSequences = (pushed: number[], popped: number[]): boolean => {
    let i = 1
    let j = 0
    const stack = [pushed[0]]
    while (j < popped.length) {
        // check elements against each other. if they're equal, increment j and pop off stack
        if (stack[stack.length - 1] === popped[j]) {
            stack.pop()
            j++
        }
        else if (i > pushed.length) return false
        else stack.push(pushed[i++])
    }
    return true
}

// O(n + m)

console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1])) // true
console.log(validateStackSequences([1,2,3,4,5], [4,5,3,1,2])) // false
console.log(validateStackSequences([], [])) // true