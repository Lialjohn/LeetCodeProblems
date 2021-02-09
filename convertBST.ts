// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3634/

// Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

// As a reminder, a binary search tree is a tree that satisfies these constraints:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

// -----------------------------------------------------

// I have a feeling I've done this problem before...
// it seems obvious to use depth first, post order traversal which will order node traversal from largest value nodes to smallest value nodes. travel all the way right, then start summing values in an outside sum variable. easy peasy.

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor (val: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val
        this.left = left || null
        this.right = right || null
    }
}

const convertBST = (root: TreeNode | null): TreeNode | null => {
    if (!root) return root
    let sum = 0
    const travel = (node: TreeNode): void => {
        if (node.right) travel(node.right)
        sum += node.val
        node.val = sum
        if (node.left) travel(node.left)
    }
    travel(root)
    return root
}

// O(n) time O(1) space.