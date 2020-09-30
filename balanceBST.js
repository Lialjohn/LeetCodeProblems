// https://leetcode.com/problems/balance-a-binary-search-tree/

// Given a binary search tree, return a balanced binary search tree with the same node values.

// A binary search tree is balanced if and only if the depth of the two subtrees of every node never differ by more than 1.

// If there is more than one answer, return any of them.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// /**
//  * @param {TreeNode} root
//  * @return {TreeNode}
//  */

//my simple node/tree definition

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

const tree = new TreeNode(1)
tree.insert(2)
tree.insert(3)
tree.insert(4)
tree.insert(5)

// so I'll probably need to reorganize by changing the root to another, median value
// first thought is to grab all values, find the median, and then make a new tree
// that could get very expensive
// but I have no immediate better ideas woo!

const balanceTreeNode = function(root) {
  const vals = []
  // standard in-order traversal
  function travel(node) {
    node.left && travel(node.left)
    vals.push(node.val)
    node.right && travel(node.right)
  }
  travel(root)
  // now we take that array of values and make a new tree
  function makeNewTree(arr) {
    // base case, this'll be a recursive function
    if (!arr.length) return null
    // get median point and make the new root
    const midpoint = Math.floor(arr.length / 2)
    // and make the node
    const node = new TreeNode(arr[midpoint])
    // left and right get the median points of the two halves of current array
    // mithout picking up the midpoints the tree would be way too skinny on either side
    node.left = makeNewTree(arr.slice(0, midpoint))
    node.right = makeNewTree(arr.slice(midpoint + 1))
    return node
    // ridiculous one-line version of the return:
    // return new TreeNode(arr[midpoint], makeNewTree(arr.slice(0, midpoint)), makeNewTree(arr.slice(midpoint + 1)))
  }
  return makeNewTree(vals)
}

console.log(balanceTreeNode(tree))