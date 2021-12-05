// https://leetcode.com/problems/house-robber-iii/

// The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

// Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

// Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.

// ---------------------------------------------------------------

import { createBT, TreeNode } from "./utils/createBST"

// like rob1 but with binary tree instead of array
// robbed nodes must be separated from other robbed nodes. i.e. if I count a node it's parent and children cannot be counted
// I think I can use a similar technique to rob1. 
// we have variables 1 and 2 which are two sums each node will need to consider. 1 represents the best count as of (i - 1) and 2 the best as of (i - 2). Each time we reach a new node, a new count has to be calculated from the previous best count, as that's the best count as of the node 'behind' node i. 
// The current node value can only be added to variable 2. if it's greater, 2 can take on the value of 1 and 1 becomes 2 + i.value. If 2 + i is lesser than 1, then we don't need the value at 2 anymore because this node will definitely weaken the overall sum. any number after this value can be added to the greater sum at 1 and come out better than the current i + 2. so 2 will become 1 and 1 will remain unchanged.
// I think I need to do a bottom up approach in order to add branching children together
// reach a leaf, return it's value. the parent node will have two values. it's own , and the values sent from the kids added together. would both need to be returned? when one branch is explored, it will return to its parent with 2 max sums.
// how about a top down: 2 variables are kept outside of the function. 

const rob3 = (root: TreeNode | null): number => {
    const traverse = (node: TreeNode | null) => {
        if (!node) return [0, 0]
        let [currL, prevL] = traverse(node.left)
        let [currR, prevR] = traverse(node.right)
        let curr = currL + currR
        let prev = prevL + prevR
        let temp = curr
        curr = Math.max(curr, prev + node.val)
        prev = temp
        return [curr, prev]
    }
    return traverse(root)[0]
}

// tbh this feels a bit clunky in execution with the separate recursive function and having to return one element in an array

const rob4 = (root: TreeNode | null): number => {
    if (!root) return 0
    // need to get to leaves. the max amount you can get from each leave is it's own value, so return those values along with whatever comes from the child nodes (which in the leaves case would be zero)
    // the parent has 3 values. it's own and the numbers returned from left/right. It can't necessarily use the numbers immediately returned from the children, it will need to be added to the children's children, if those children exist
    let sum = 0
    if (root.left) sum += rob4(root.left.left) + rob4(root.left.right)
    if (root.right) sum += rob4(root.right.left) + rob4(root.right.right)
    // now sum is the total from the right and left's children, nodes that it can legally add. I need to decide if adding root.val is worth it, or if it should be skipped because the other sum, returned by the immediate child nodes, is higher and can be added to any parent node after the current one.
    return Math.max(sum + root.val, rob4(root.left) + rob4(root.right))
}

// neater but not as time efficient! ayy

const tree1 = createBT([3,4,5,1,3,null,1]) // 9
const tree2 = createBT([4,12,2,3,13,9,5,10]) // 41
const tree3 = createBT([3,4,5]) // 9
console.log(rob4(tree1))
console.log(rob4(tree2))
console.log(rob4(tree3))