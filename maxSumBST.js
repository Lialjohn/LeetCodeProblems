// https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/

// Given a binary tree root, the task is to return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

// Assume a BST is defined as follows:

// -    The left subtree of a node contains only nodes with keys less than the node's key.
// -    The right subtree of a node contains only nodes with keys greater than the node's key.
// -    Both the left and right subtrees must also be binary search trees.

class TreeNode {
  constructor(v, left, right) {
    this.val = v
    this.left = left || null
    this.right = right || null
  }

  insert(v) {
    let dir = v >= this.val ? 'right' : 'left' 
    if (!this[dir]) this[dir] = new TreeNode(v)
    else this[dir].insert(v)
    return this
  }
}

// making a partially invalid tree
const tree = new TreeNode(1)
tree.left =  new TreeNode(4)
tree.left.insert(2)
tree.left.insert(4)
tree.right = new TreeNode(3)
tree.right.insert(2)
tree.right.insert(5)
tree.right.insert(4)
tree.right.insert(6)

const tree2 = new TreeNode(1)
tree2.right = new TreeNode(10)
tree2.right.insert(-5) 
tree2.right.insert(20) 

// negative ints will return an empty BST (for some reason)
// seems like this one may take invalid trees
// need to find valid tree(s) and sum the ints
// for each node I need to keep track of :
//  - whether it is valid
//  - the sum
// leetcode hint also says to keep track of 'leftMax' and 'leftMin'
// which I think would be for checking BST validity - if the maximum value on the left is larger than the current root value, it makes the tree invalid
// I don't know what min is for but I'll figure it out. I could see a rightMin being useful, leftMin though?
// OK leftMin I get now, after trying to build my function without it. You can't tell which side you're on so you need to keep track of both Min and Max for every node and pass them along

// if none are valid then the rightmost leaf would be the final answer
// I think it would be better to start at the leaves - get to each one recursively and then do checks as I travel back upwards
// add the sums, check validity, record the smallest and largest values in the tree, and then pass it all along


const maxSumBST = function(root) {
  // our final max sum var
  let greaterSum = 0
  const travel = (node) => {
    // if we reach the end of a branch, pass this obj
    if (!node) return {
      sum: 0,
      isBst: true,
      min: null,
      max: null
    }
    // recursively travel until we reach the end of each branch, get those objects
    const left = travel(node.left)
    const right = travel(node.right)
    // sum for the current path
    const sum = left.sum + right.sum + node.val
    let isBst = left.isBst && right.isBst
    // after checking if the previous trees were valid, see if the actual values check out
    // have to add in the null conditional specifically for nodes connected to leaves
    if (left.max !== null && left.max >= node.val) isBst = false
    if (right.min !== null && right.min <= node.val) isBst = false
    // if it's a valid bst, we can compare the branch sum to the current greatest sum we've got
    if (isBst) greaterSum = Math.max(sum, greaterSum)
    // and finally we set the max and min for the current tree, so we can pass it to the previous call
    const min = left.min === null ? node.val : left.min
    const max = right.max === null ? node.val : right.max
    return { sum, isBst, min, max }
  }
  travel(root)
  return greaterSum
}

console.log(maxSumBST(tree))

// time O(n) because I'm going through every node on the tree once
// space O(n) beause I'm making a fixed number of variables for each node