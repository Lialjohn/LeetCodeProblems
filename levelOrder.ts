// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/600/week-3-may-15th-may-21st/3749/

// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

// ----------------------------------------------------------------

import { TreeNode, createBT } from './utils/createBST'

// so this seems like a normal breadth first search, except listed out as a 2d array.
// establish res as an empty array
// I don't even really have to do BFS, I can go DFS if I add values to res where i = depth. By traversing via preorder, each value would still be added to each array in the right order

const levelOrder = (root: TreeNode | null): number[][] => {
    const res = []
    const DFS = (node: TreeNode | null, depth: number): void => {
        if (!node) return
        if (!res[depth]) res[depth] = []
        res[depth].push(node.val)
        DFS(node.left, depth + 1)
        DFS(node.right, depth + 1)
    }
    DFS(root, 0)
    return res
}

// easy O(n)
// now BFS, less timely because of the lazier built in array queue

const levelOrderBFS = (root: TreeNode | null): number[][] => {
    const res = []
    const q = []
    if (root) q.push(root)
    while (q.length > 0) {
        const a = []
        for (let i = 0, l = q.length; i < l; i++) {
            const node = q.shift()
            a.push(node.val)
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
        }
        res.push(a)
    }
    return res
}

const tree1 = createBT([3,9,20,null,null,15,7]) // [[3],[9,20],[15,7]]
console.log(levelOrderBFS(tree1))