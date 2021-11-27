// https://leetcode.com/problems/delete-node-in-a-bst/

// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.
// ---------------------------------------------------------------

import { TreeNode, createBT } from "./utils/createBST"

// I've got to rearrange a BST as if the key node did not exist. Should I make a new one or perform the operation in place? According to the footnote, this can be solved in O(height) as well.
// so if I remove a node on a valid tree, either its immediate left or right node could replace it.
// I'd possibly need to deal with a parent and/or two children with two children of their own.
// if I removed one that had two children who had two children, I'd need to go down the tree on whichever side I decided to move up, adjusting references possibly all the way down to the leaves.
// find the key node
// when it's found, if a child node exists, pick the one that is greater than the other (also if it exists) to replace it.
// replace it by returning replacement node in recursive function.
// if both the removed node and replacement node have a left child, I'd need to integrate them. send the root of the left side down the tree and attach it where appropriate. Will use separate function for this.


const deleteNode = (root: TreeNode | null, key: number): TreeNode | null => {
    if (!root) return null
    const attach = (root: TreeNode | null, node: TreeNode | null): void => {
        if (node.val < root.val) {
            if (root.left) attach(root.left, node)
            else root.left = node
        }
        if (node.val > root.val) {
            if (root.right) attach(root.right, node)
            else root.right = node
        }
    }
    if (root.val === key) {
        let leftBranch = root.left
        let rightBranch = root.right
        if (rightBranch) {
            if (!leftBranch) return rightBranch
            if (rightBranch.left) attach(leftBranch, rightBranch.left)
            rightBranch.left = leftBranch
            root = rightBranch
        } else return leftBranch
    }
    if (key < root.val) root.left = deleteNode(root.left, key)
    else root.right = deleteNode(root.right, key)
    return root
}

const tree = createBT([5,3,6,2,4,null,7])
const tree2 = createBT([5,3,7,2,4,6,8])
const tree3 = createBT([1])

console.log(deleteNode(tree, 3)) // [5,4,6,2,null,null,7]
console.log(deleteNode(tree, 11)) // [5,3,6,2,4,null,7]
console.log(deleteNode(tree2, 5)) // [7,3,8,2,4,null,null,null,null,null,6]
console.log(deleteNode(tree3, 1)) // null