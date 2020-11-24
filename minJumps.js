// https://leetcode.com/problems/minimum-jumps-to-reach-home/

// A certain bug's home is on the x-axis at direction x. Help them get there from direction 0.

// The bug jumps according to the following rules:

//     It can jump exactly a directions forward (to the right).
//     It can jump exactly b directions backward (to the left).
//     It cannot jump backward twice in a row.
//     It cannot jump to any forbidden directions.

// The bug may jump forward beyond its home, but it cannot jump to directions numbered with negative integers.

// Given an array of integers forbidden, where forbidden[i] means that the bug cannot jump to the direction forbidden[i], and integers a, b, and x, return the minimum number of jumps needed for the bug to reach its home. If there is no possible sequence of jumps that lands the bug on direction x, return -1.
// -----------------------------
// the hint says to think of the path like a graph, which makes sense as there's only a certain number of... numbers, that I can reach
// values increment by forward jump but also the difference between forward - backward 
// so forward 15 backward 13 values would be:
// 0, 15, 30, 45, 60, 75, 90,
//     2, 17, 32, 47, 62, 77,
//         4, 19, 34, 49, 64,
//             6, 21, 36, 51, 
// etc.

// I can investigate every possible number by queueing them up - if I start with 0 I can queue 15, but not -13 because it's < 0. I iterate to 15 and then queue 30 and 2. I get to 30 and then queue 45 and 17, etc.
// I can use a counter to keep track of the number of jumps
// will have to make checks in the forbidden array each time, to cut off those routes. How to do that without having to check through an entire array every iteration???
// need to stop at a certain point. lower bound is anything < 0, upper bound is home + forward + backward, since you can only go backwards once at a tim
// will also need some kind of visited ds so that I don't go in circles with potential repeating numbers in the pattern.

// I can't increment the jump counter with each of these iterations because that counts all possible jumps instead of the shortest path jumps, so I'll need to iterate a different way
// If I split forward and backwards jumps into seperate loops and keep track of the direction in a seperate variable, the jump count could be made accurate

const minimumJumps = (forbidden, forward, backward, home) => {
  // need to keep track of whether we just did a backwards jump or not. true = backwards, false = forwards
  let queue = [[0, false]]
  const visited = {}
  const max = Math.max(home, Math.max(...forbidden)) + forward + backward
  let jumps = 0
  // stick the forbidden numbers in visited because either way we can't visit them and checking an object is better than having to use includes()
  for (let n of forbidden) {
    visited[n] = true
  }
  while (queue.length) {
    // need to use the same items in queue for both forward & backward loops, so a new array with the new pairs will swap with queue after each while iteration
    const next = []
    for (let elem of queue) {
      let element = elem[0]
      if (element === home) return jumps
      // currentPos: what number we're at after the jump
      let currentPos = element + forward
      if (!visited[currentPos] && currentPos <= max) {
        next.push([currentPos, false])
        visited[currentPos] = true
      }
    }
    for (let [element, direction] of queue) {
      if (element === home) return jumps
      let currentPos = element - backward
      if (!visited[currentPos] && !direction && currentPos >= 0) {
        next.push([currentPos, true])
        visited[currentPos] = true
      }
    }
    queue = next
    jumps++
  }
  return -1
}

console.log(minimumJumps([8,3,16,6,12,20], 15, 13, 11)) // -1
console.log(minimumJumps([14,4,18,1,15], 3, 15, 9)) // 3
console.log(minimumJumps([1,6,2,14,5,17,4], 16, 9, 7)) // 2
console.log(minimumJumps([14,4,18,1,15], 7, 4, 50)) // 15
console.log(minimumJumps([162,118,178,152,167,100,40,74,199,186,26,73,200,127,30,124,193,84,184,36,103,149,153,9,54,154,133,95,45,198,79,157,64,122,59,71,48,177,82,35,14,176,16,108,111,6,168,31,134,164,136,72,98], 29, 98, 80)) // 121