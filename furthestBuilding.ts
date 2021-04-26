// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/596/week-4-april-22nd-april-28th/3721/

// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

// While moving from building i to building i+1 (0-indexed),

// If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
// If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

// --------------------------------------------------------

// ladders should definitely be used for the greatest heights, bricks for all else.
// it makes sense to iterate through heights, use bricks until I run out, then start swapping bricks according to greatest encountered height with ladders. I can use a max heap for getting those heights.
// so start iterating. If i + 1 is less or equal to i, do nothing. if it's greater than, add it to the heap. subtract the difference between the two heights from bricks. if bricks becomes negative, extract a height from max heap, add that number of bricks back, and subtract a ladder. Gotta use a while loop in case this needs to be done multiple times. 
// if the number of ladders is zero and bricks are still in the negative, return current index. If I iterate through all indices, return the length of heights - 1 at the end.

class MaxHeap {
    values: number[]
    constructor() {
      this.values = []
    }
    insert(v) {
      this.values.push(v)
      this.bubble()
      return this
    }
    bubble() {
      // take new node an compare it to its parent
      // then swap
      // keep doing that until the new node is no longer greater than its parent
      let child = this.values.length - 1
      let parent = Math.floor((child - 1) / 2)
      while (this.values[parent] < this.values[child]) {
        let temp = this.values[parent]
        this.values[parent] = this.values[child]
        this.values[child] = temp
        child = parent
        parent = Math.floor((child - 1) / 2)
      }
    }
    remove() {
      // remove the top level element
      // replace with most recent element and adjust
      const v = this.values
      ;[v[0], v[v.length - 1]] = [v[v.length - 1], v[0]]
      const popped = v.pop()
      this.sink()
      return popped
    }
    sink() {
      const v = this.values
      let parentIdx = 0
      let childIdx = 2 * parentIdx + 1
      // makes sure children aren't out of bounds
      // swap with the largest child
      // if the parent value is larger than either existing child value
      while (v[parentIdx] <= v[childIdx] || v[parentIdx] <= v[childIdx + 1]) {
        // if there's a right child and it's larger than the left child, increase idx
        if (v[childIdx + 1] !== undefined && v[childIdx + 1] > v[childIdx]) {
          childIdx++
        }
        // now do the adjustments
        ;[v[childIdx], v[parentIdx]] = [v[parentIdx], v[childIdx]]
        parentIdx = childIdx
        childIdx = 2 * parentIdx + 1
      }
    }
}

const furthestBuilding = (heights: number[], bricks: number, ladders: number): number => {
    const heap = new MaxHeap
    for (let i = 0; i < heights.length - 1; i++) {
        const diff = heights[i + 1] - heights[i]
        if (diff > 0) {
            heap.insert(diff)
            bricks -= diff
            if (bricks < 0 && ladders) {
                bricks += heap.remove()
                ladders--
            }
            if (ladders === 0 && bricks < 0) return i
        }
    }
    return heights.length - 1
}

console.log(furthestBuilding([4,2,7,6,9,14,12], 5, 1)) // 4
console.log(furthestBuilding([4,12,2,7,3,18,20,3,19], 10, 2)) // 7
console.log(furthestBuilding([14,3,19,3], 17, 0)) // 3
console.log(furthestBuilding([4,2,7,6,9,14,12,40,20,13,28,29,30], 0, 6)) // 11