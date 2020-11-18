// https://leetcode.com/problems/design-an-ordered-stream/

// There are n (id, value) pairs, where id is an integer between 1 and n and value is a string. No two pairs have the same id.

// Design a stream that takes the n pairs in an arbitrary order, and returns the values over several calls in increasing order of their ids.

// Implement the OrderedStream class:

class OrderedStream {
  constructor(n) {
  // OrderedStream(int n) Constructs the stream to take n values and sets a current ptr to 1.
    this.stream = new Array(n)
    this.pointer = 0
  }
  insert(id, v) {
  // String[] insert(int id, String value) Stores the new (id, value) pair in the stream. After storing the pair:
  // If the stream has stored a pair with id = ptr, then find the longest contiguous incrementing sequence of ids starting with id = ptr and return a list of the values associated with those ids in order. Then, update ptr to the last id + 1.
  // Otherwise, return an empty list.
    // assign value to appropriate spot
    this.stream[id - 1] = v
    // array for our values
    const vals = []
    if (id - 1 === this.pointer) {
      // return the longest contiguous incrementing sequence of ids, return the list of values associated
      // easy enough to loop through until we find an empty/undefined spot and combine all truthy values found
      while (this.stream[this.pointer] !== undefined) {
        vals.push(this.stream[this.pointer++])
      }
    }
    return vals
  }
}

const os = new OrderedStream(5)
console.log(os.insert(3, "ccccc"))
console.log(os.insert(1, "aaaaa"))
console.log(os.insert(2, "bbbbb"))
console.log(os.insert(5, "eeeee"))
console.log(os.insert(4, "ddddd"))