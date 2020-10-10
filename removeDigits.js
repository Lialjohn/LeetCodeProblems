// Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible. 
// https://leetcode.com/problems/remove-k-digits/

// input: string num, number k

// it makes sense to remove the largest numbers from the front end of the number
// I might possibly need to find all permutations to find the smallest number possible though, but that'll be terrible big O
// numbers in front of a zero near the start could be removed for extra effect ex: k = 1, num = 104, final = 4

// ex: 1234, k = 1
// remove 4 for 123
// k = 2
// remove 34 for 12
// 4321 would be 321 and 21
// I'll try removing the largest numbers furthest to the front. If I rebuild the number/string I can compare neighboring elements one by one pretty easily
// decrementing k will let me keep track of when to stop removing numbers

function removeDigits(num, k) {
  let stack = []
  for (let i = 0; i < num.length; i++) {
    let last = stack.length - 1
    if (!stack.length || stack[last] <= num[i] || k === 0) stack.push(num[i])
    else if (stack[last] > num[i] || stack[last] === 0) {
      stack.pop()
      k--
      i--
    }
  }
  // if the largest numbers are at the end, k will still be above 0. Knock off any leftovers
  while (k > 0) {
    stack.pop()
    k--
  }
  // and also remove zeros
  stack = stack.join('') || 0
  return Number(stack).toString()
}

console.log(removeDigits('10200', 1))

//this doesn't quite get it because I get infinity for large numbers, but I'll work on it more later