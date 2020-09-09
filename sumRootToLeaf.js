// Given a binary tree, each node has value 0 or 1.  Each root-to-leaf path represents a binary number starting with the most significant bit.  For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
// For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.
// Return the sum of these numbers.

// https://leetcode.com/explore/challenge/card/september-leetcoding-challenge/555/week-2-september-8th-september-14th/3453/

//a tree to test on, based on the prompt's example
function node(val = 0, left = null, right = null) {
this.val = val
this.left = left
this.right = right
}

const tree = new node(1)
tree.left = new node(0)
tree.right = new node(1)
tree.left.left = new node(0)
tree.left.right = new node(1)
tree.right.left = new node(0)
tree.right.right = new node(1)


const sumRootToLeaf = root => {
  //edge case
  if (!root) return 0
  //need place to put all possible paths
  //but also a place to collect each number of each individual path
  const paths = []
  //inner recursive helper function gooo
  function collect(n, str = '') {
    str += n.val
    //check if node's left and right paths exist. If y, send along that node and the str we've got so far
    if (n.left) collect(n.left, str)
    if (n.right) collect(n.right, str)
    //I know I've reached the end of a path when left and right are both null
    //so that'll give me 1 full string to convert
    if (!n.right && !n.left) paths.push(str)
  }
  collect(root)
  //parse each number in paths and add them together in acc
  return paths.reduce((acc, v) => acc + parseInt(v, 2), 0)
}

//slgihtly different version where the paths array and reduce method are swapped for a single variable to sum with
const sumRootToLeaf2ElectricBoogaloo = root => {
  let sum = 0
  function collect(n, str = '') {
    str += n.val
    if (!n.right && !n.left) sum += parseInt(str, 2)
    if (n.left) collect(n.left, str)
    if (n.right) collect(n.right, str)
  }
  collect(root)
  return sum
}


console.log(sumRootToLeaf(tree))