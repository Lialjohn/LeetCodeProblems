// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3626/

// Given the root of a binary search tree and the lowest and highest boundaries as low and high, trim the tree so that all its elements lies in [low, high]. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node's descendant should remain a descendant). It can be proven that there is a unique answer.

// Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.

// //--------------------------------------------------------

// alright, so I only keep the nodes within the boundaries given in args. 
// could make a new tree and simply add only the valid nodes I find but that's boring.
// make a new tree, insert every valid node that is found. simple enough.
// in place in place
// if the root isn't valid, it means that one side of the tree (if it exists) is totally invalid. if that's the case, I want to pick the side that is closer to the valid range. ex: range is 5-10, root is 3, right is 4. there are no immediately valid options. if curr.val isn't valid && curr.val < low, move right. if curr.val > high, move left. continue until a valid root is found.
// the the left and right will be trimmed trees as well, so assign the result of trimBST to each side.
// all done recursively

const TreeNode = function(val, left, right) {
    this.val = val || 0
    this.left = left || null
    this.right = right || null
}

const trimBST = (root, low, high) => {
    // if root value isn't valid, move root in appropriate direction
    if (!root) return root
    while (root.val < low) return trimBST(root.right, low, high)
    while (root.val > high) return trimBST(root.left, low, high)
    // if root is valid, assign a trimmed BST to the left and right of current root
    root.left = trimBST(root.left, low, high)
    root.right = trimBST(root.right, low, high)
    return root
}

// I visit each node once for O(n) time, and rearrange the tree in place. Not bad

const tree = new TreeNode(3, new TreeNode(0, null, new TreeNode(2, new TreeNode(1))), new TreeNode(4))
const tree2 = new TreeNode(5, new TreeNode(4, new TreeNode(3, new TreeNode(2, new TreeNode(1, new TreeNode(0))))))
const tree3 = new TreeNode(1, new TreeNode(0), new TreeNode(2))

console.log(trimBST(tree, 1, 3)) // [3, 2, null, 1]
console.log(trimBST(tree2, 1, 4)) // [4, 3, null, 2, null, null, null, 1, null]
console.log(trimBST(tree3, 1, 2)) // [1, null, 2]