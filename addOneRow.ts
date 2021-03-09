// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/589/week-2-march-8th-march-14th/3666/

// Given the root of a binary tree, then value v and depth d, you need to add a row of nodes with value v at the given depth d. The root node is at depth 1.

// The adding rule is: given a positive integer depth d, for each NOT null tree nodes N in depth d-1, create two tree nodes with value v as N's left subtree root and right subtree root. And N's original left subtree should be the left subtree of the new left subtree root, its original right subtree should be the right subtree of the new right subtree root. If depth d is 1 that means there is no depth d-1 at all, then create a tree node with value v as the new root of the whole original tree, and the original tree is the new root's left subtree.

// --------------------------------------------------------

import { TreeNode, createBT } from "./utils/createBST"

// I suppose I could do a breadth first search to get all the nodes at the right depth. Once I get them, create a new node, assign the curr node's left to the new node's left, and then assign curr's left reference to the new node. do the same/similar with right. do this for each node at that depth. 
// depth first would also probably work fine.

const addOneRow = (root: TreeNode | null, v: number, d: number): TreeNode | null => {

    const dfs = (node: TreeNode, currDepth: number): void => {
        if (currDepth === d - 1) {
            node.left = new TreeNode(v, node.left)
            node.right = new TreeNode(v, null, node.right)
        } else {
            if (node.left) dfs(node.left, currDepth + 1)
            if (node.right) dfs(node.right, currDepth + 1)
        }
    }

    if (d === 1) root = new TreeNode(v, root)
    else dfs(root, 1)

    return root
}

// bfs would be a little more intuitive perhaps but I haven't done a dfs solution in a bit! time O(n) space O(2^d)

const tree1 = createBT([4,5,2,1,3,4,5,6,7])

console.log(addOneRow(tree1, 10, 4))