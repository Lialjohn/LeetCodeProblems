// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3630/

// Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// ---------------------------------------------------

const TreeNode = function(val, left, right) {
    this.val = val || 0
    this.left = left || null
    this.right = right || null
}

// not a lot of extra explanation for this one but it seems like I need to return a list of nodes representing the tree on the rightmost side.
// including the rightmost side first is obvious but if any left tree is deeper than the right, I suspect those nodes would need to appear in the list as well.
// it makes sense to me here to use a depth first search, starting on the right side, and recording nodes only as the depth is greater than what its seen before.
// travel down the right side, recording the maxDepth and nodes as it goes. When I reach the end of that tree and recursively travel back to the next left tree, record any nodes that are deeper that the right tree. Visit each node once for O(n)

const rightSideViewDFS = root => {
    if (!root) return []
    let maxDepth = 0
    const res = []
    const travel = (node, depth) => {
        if (!node) return
        if (depth > maxDepth) {
            res.push(node.val)
            maxDepth++
        }
        travel(node.right, depth + 1)
        travel(node.left, depth + 1)
    }
    travel(root, 1)
    return res
}

// because that was too easy let's also do a breadth first version for kicks.

const rightSideView = root => {
    if (!root) return []
    const res = []
    const queue = [[root, 1]]
    let maxDepth = 0
    while (queue.length) {
        const [node, depth] = queue.shift()
        if (depth > maxDepth) {
            res.push(node.val)
            maxDepth++
        }
        if (node.right) queue.push([node.right, depth + 1])
        if (node.left) queue.push([node.left, depth + 1])
    }
    return res
}

const rightSideView = root => {
    if (!root) return []
    const res = []
    const queue = [[root, 1]]
    let maxDepth = 0
    while (queue.length) {
        const [node, depth] = queue.shift()
        if (depth > maxDepth) {
            res.push(node.val)
            maxDepth++
        }
        if (node.right) queue.push([node.right, depth + 1])
        if (node.left) queue.push([node.left, depth + 1])
    }
    return res
}

// since I didn't make a ds for a queue and am using shift(), this isn't far off from n^2. 