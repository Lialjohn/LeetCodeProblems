// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/593/week-1-april-1st-april-7th/3695/

// Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

// -------------------------------------------------------

// I've apparently solved this one before, but I remember absolutely nothing about it! So I'll push it to github again, woo.
// So I need to iterate through the string, check for validity, then check the length of each valid parens when they reset or the iteration ends against some variable.
// parens are valid if I find a right parens for each left parens, and stop being valid when there are more right parens than left parens. when they become invalid, the count will be compared against the highest count so far and then reset for the next found left parens.
// the tricky part for me is telling apart the valid parens from the potentially valid parens, and how to count adjacent valid parens together.
// if I imagine the parens as numbers, it seems easier to add up points. lets say each time I find a right parens, I check for a left. if there are lefts, that right and left become a point each. If each time I find a left parens, I add its index to a stack, I can easily change the most recent left to a 1. the right also becomes a 1. I move through the string/array, changing the parens like that.
// At the end, I can go through the modified string looking for adjacent numbers. If I encounter a parens, I know I've reached the end of the valid parens and can compare the count with the highest count found so far.
// that would put the time at O(3n) and space at O(2n)ish

const longestValidParens1 = (s :string): number => {
    const arr: (string | number)[] = s.split("")
    const stack: number[] = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "(") stack.push(i)
        if (arr[i] === ")" && stack.length) {
            const j = stack.pop()
            arr[j] = 1
            arr[i] = 1
        }
    }
    let highest = 0
    let curr = 0
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'number') curr++
        else curr = 0
        highest = Math.max(curr, highest)
    }
    return highest
}

// it works but I think it could definitely be shaved down a bit. Changing to numbers seems arbitrary. I have a feeling I could do this without counting or going through that second loop at all. 

const longestValidParens = (s :string): number => {
    const stack: number[] = [-1] // first number is the i of the last invalid parens. Have gone through no indices yet so it's -1 to ensure the count down below is accurately reflected from the start. if the first two characters are () then the sum will be 1 - -1, giving me a count of 2, ()() will be 3 - -1 for 4, etc.
    let highest = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") stack.push(i)
        else {
            // remove most recently added i. ensures the count is always an even number.
            stack.pop()
            // if there's still something left in the stack, compare the current highest to i - last item index in stack. else push the current i to stack to be the end point of the last invalid parens.
            if (stack.length) {
                highest = Math.max(highest, i - stack[stack.length - 1])
            } else stack.push(i)
        }
    }
    return highest
}

console.log(longestValidParens("(()(())")) // 6
console.log(longestValidParens(")())()(()(")) // 2
console.log(longestValidParens(")()())")) // 4
console.log(longestValidParens("")) // 0