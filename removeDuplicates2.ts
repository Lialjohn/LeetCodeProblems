// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/595/week-3-april-15th-april-21st/3710/

// Given a string s, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them causing the left and the right side of the deleted substring to concatenate together.

// We repeatedly make k duplicate removals on s until we no longer can.

// Return the final string after all such duplicate removals have been made.

// It is guaranteed that the answer is unique.

// ------------------------------------------------

// well, any letter than numbers below k is safe.
// a stack seems like it would be pretty great for this problem. I can't just take strings out one at a time and wait to see what other dupes I get if they're concatenated, because that would eat a lot of time. If I build up the string via a stack, I can remove any strings of duplicates as they appear. it would take O(2n) at most since I'm adding and then removing each element at most once.
// so make a stack, iterate through the string and check if the last k elements are dupes.
// biggest problem with this: how to tell if I've got a string of dupes if I remove one set and end up creating another by doing so. I suppose I could just count backwards, and keep a variable with how long the last sequence is. So every time I remove a set of dupes, pick up the previous letter's count. so that means I'd be keeping track of the current letter count and all previous letter counts. 
// what if I had another stack for counts? every time a letter changes, push a new count to the stack. When I remove a dupe set, the count gets popped off the stack as well. Or alternatively, keep a variable for count and only push and reset count when the letter changes.


const removeDuplicates = (s: string, k: number): string => {
    const stack = []
    const counts = []
    for (let i = 0, count = 1; i < s.length; i++) {
        // push a count to counts if letters change.
        if (i && stack[stack.length - 1] !== s[i]) {
            counts.push(count)
            count = 1
        } 
        stack.push(s[i])
        if (stack[stack.length - 1] === stack[stack.length - 2]) count++
        // if the current letter is the same as the previous, increase the count
        // if I find a set of letter dupes that === k, remove them from stack, pop a count from counts
        if (count === k) {
            for (let j = k; j > 0; j--) stack.pop()
            count = counts.pop() ?? 1
        }
    }
    return stack.join('')
}

console.log(removeDuplicates('abcd', 2)) // 'abcd'
console.log(removeDuplicates("deeedbbcccbdaa", 3)) // aa
console.log(removeDuplicates("pbbcggttciiippooaais", 2)) // ps