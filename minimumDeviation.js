// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/583/week-5-january-29th-january-31st/3622/

// You are given an array nums of n positive integers.

// You can perform two types of operations on any element of the array any number of times:

// If the element is even, divide it by 2.
// For example, if the array is [1,2,3,4], then you can do this operation on the last element, and the array will be [1,2,3,2].
// If the element is odd, multiply it by 2.
// For example, if the array is [1,2,3,4], then you can do this operation on the first element, and the array will be [2,2,3,4].
// The deviation of the array is the maximum difference between any two elements in the array.

// Return the minimum deviation the array can have after performing some number of operations.
// //----------------------------------------------------

// assuming I understand the question correctly, I'm looking for the largest difference between any two elements in the given array. I want to get the largest numbers as small as possible and the smallest numbers as close to matching those numbers without going over. I need to keep track of the largest and smallest elements.
// Although I have questions, like can I continue multiplying a number that started odd but is even once it's been multiplied once? Or can it only be divided at that point, can only be set as one of those two possibilities?
// after running some test cases it seems like that may be the case. So any odd number that can be multiplied can only do so once. Even numbers are a bit more flexible in that they can be any of their set of divisions, up until they divide into an odd number.
// I could multiply every odd number and find the highest possible number from the resulting set of evens. dividing all evens until they become odd would also give me the set of smallest numbers. So I've got one of these two (or both) possible sets to simplify things a bit.
// If I had the max values of all possible numbers, I would need to halve the largest number. Once that's halved I'd need to find and half the next largest number and so on, while checking the deviation each time.
// maybe I can use a heap... stash each number after it's been made as large as possible. if an even number comes out of the heap, halve it and put it back in. if an odd number pops out, remove it entirely because it can't get any smaller.
// I'd also need to keep track of the smallest number so I'll check for that while inserting elements into the heap and update it as I halve them.
// on second thought, end the loop when the max is an odd number. if I take the odd numbers out, then I'll just end up subtracting elements from themselves and get a minimum dev of 0 every time. when the largest number is odd, that means it's the smallest possible largest/maximum number anyway.

class MaxHeap {
    constructor() {
        this.values = []
        this.length = 0
    }
    insert(val) {
        this.values.push(val)
        this.length++
        this.bubble()
        return this
    }
    bubble() {
        const v = this.values
        let child = v.length - 1
        let parent = Math.floor((child - 1) / 2)
        while (v[child] > v[parent]) {
            ;[v[parent], v[child]] = [v[child], v[parent]]
            child = parent
            parent = Math.floor((child - 1) /2)
        }
    }
    sink() {
        const v = this.values
        let child = 1
        let parent = 0
        while (v[child] > v[parent] || v[child + 1] > v[parent]) {
            if (v[child] < v[child + 1]) child++
            ;[v[parent], v[child]] = [v[child], v[parent]]
            parent = child
            child = parent * 2 + 1
        }
    }
}

const minimumDeviation = nums => {
    const heap = new MaxHeap
    let small = Infinity
    // double all odd numbers while checking for the smallest number. insert them into the heap
    nums.forEach((v, i) => {
        if (v % 2 === 1) nums[i] *= 2
        small = Math.min(small, nums[i])
        heap.insert(nums[i])
    })
    // get first minimum deviation
    let md = heap.values[0] - small
    // loop until the largest element is an odd number
    while (heap.values[0] % 2 === 0) {
        // divide big and check if it's the new small. sink it. Check a new deviation with the new biggest and possibly new smallest numbers.
        heap.values[0] /= 2
        small = Math.min(small, heap.values[0])
        heap.sink()
        md = Math.min(md, heap.values[0] - small)
    }
    return md
}

// the time is not great but I don't think it can be avoided with a problem like this. inserting every element into the heap is nlogn. the min deviation loop would be a bit worse as each element could potentially be checked multiple times. so... m log n where m is the number of potential numbers before values[0] hits an odd number.

console.log(minimumDeviation([10,4,3])) // 2
console.log(minimumDeviation([4,1,5,20,3])) // 3
console.log(minimumDeviation([2,10,8])) // 3
console.log(minimumDeviation([103,94,33,42,7,18,19,44,23,11,93])) // 89
console.log(minimumDeviation([10,54,13,12,7,18,19,44,23,11,22])) // 17