// https://leetcode.com/problems/zigzag-conversion/

// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R

// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

// ok, so we're conerting one string to another
// the new string is sorted according to a zigzag pattern, presented visually
// so I gotta figure out how to convert that visual pattern into a numerical one
// ex: if there's 4 rows
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// so string that are 1-2 characters long will always be returned as they are, chnages only occur at 3+
// simplest solution that immediately comes to mind: create a 2d matrix, place the letters inside, and reconstruct the string
// use a variable that indicates the direction in which they're being placed

const convert = (str, rows) => {
  if (str.length <= 2 || rows <= 1) return str
  const matrix = Array.from({length: rows}, _ => [])
  let j = 0
  let dir = true
  for (let i = 0; i < str.length; i++) {
    matrix[j].push(str[i])
    if (j === rows - 1) dir = false
    if (j === 0) dir = true
    if (dir) j++
    else j--
  }
  return matrix.flat().join('')
}

console.log(convert('paypalishiring', 4))

// it works but it could use some improvement most likely with time O(n) and space O(n)