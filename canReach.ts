// https://leetcode.com/problems/jump-game-iii/

// Given an array of non-negative integers arr, you are initially positioned at start index of the array. When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach to any index with value 0.

// Notice that you can not jump outside of the array at any time.

// ------------------------------------------

// seems a bit like a graph in the way that arr[i] points to other indices. a simple search with memoization comes to mind first.
// start will be current index we're at. if arr[curr] === 0, stop iterations and return true. if not, I'd need to check two different indices, curr + arr[curr] and curr - arr[curr]
// I could push both of these to a stack and check each one in a while loop, ending when the stack is empty. This way it'll be O(n) time at worst, since popping is cheap, and best case I'll skip right over potentially impossible to reach indices. 
// Memoization will keep me from getting stuck in any potential loops or following paths more than once

const canReach = (arr: number[], start: number): boolean => {
    let memo = {}
    let stack = [start]
    while (stack.length) {
        let curr = stack.pop()
        if (arr[curr] === 0) return true
        // if not, push two more options to stack. Also need to memoize, so check if those two new indices are in memo
        // if I wanted to make this more compact I could also push out-of-bounds indices to the stack and only check whether they're valid when they're popped. 
        let right = curr + arr[curr] < arr.length ? curr + arr[curr] : null
        let left = curr - arr[curr] >= 0 ? curr - arr[curr] : null
        if (right && !memo[right]) {
            stack.push(right) 
            memo[right] = true
        }
        if (left && !memo[left]) {
            stack.push(left)
            memo[left] = true
        }
    }
    return false
}

const canReachCompact = (arr: number[], start: number): boolean => {
    let memo = {}
    let stack = [start]
    while (stack.length) {
        let curr = stack.pop()
        if (curr < 0 || curr > arr.length - 1 || memo[curr]) continue
        if (arr[curr] === 0) return true
        memo[curr] = true
        stack.push(curr + arr[curr]) 
        stack.push(curr - arr[curr])
    }
    return false
}

console.log(canReachCompact([4,2,3,0,3,1,2], 5)) // true
console.log(canReachCompact([4,2,3,0,3,1,2], 0)) // true
console.log(canReachCompact([3,0,2,1,2], 2)) // false
console.log(canReachCompact([3,0,1,2], 0)) // true