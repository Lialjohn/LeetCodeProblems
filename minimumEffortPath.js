// https://leetcode.com/problems/path-with-minimum-effort/
// You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

// A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

// Return the minimum effort required to travel from the top-left cell to the bottom-right cell.



// I'm taking minimum effort to mean that the less one would climb when moving to the next cell, the smaller the effort. the examples seem to indicate that if you have to climb 1 and 3 on one path, that would be worse than going up and down 2, 2, 2, and 2 on another (which is wierd but ok) because 3 vs 2

// because of the potential for paths to split and mislead me -- like I could follow a flat path until I get surrounded by cells of value n -- I'll need to compare all cells to the surrounding ones. Can keep track in a visited type matrix

// I can use a DS to collect surrounding values and find all paths this way. Placing the smallest potential values first so that I can get at those in order

// variables to possibly track: 
// - coords for finding each surrounding cell
// - the difference between each cell
// - minimum effort to each cell from start point

// seems like an excellent oppo for dijkstra lbr

// lazy PQ
class PQ {
  constructor() {
    this.vals = []
    this.length = 0
  }
  enqueue([row, col, effort]) {
    this.vals.push({ row, col, effort })
    this.sort()
    this.length++
  }
  dequeue() {
    this.length--
    return this.vals.shift()
  }
  sort() {
    this.vals.sort((a, b) => a.effort - b.effort)
  }
}

const minimumEffortPath = heights => {
  // need PQ, the matrix to hold efforts, and maybe a direction array
  const pq = new PQ
  const efforts = heights.map(row => row.map(col => Infinity))
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  // three vals being pushed to the PQ will be the coordinates being checked and the current minimum effort found for any path
  pq.enqueue([0, 0, 0])
  // efforts matrix will track minimum efforts to get from top left corner to each other cell. Top left will always be 0
  efforts[0][0] = 0
  while(pq.length) {
    let { row, col, effort } = pq.dequeue()
    // no more cells to compare at the bottom right, so return minimum effort
    if (row === heights.length - 1 && col === heights[0].length - 1) return effort
    for (let [x, y] of dirs) {
      let newRow = row + x
      let newCol = col + y
      // checking if we're in bounds before doing anything, otherwise skip
      if (newRow >= 0 && newRow <= heights.length - 1 && newCol >= 0 && newCol <= heights[0].length - 1) {
        // get the effort between two cells
        newEffort = Math.max(effort, Math.abs(heights[newRow][newCol] - heights[row][col]))
        // if that effort is < whatever's in the efforts matrix, replace it and queue those new coords. Most numbers are < infinity so that'll cover all new cells
        if (newEffort < efforts[newRow][newCol]) {
          efforts[newRow][newCol] = newEffort
          pq.enqueue([newRow, newCol, newEffort])
        }
      }
    }
  }
}

console.log(minimumEffortPath([[1,2,2],[3,8,2],[5,3,5]]))