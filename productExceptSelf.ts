// https://leetcode.com/problems/product-of-array-except-self/

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

// ------------------------------------------------------------

// can be solved in O(1) space complexity. Result array doesn't count, which, idk you might as well say O(n) rather than O(1)
// so each res element i needs to be every element in the array nums multiplied together, sans the current element. That means the time complexity has to be at the very least, n. I don't love that there are arbitrary restrictions on operations but w/e.
// If I could divide, I'd take the total product and divide by current element, with exceptions for zeroes. blarg.
// two passes? what we want are the products of everything to the left of curr and everything to the right of curr.
// Without worrying about space I'd have two sets of prefix products, starting from opposite sides of nums, and res[i] would be leftToRight[i - 1] * rightToLeft[i + 1].

const productExceptSelf = (nums:number[]): number[] => {
    const res = [], left = [], right = []
    for (let i = 0; i < nums.length; i++) left[i] = nums[i] * (left[i - 1] ?? 1)
    for (let j = nums.length - 1; j >= 0; j--) right[j] = nums[j] * (right[j + 1] ?? 1)
    for (let k = 0; k < nums.length; k++) res[k] = (left[k - 1] ?? 1) * (right[k + 1] ?? 1)
    return res
}

// worrying about space, I need to do the same thing with just one array but also keep track of products on either side.
// I want to record one set of products first, starting with left to right, in res. these products will later have to be multiplied with products starting from right to left.
// if that's the case, the first element should be 1. as res[0] will equal res[1] to res[n-1]. I can use a separate variable to keep track of product from left to right, starting at 1.
// so res[0] will equal 1, res[1] will equal nums[0], and each following element of res will be res[i] * res[i - 1]. in other words, each res element will be the product of all nums elements on the left side of the current index of nums
// another variable starting from 1 will keep track of products from the right side in another loop going from right to left. res[n - 1] will be multiplied by a new variable, starting at 1. This variable will go 1 -> nums[n-1] -> (nums[n-1]*nums[n-2]) etc, etc, keeping track of products of nums elements on the right side of the current element.
// multiply this variable with each element in res will get me right side of element * left side of element

const productExceptSelfOpt = (nums:number[]): number[] => {
    const res = []
    let left = 1, right = 1
    for (let i = 0; i < nums.length; i++) {
        res[i] = left
        left *= nums[i]
    }
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= right
        right *= nums[i]
    }
    return res
}

console.log(productExceptSelfOpt([1,2,3,4])) // 24, 12, 8, 6
console.log(productExceptSelfOpt([-1,1,0,-3,3])) // 0, 0, 9, 0, 0