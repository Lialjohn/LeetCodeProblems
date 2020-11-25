// https://leetcode.com/problems/split-two-strings-to-make-palindrome/

// You are given two strings a and b of the same length. Choose an index and split both strings at the same index, splitting a into two strings: aprefix and asuffix where a = aprefix + asuffix, and splitting b into two strings: bprefix and bsuffix where b = bprefix + bsuffix. Check if aprefix + bsuffix or bprefix + asuffix forms a palindrome.

// When you split a string s into sprefix and ssuffix, either ssuffix or sprefix is allowed to be empty. For example, if s = "abc", then "" + "abc", "a" + "bc", "ab" + "c" , and "abc" + "" are valid splits.

// Return true if it is possible to form a palindrome string, otherwise return false.
// --------

// if either of the strings are already palindromes at the start, you can return true by combining an empty string with the palindrome string
// this one seems sort of straightforward: I'll need a palindrome checker which I can make by checking each letter at opposite ends for matches
// for the splitter, I can go through each index and split the strings before checking them. A bit brute force but I can work out something better afterwards

// yep it timed out :D so it needs to be more efficient for sure

const checkPalindromeFormationF = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    let a1 = a.slice(0, i)
    let a2 = a.slice(i)
    let b1 = b.slice(0, i)
    let b2 = b.slice(i)
    if (palCheck(a1, b2) || palCheck(b1, a2)) return true
  }
  return false
}

const palCheckF = str => {
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) return false
  }
  return true
}

// need to cut the string copying and combining, most liekly. not sure you can get less than O(n) with a palindrome check
// I can cut the nested loops if I check each string's suffix and prefix seperately, and then check the rest of each string for a second palindrome. Like in below example, a's end 'ef' and b's beginning 'fe' are palindrome but not at the right index to work. so I seperate out the rest of the string from point 2 to point a/b.length-3 and check those for palindrome

// I'll start with doing a check in order of a + b then b + a

const checkPalindromeFormation = (a, b) => {
  return firstCheck(a, b) || firstCheck(b, a)
}

// needed a helper function to swap. Checks the prefix of string a and suffix of string b for palindrome
firstCheck = (a, b) => {
  let i = 0
  let j = a.length - 1
  while (i < j && a[i] === b[j]) {
    i++
    j--
  }
  return secondCheck(a, i, j) || secondCheck(b, i, j)
}

// checks single word for palindrome, starting wherever i and j left off from firstCheck
const secondCheck = (str, i, j) => {
  while (i < j && str[i] === str[j]) {
    i++
    j--
  }
  // return true or false depending on if the pointers managed to meet each other
  return i >= j
}
console.log(checkPalindromeFormation("ulacfd", "jizalu"))
console.log(checkPalindromeFormation("xbdef", "xecab"))
console.log(checkPalindromeFormation("x", "y"))
console.log(checkPalindromeFormation("abdodef", "fecalab"))