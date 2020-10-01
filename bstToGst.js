// https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/

// Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

// As a reminder, a binary search tree is a tree that satisfies these constraints:

// -    The left subtree of a node contains only nodes with keys less than the node's key.
// -    The right subtree of a node contains only nodes with keys greater than the node's key.
// -    Both the left and right subtrees must also be binary search trees.


// my own node definition:
class TreeNode {
  constructor(v, left, right) {
    this.val = v
    this.left = left || null
    this.right = right || null
  }
  insert(v) {
    let dir = v > this.val ? 'right' : 'left' 
    if (!this[dir]) this[dir] = new TreeNode(v)
    else this[dir].insert(v)
    return this
  }
}

const tree = new TreeNode(4)
tree.insert(1)
tree.insert(6)
tree.insert(0)
tree.insert(2)
tree.insert(3)
tree.insert(5)
tree.insert(7)
tree.insert(8)
// /**
//  * @param {TreeNode} root
//  * @return {TreeNode}
//  */

// because we're adding only numbers larger than the value, it makes sense to start with the largest number in the tree
// getting the largest number and each next-largest is easy: post order.
// so if instead of collecting the values in an array or printing them or w/e, we can keep a variable that represents the sum each time we travel
// seems easy enough!

const bstToGst = function(root) {
  let sum = 0
  const travel = node => {
    //right first, then root, then left
    if (node.right) travel(node.right)
    sum += node.val
    node.val = sum
    if (node.left) travel(node.left)
  }
  travel(root)
  return root
}

console.log(bstToGst(tree))

// accepted! I need to do a harder one, this took like 10 mins tops