// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/581/week-3-january-15th-january-21st/3606/

// Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

//-------------------------------------------------------------

// I think the easiest way to do this would be to just sort it and get the index at k - 1. O(nlogn)

const findKthLargestLZ = (a, k) => {
    a.sort((a,b) => b-a)
    return a[k - 1]
}

// but that probably goes against the spirit of the problem so
// Without it being sorted, I can only know if I've found the largest number by checking all numbers in the array. perhaps I can keep a sorted second array that's k -1 elements long, and sort it as I go through a. An easy, not-space-efficient way to keep it sorted will be to use a[i] as indices. that would give me O(n + k + highest number)

const findKthLargest2 = (a, k) => {
    let nums = []
    for (let n of a) {
        nums[n] = nums[n] + 1 || 1
    }
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === undefined) continue
        k -= nums[i]
        if (k <= 0) return i
    }
    return -1
}

// I could also use a heap, although the time won't be much better at O(nlogn)

class MinHeap {
    constructor() {
        this.values = []
        this.length = 0
    }
    insert(v) {
        this.values.push(v)
        this.bubble()
        this.length++
        return this
    }
    bubble() {
        const vals = this.values
        let child = vals.length - 1
        let parent = Math.floor((child - 1)/2)
        while (vals[child] < vals[parent]) {
            ;[vals[child], vals[parent]] = [vals[parent], vals[child]]
            child = parent
            parent = Math.floor((child - 1)/2)
        }
    }
    remove() {
        const vals = this.values
        ;[vals[0], vals[vals.length-1]] = [vals[vals.length-1], vals[0]]
        const popped = vals.pop() 
        this.sink()
        this.length--
        return popped
    }
    sink() {
        const vals = this.values
        let parent = 0
        let child = 1
        while (vals[child] < vals[parent] || vals[child + 1] < vals[parent]) {
            if (vals[child + 1] < vals[child]) child++
            ;[vals[child], vals[parent]] = [vals[parent], vals[child]]
            parent = child
            child = (parent * 2) + 1
        }
    }
}

findKthLargestWithHeap = (a, k) => {
    if (k > a.length) return -1
    const heap = new MinHeap
    // put all elements into the heap
    for (let e of a) {
        heap.insert(e)
    }
    // remove elements until I get a heap size of k. return the next popped element
    while(heap.length > k) heap.remove()
    return heap.remove()
}

// looking at other people's solutions, I'm just learning about something called quickselect that looks interesting :O 
// If I understand this correctly, it uses the idea behind quicksort in that it finds a pivot point and splits the array up into a left(less than) and right(greater than) portion based on that pivot. Instead of sorting both sides, sort only one side and look to sort the index where the kth largest element would naturally be in a sorted array, length - k.

const findKthLargest = (a, k) => {
    return quickSelect(a, a.length - k, 0, a.length - 1) ?? -1
}

const quickSelect = (a, k, left, right) => {
    // k here is the index that we're trying to find. 
    // partition() will return an index with a sorted element. if that index/element is less than k, call quickselect on the right side of it. If greater, call quickselect on the left side.
    if (left === right) return a[left]
    let pivot = partition(a, left, right)
    if (pivot === k) return a[pivot]
    if (pivot < k) return quickSelect(a, k, pivot + 1, right)
    else return quickSelect(a, k, left, pivot - 1)
}

const partition = (a, left, right) => {
    // pick the pivot
    let pivotInd = Math.floor((left + right) / 2) 
    // need to move the pivot element into its correct, sorted index. swap the elements at left and pivot so that pivot is on the leftmost side
    ;[a[pivotInd], a[left]] = [a[left], a[pivotInd]]
    pivotInd = left
    let pivot = a[pivotInd]
    // now move elements into their proper sides to the right of the pivot index.
    for (let i = left + 1; i <= right; i++) {
        // if the current element is less than pivot, swap current element and ++pivotInd
        if (a[i] < pivot) {
            pivotInd++
            ;[a[i], a[pivotInd]] = [a[pivotInd], a[i]]
        }
    }
    // swap the starting pivot element with the one at its found index
    ;[a[pivotInd], a[left]] = [a[left], a[pivotInd]]
    return pivotInd
}

console.log(findKthLargest([1], 1)) // 1
console.log(findKthLargest([3,2,1,5,6,4], 2)) // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)) // 4