// https://leetcode.com/problems/distant-barcodes/

// In a warehouse, there is a row of barcodes, where the ith barcode is barcodes[i].

// Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any answer, and it is guaranteed an answer exists.
// -----------------------------------------

// wow description so tiny
// seems like there are invalid inputs you can give, after testing on the site. You need the number of most common elements to, at the very most, be the same as the sum of all the others. You can't input something like [1,1,1,1,2,2] but [1,1,1,1,2,2,3,3] is fine. If there's no possible way to avoid two of the same element touching, it's invalid. I don't know what should be returned upon invalid input but I'm guessing the test cases just don't give invalid input.

// PQ? I figure if I go through and count each value, I can arrange them via priority. First instances will be priority 1 and arranged that way, second instances with priority 2 etc.
// although if I do something like that when the numbers have different counters I'll end up with something like 12312311

// in order to keep same elements from touching, I can split them up by # of occurences = freq
// the highest freq will either have some other element with the same freq or other freqs will add up to it. Those elements can then be combined and inserted into a new array
// I'll combine the largest freq first. anything leftover from the larger freqs can be combined with smaller ones
// I can use a heap to keep the values organized by freq...
// I'll need both the frequency number and the relevant value, so I guess I'll be using a PQ after all

class Node {
  constructor(value, freq) {
    this.value = value
    this.freq = freq
  }
}

class PQ {
  constructor() {
    this.values = []
  }
  insert(v, f) {
    const node = new Node(v, f)
    this.values.push(node)
    if (this.values.length !== 1) this.bubble()
    return this
  }
  bubble() {
    // take new node an compare it to its parent
    // then swap
    // keep doing that until the new node is no longer greater than its parent
    let child = this.values.length - 1
    let parent = Math.floor((child - 1) / 2)
    // console.log(child, parent)
    // console.log(this.values[child], this.values[parent])
    while (this.values[parent].freq < this.values[child].freq) {
      let temp = this.values[parent]
      this.values[parent] = this.values[child]
      this.values[child] = temp
      child = parent
      parent = Math.floor((child - 1) / 2)
      if (parent < 0) break
    }
  }
  sink() {
    const v = this.values
    let parentIdx = 0
    let childIdx = 2 * parentIdx + 1
    // makes sure children aren't out of bounds
    // swap with the largest child
    // if the parent value is larger than either existing child value
    while (
      (v[childIdx] !== undefined &&
      v[parentIdx].freq <= v[childIdx].freq) ||
      (v[childIdx + 1] !== undefined &&
      v[parentIdx].freq <= v[childIdx + 1].freq)
      ){
      // if there's a right child and it's larger than the left child, increase idx
      if (v[childIdx + 1] !== undefined && v[childIdx + 1].freq > v[childIdx].freq) {
        childIdx++
      }
      // now do the adjustments
      ;[v[childIdx], v[parentIdx]] = [v[parentIdx], v[childIdx]]
      parentIdx = childIdx
      childIdx = 2 * parentIdx + 1
    }
  }
  swap() {
    const v = this.values
    ;[v[0], v[1]] = [v[1], v[0]]
  }
}

const rearrangeBarcodes = barcodes => {
  const pq = new PQ
  // create freq counter
  const counters = {}
  for (let elem of barcodes) counters[elem] = counters[elem] + 1 || 1
  // put them in the pq
  for (let elem in counters) pq.insert(elem, counters[elem])
  const stack = []
  // the while iterates on the top values freq - it will only be 0 when all element frequencies are 0
  while (pq.values[0].freq) {
    // if the last added stack element is the same as the current PQ element, swap the current element with the second most freqent so the values stay organized
    if (stack[stack.length - 1] === pq.values[0].value) pq.swap()
    // push the current value to the stack, reduce it's frequency, and adjust the PQ
    stack.push(pq.values[0].value)
    pq.values[0].freq--
    pq.sink()
  }
  return stack
}

// inserting the elements would by O(nlogn). The while/sinking would probably be about the same - worst case will have every frequency be the same, so that when the top is reduced it'll travel all the way to the back on every iteration. so nlogn overall

console.log(rearrangeBarcodes([1,1,2])) //[1,2,1]
console.log(rearrangeBarcodes([7,7,7,8,5,7,5,5,5,8])) //[5,7,5,7,5,7,5,8,7,8]
console.log(rearrangeBarcodes([1,1,1,2,2,2])) //[2,1,2,1,2,1]
console.log(rearrangeBarcodes([1,1,1,1,2,2,3,3])) // [1,3,1,3,1,2,1,2]
console.log(rearrangeBarcodes([1,1,1,1, 2,2,2,2, 3,3, 4,4, 5,5, 6, 7])) // [2,3,2,3,2,4,2,4,1,5,1,5,1,6,1,7]
console.log(rearrangeBarcodes([1,1,1, 2,2,2,2, 3,3, 4,4, 5,5, 6,7])) // [2,3,2,4,2,4,2,5,1,5,1,6,1,7,3]
console.log(rearrangeBarcodes([1,1,1,1, 2,2,2,2, 3,3,3,3, 4,4,4,4, 5,5,5,5, 6,6,6,6, 7,7,7,7]))