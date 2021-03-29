// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/592/week-5-march-29th-march-31st/3689/

// You are given the root of a binary tree with n nodes, where each node is uniquely assigned a value from 1 to n. You are also given a sequence of n values voyage, which is the desired pre-order traversal of the binary tree.

// Any node in the binary tree can be flipped by swapping its left and right subtrees. For example, flipping node 1 will have the following effect:

// Flip the smallest number of nodes so that the pre-order traversal of the tree matches voyage.

// Return a list of the values of all flipped nodes. You may return the answer in any order. If it is impossible to flip the nodes in the tree to make the pre-order traversal match voyage, return the list [-1].

// ---------------------------------------------

// it seems like I need to traverse the tree in preorder, checking the node values against groups of 1-3 voyage elements. if array[i] is the root, array[i + 1] is the left child, as long as array[i] has children. if array[i + 1] doesn't match the left node, I can flip the node and record. if the left still doesn't match, return [-1] instead of the collected values.
// first element is always going to match the first root, so I can start at 1.
// I can't ignore the right side of the tree as well, because in case the left matches but the right doesn't, I'd need to catch it.
// so if left is successful and I continue traversing until I need to make a right turn, I can automatically assume any non-matching right nodes make the return [-1].
// the conditionals I need: does the current node's left child match array[i]? if we're done with the left node, does the current right node match array[i]? 
// I also need to consider how I collect the flipped node values. If I keep an array in the main function and do the tree traversal in another helper function, I can keep track that way. But I also need a way to determine if there's an invalid ([-1]) answer without having to go through the result array at the end. If the traversal function returns a true or false answer, that would solve it. true will return res. false will return [-1].


import { TreeNode, createBT } from './utils/createBST'

const flipMatchVoyage = (root: TreeNode | null, voyage: number[]): number[] => {
    const res = []
    let i = 1
    const preOrder = (node: TreeNode | null, b: boolean = true): boolean => {
        if (!node) return true
        if (node.left) {
            if (node.left.val !== voyage[i]) {
                [node.left, node.right] = [node.right, node.left]
                res.push(node.val)
                if (node.left.val !== voyage[i]) return false
            }
            i++
            b = preOrder(node.left, b) && b
        }
        if (node.right) {
            if (node.right.val !== voyage[i]) return false
            i++
            b = preOrder(node.right, b) && b
        }
        return b
    }
    return preOrder(root) ? res : [-1]
}

// time O(n) space O(n)

const tree2 = createBT([3,6,4,2,7,1,9,8,0,5])
console.log(flipMatchVoyage(tree2, [3,4,1,9,6,7,5,2,8,0])) // [3,6]