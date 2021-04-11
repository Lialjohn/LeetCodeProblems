// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3704/

import { TreeNode, createBT } from "./utils/createBST";

// Given the root of a binary tree, return the sum of values of its deepest leaves.

// ------------------------------------------------

// 'deepest leaves' refers to leaves on the same depth I think, the last depth. A bfs seems appropriate. If I were to only count the last depth, I'd actually need the depth before summing, so instead I'll sum every layer and return the last one. time & space O(n)

const deepestLeavesSumBFS = (root: TreeNode | null): number => {
    let sum = 0
    let q: TreeNode[] = [root]
    let newq: TreeNode[] = []
    while (q.length) {
        const curr = q.pop()
        sum += curr.val
        if (curr.left) newq.push(curr.left)
        if (curr.right) newq.push(curr.right)
        if (!q.length && newq.length) {
            q = newq
            newq = []
            sum = 0
        }
    }
    return sum
}

// alternatively I could just dig in to find the deepest level, then use that information to add the leaves value in a dfs. it would be a much more space efficient solution but I'd have to travel through the tree more than once. time O(n) space O(1)

const deepestLeavesSum = (root: TreeNode | null): number => {
    let deepest = 0
    const findDeepest = (node: TreeNode | null, depth: number): void => {
        if (!node) return
        if (depth > deepest) deepest = depth
        findDeepest(node.left, depth + 1)
        findDeepest(node.right, depth + 1)
    }
    findDeepest(root, 0)
    let sum = 0
    const sumDeepest = (node: TreeNode | null, depth: number): void => {
        if (!node) return
        if (depth === deepest) sum += node.val
        else {
            sumDeepest(node.left, depth + 1)
            sumDeepest(node.right, depth + 1)
        }
    }
    sumDeepest(root, 0)
    return sum
}

// it's also not as dry as the bfs, oof.

const tree = createBT([6,7,8,2,7,1,3,9,null,1,4,null,null,null,5])

console.log(deepestLeavesSum(tree))