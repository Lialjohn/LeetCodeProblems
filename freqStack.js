// https://leetcode.com/problems/maximum-frequency-stack/

// Implement FreqStack, a class which simulates the operation of a stack-like data structure.

// FreqStack has two functions:

// push(int x), which pushes an integer x onto the stack.
// pop(), which removes and returns the most frequent element in the stack.
// If there is a tie for most frequent element, the element closest to the top of the stack is removed and returned.
 
// Example 1:

// Input: 
// ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
// [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
// Output: [null,null,null,null,null,null,null,5,7,5,4]
// Explanation:
// After making six .push operations, the stack is [5,7,5,7,4,5] from bottom to top.  Then:

// pop() -> returns 5, as 5 is the most frequent.
// The stack becomes [5,7,5,7,4].

// pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
// The stack becomes [5,7,5,4].

// pop() -> returns 5.
// The stack becomes [5,7,4].

// pop() -> returns 4.
// The stack becomes [5,7].
 

// Note:

// Calls to FreqStack.push(int x) will be such that 0 <= x <= 10^9.
// It is guaranteed that FreqStack.pop() won't be called if the stack has zero elements.
// The total number of FreqStack.push calls will not exceed 10000 in a single test case.
// The total number of FreqStack.pop calls will not exceed 10000 in a single test case.
// The total number of FreqStack.push and FreqStack.pop calls will not exceed 150000 across all test cases.
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// so this is a stack-like data structure. Instead of pure FIFO, the element near the top of the stack that appears most frequently is what gets popped first
// if you got [1, 2, 2, 3, 4, 5], that second 2 would be popped first and then 5, 4, 3 like normal

class FreqStack2 {
  constructor() {
    //keys are indices
    this.container = {}
    //keys are values
    this.freqMap = {}
    this.length = 0
  }
  //set key of new element to length of this and then ++
  push(v) {
    this.freqMap[v] = this.freqMap[v] + 1 || 1
    this.container[this.length++] = { value: v, freq: this.freqMap[v] }
  }
  pop() {
    //find most frequent element
    let freq = 0
    let e = null
    for (let element in this.container) {
      //if the counter for the element is greater than the highest recorded frequency, replace it and grab the element in e
      if (this.container[element].freq >= freq) {
        //I could probably reduce this down to one variable but I already wrote them...
        freq = this.container[element].freq
        e = element
      }
    }
    //save the popped element
    const popped = this.container[e]
    //reduce the counter in freqMap
    this.freqMap[popped.value]--
    //delete if counter is at zero 'cause why even have it anymore
    if (!this.freqMap[popped.value]) delete this.freqMap[popped.value]
    while (parseInt(e) !== this.length - 1) {
      //need to go through each number above n and reassign the values until e is the last index
      this.container[e] = this.container[++e]
    }
    delete this.container[this.length - 1]
    //reduce length overall
    this.length--
    return popped.value
  }
}

// above works but is really inefficient. Refactor time.
// identify where a lot of time is being taken: most definitely pop
// specifically where I look for highest counter and the reassignment of keys to values
// keeping track of an index probably isn't necessary. The only relevant index in a stack is the last one
// If I make the container a bit easier to search that could help a lot with time
// an array would be good because push/pop is so cheap
// arrays to hold values and what frequency they occur at and another array to hold those?

class FreqStack {
  constructor() {
    // holds values based on frequency, with indices - 1 representing frequencies holding array elements with relevant values
    this.container = []
    // easy lookup for values and their corresponding frequencies.
    this.freqMap = {}
  }
  push(v) {
    // store the value in freqMap with a frequency of 1 or, if it already exists, frequency + 1
    this.freqMap[v] = this.freqMap[v] + 1 || 1
    // make a new array for a frequency if it doesn't exist yet, and store the value in it
    if (this.container.length < this.freqMap[v]) this.container.push([v])
    // else just store the value at the appropriate index
    else this.container[this.freqMap[v] - 1].push(v)
  }
  pop() {
    // get the last out element at the highest index of container; where we know the most recent, highest frequency value is
    const popped = this.container[this.container.length - 1].pop()
    // lose the container element if it's empty
    if (!this.container[this.container.length - 1].length) this.container.pop()
    // edit the frequency value in freqMap, too 
    this.freqMap[popped]--
    // delete the freqMap key if the value is 0
    if (!this.freqMap[popped]) delete this.freqMap[popped]
    // return relevant element
    return popped
  }
}

// woo, big improvement :D

 let obj = new FreqStack()
 obj.push(11)
 obj.push(12)
 obj.push(12)
 obj.push(16)
 obj.push(16)
 obj.push(100)

 console.log(obj.pop())
 console.log(obj.pop())
 console.log(obj.pop())
 console.log(obj.pop())
 console.log(obj)