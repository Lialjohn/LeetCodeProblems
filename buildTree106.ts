// https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// ---------------------------------------------------
import { TreeNode } from "./utils/createBST"

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
*/

// inorder left root right. postorder left right root
/* things to be aware of:
* the postorder's final element is going to be the root of the whole tree.
* everything on the left will form the first half of the array and everything on the right the second half (excluding root)
* I can use that information to determine the first 2 branches in inorder.
* split the inorder into 2 sections on either side of the root. take the left of the rights side, use it to determine where the right side begins on the postorder array. the final element in that section will be the next root.
* to save time finding indices, stash them in an object
*
* So: create node based on final index of postorder section. Get index from map for inorder. Recursively build nodes on either side using indices to the left and right of index taken from map. Determine next root from postorder, using inorder's indices to determine each section left and right from current root. 
*/ 

const buildTree = (inorder: number[], postorder: number[]): TreeNode | null => {
    const ind = {}
    let n = inorder.length
    for (let i = 0; i < n; i++) ind[inorder[i]] = i

    const build = (inl: number, inr: number, pol: number, por: number) => {
        if (inl > inr || pol > por) return null
        const newNode = new TreeNode(postorder[por])
        const inInd = ind[postorder[por]]
        newNode.left = build(inl, inInd-1, pol, (pol + inInd - inl - 1))
        newNode.right = build(inInd+1, inr, (pol + inInd - inl), por - 1)
        return newNode
    }

    return build(0, n - 1, 0, n- 1)
}

console.log(buildTree([9,3,15,20,7], [9,15,7,20,3])) // [3,9,20,null,null,15,7]
console.log(buildTree([3,5,1], [5,3,1])) // [1,3,null,null,5]
console.log(buildTree([4,2,5,1,3], [4,5,2,3,1])) // [1,2,3,4,5]
console.log(buildTree([-1], [-1])) // [-1]