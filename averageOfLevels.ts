// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3661/

// Given a non-empty binary tree, return the average value of the nodes on each level in the form of an array.

// -------------------------------------------

// I need the values of each depth to add together and divide. breadth first search will give me that
// I'll have each node carry a depth with it into the queue and I'll keep a set of counter values outside the loop. Those values will count the number of elements at that depth, to divide the sum with later.

import { createBT, TreeNode } from './utils/createBST'

const tree = createBT([1,2,3,30,12,30,1,2,0,9])

console.log(tree.right)

class LevelsQ {
    list: object
    length: number
    head: number
    tail: number
    constructor() {
        this.list = {}
        this.head = 0
        this.tail = 0
        this.length = 0
    }
    push(v: [TreeNode, number]): void {
        this.list[this.tail++] = v
        this.length++
    }
    shift(): [TreeNode, number] | null {
        if (this.length <= 0) return null
        const shifted = this.list[this.head]
        delete this.list[this.head++]
        this.length--
        return shifted
    }
}

const averageOfLevels = (root: TreeNode | null): number[] => {
    if (!root) return []
    const res: number[] = []
    const divisors: number[] = []
    const queue = new LevelsQ
    queue.push([root, 0])
    while (queue.length) {
        const [node, depth] = queue.shift()
        if (res[depth] === undefined) res[depth] = 0
        res[depth] += node.val
        divisors[depth] = divisors[depth] + 1 || 1
        if (node.left) queue.push([node.left, depth + 1])
        if (node.right) queue.push([node.right, depth + 1])
    }
    for (let i = 0; i < res.length; i++) {
        res[i] /= divisors[i]
    }
    return res
}

// this approach is not great at all on space, but has an O(n + depth) runtime