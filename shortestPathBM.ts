// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3638/

// In an N by N square grid, each cell is either empty (0) or blocked (1).

// A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:

// Adjacent cells C_i and C_{i+1} are connected 8-directionally (ie., they are different and share an edge or corner)
// C_1 is at location (0, 0) (ie. has value grid[0][0])
// C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])
// If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
// Return the length of the shortest such clear path from top-left to bottom-right.  If such a path does not exist, return -1.

// ---------------------------------------------------------

// my mind jumped to dijkstra's for this, but it's not necessary for a cells that are all a distance of 1 from each other and where the matrix length is <= 100. No need for the priority queue, anyway. a regular queue will do.
// also could make a copy matrix and use dp.
// use a queue to hold every set of adjacent coords for the current indices. if a set is blocked, toss them and move on to the next.
// need to record the number of cells traversed so far as well, sooo... I'll try including that with the coords in the queue. 
// I'll also need to keep a map for visited cells. I was thinking about comparing and replacing distances in this visited map but I realize that the first time the bottom right cell comes up will naturally be the shortest path anyway, so there's no need.
// I think it would be helpful to prioritize bottom right adjacent cells, other diagonal adjacent cells, and then bottom/right/left/up cells when queueing up. This would hopefully minimize retreading for this particular approach.
// make own queue for faster shifting.

class Q {
    list: object
    length: number
    head: number
    tail: number
    constructor() {
        this.list = {}
        this.head = 0
        this.tail = 0
        this.length = 0
    }
    push(v: number[]): void {
        this.list[this.tail++] = v
        this.length++
    }
    shift(): number[] | null {
        if (this.length <= 0) return null
        const shifted = this.list[this.head]
        delete this.list[this.head++]
        this.length--
        return shifted
    }
}

const shortestPathBinaryMatrix = (grid: number[][]): number => {
    // deal with edge cases that would potentially waste time
    if (grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) return -1
    // give queue the first set of coords and distance
    const queue = new Q
    queue.push([0,0,1])
    const dirs = [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[0,1],[0,-1],[-1,0]]
    const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(0))
    while(queue.length) {
        const [row, col, dist] = queue.shift()
        // check if this is the end
        if (row === grid.length - 1 && col === grid[0].length - 1) return dist
        // check visited for current coords. If it's already been visited, that means there's another, shorter path to it so there's no sense on continuing this one.
        if (visited[row][col] > 0) continue
        else visited[row][col] = dist
        for (const [x, y] of dirs) {
            let newRow = row + x
            let newCol = col + y
            // check if new coords are in bounds and has an unblocked value
            if (newRow >= 0 && newRow < grid[0].length && newCol >= 0 && newCol < grid.length && grid[newRow][newCol] === 0) {
                queue.push([newRow, newCol, dist + 1])
            }
        }
    }
    return -1
}

// worst case scenario here would probably be if I traveled a complicated path to the bottom right corner only for it to be walled off, so all other paths would also be explored. about half the cells would have be non-traversable. O(n * 8) thereabouts. space O(n).

console.log(shortestPathBinaryMatrix([[0,0,0], [1,1,0], [1,1,0]])) // 4
console.log(shortestPathBinaryMatrix([[0,1], [1,0]])) // 2
console.log(shortestPathBinaryMatrix([[1,0,0],[1,1,0],[1,1,0]])) // -1