// https://leetcode.com/problems/binary-tree-tilt/

// Given the root of a binary tree, return the sum of every tree node's tilt.

// The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if there the node does not have a right child.

// ------------------------------------------------------------------------------

import { TreeNode, createBT } from "./utils/createBST"

// so by these rules, all leaf nodes will be zero. a given tree that is one node deep will return 0.
// If I start from the bottom, what numbers will I need? 
// - the sum of all child nodes on the left and on the right.
// - the sums of the previous tilts, which will end up as our final answer.
// I can't return two numbers without making a helper function. arg.

const findTilt = (root: TreeNode | null): number => {
    let tilt = 0
    const traverse = (root: TreeNode | null): number => {
        if (!root) return 0
        let left = traverse(root.left)
        let right = traverse(root.right)
        tilt += Math.abs(left - right)
        return left + right + root.val
    }
    traverse(root)
    return tilt
}

const tree1 = createBT([1,2,3])
const tree2 = createBT([4,2,9,3,5,null,7])
const tree3 = createBT([21,7,14,1,1,2,2,3,3])


console.log(findTilt(tree1)) // 1
console.log(findTilt(tree2)) // 15
console.log(findTilt(tree3)) // 9