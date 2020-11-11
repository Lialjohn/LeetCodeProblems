// https://leetcode.com/problems/word-search/

// Given a 2D board and a word, find if the word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// board and word consists only of lowercase and uppercase English letters.
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// 1 <= word.length <= 10^3

// seems like the board could only have 1 cell so have to account for that edge case
// first thought is to search through the arrays for the first letter. If found, search the surrounding cells for the next and so on
// I'll need a 'visited' variable so that I don't accidentally go in circles
// since I really need to keep track of two variables per node, it'll be more of a visited matrix
// once a set of coords in the board matches the first letter, collect surrounding node coords so we can neatly check each one
// if I do this recursively I can keep a record of the word's index... only problem is that the visited matrix will get messed up, as rejected paths will stay labeled as true
// so I'll need to do some kind of reset every time I get a failed path


const pathSearch = (board, word, row, col, visited) => {
  // if element doesn't match the current character in word
  if (!word.length) return true
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) return false
  if (board[row][col] !== word[0]) return false
  // if we're at the last word index and we pass the above test, we've found a matching pattern
  // mark as visited
  visited[row][col] = true
  // I didn't have this originally but after writing a bulky alternate version, I found this in someone else's solution and it's just so much more compact
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  for (const [x, y] of dirs) {
    const a = row + x
    const b = col + y
    if (a >= 0 && a < board.length && b >= 0 && b < board[0].length) {
      if (pathSearch(board, word.slice(1), row, col, visited)) return true
    }
  }
  visited[row][col] = false
  return false
}

const wordSearch = (board, word) => {
  const visited = board.map(row => row.map(element => element = false))
  // need to check each element in the 2d array, bring on the nested for loop
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (pathSearch(board, word, i, j, visited)) return true
    }
  }
  return false
}

const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]

console.log(wordSearch(board, "SEE"))

// needs cleanup!