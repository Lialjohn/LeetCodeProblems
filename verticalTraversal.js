// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/583/week-5-january-29th-january-31st/3621/

// Given the root of a binary tree, calculate the vertical order traversal of the binary tree.

// For each node at position (x, y), its left and right children will be at positions (x - 1, y - 1) and (x + 1, y - 1) respectively.

// The vertical order traversal of a binary tree is a list of non-empty reports for each unique x-coordinate from left to right. Each report is a list of all nodes at a given x-coordinate. The report should be primarily sorted by y-coordinate from highest y-coordinate to lowest. If any two nodes have the same y-coordinate in the report, the node with the smaller value should appear earlier.

// Return the vertical order traversal of the binary tree.

// //---------------------------------------------------

// left is -1 x and right is +1 x. children are -1 y and parents are +1 y
// so the farthest left will always come first in vertical traversal, and the farthest right last. nodes with different y coords but the same x coords will be placed together in the result array.
// I could try traversing the tree normally, recording every node's x position in a map. Or an array.
// the smallest key would be assigned to position 0, so I'd also need to keep track of what the smallest found coord is and assign each following coord to i + Math.abs(smallest)
// include a simple sort function that runs on arrays larger than 1
// the sort has to be by y value, and those nodes with the same y value should be sorted according to value. Easiest way I can think to do this is a priority queue. Queue will sort every new element by logn and I'll have a PQ for each x coord.

const TreeNode = function(val, left, right) {
    this.val = val || 0
    this.left = left || null
    this.right = right || null
}

class PQ {
    constructor() {
        this.vals = []
        this.length = 0
    }
    insert(val, y) {
        this.vals.push({ val, y })
        this.length++
        this.bubble()
    }
    bubble() {
        let v = this.vals
        let child = v.length - 1
        let parent = Math.floor((child - 1) /2)
        while (v[child] && v[parent] && (v[child].y < v[parent].y ||
              (v[child].y === v[parent].y && v[child].val < v[parent].val))) {
            ;[v[child], v[parent]] = [v[parent], v[child]]
            child = parent
            parent = Math.floor((child - 1) / 2)
        }
    }
    remove() {
        const v = this.vals
        ;[v[0], v[v.length-1]] = [v[v.length-1], v[0]]
        const popped = v.pop() 
        this.length--
        this.sink()
        return popped ? popped.val : undefined
    }
    sink() {
        const v = this.vals
        let parent = 0
        let child = 1
        while (v[child] !== undefined && 
              ((v[child].y < v[parent].y ||
              (v[child].y === v[parent].y && v[child].val < v[parent].val)) ||
              (v[child + 1] !== undefined && ((v[child + 1].y < v[parent].y) ||
              (v[child + 1].y === v[parent].y && v[child + 1].val < v[parent].val))))) {
            if (v[child+1] !== undefined && (v[child + 1].y < v[child].y || (v[child + 1].y === v[child].y && v[child + 1].val < v[child].val))) child++
            ;[v[child], v[parent]] = [v[parent], v[child]]
            parent = child
            child = (parent * 2) + 1
        }
    }
}

const verticalTraversal = root => {
    if (!root) return root
    const res = []
    let smallest = 0
    findSmallest = (node, x) => {
        if (node.left) smallest = Math.min(findSmallest(node.left, x - 1), smallest)
        if (node.right) findSmallest(node.right, x + 1)
        return x
    }
    findSmallest(root, 0)
    smallest = Math.abs(smallest)
    const traverse = (node, x, y) => {
        if (!res[smallest + x]) res[smallest + x] = new PQ
        res[smallest + x].insert(node.val, y)
        if (node.left) traverse(node.left, x - 1, y + 1)
        if (node.right) traverse(node.right, x + 1, y + 1)
    }
    traverse(root, 0, 0)
    for (let i = 0; i < res.length; i++) {
        let arr = []
        while (res[i].length) arr.push(res[i].remove())
        res[i] = arr
    }
    return res
}

// going through each node to find the smallest is O(n), and the second n would be O(2n). traverse inserts into a minimum of 3 priority queues n times, which makes it about O(nlogn). It's overall not terrible on time but poor on space.

const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7)))

const tree2 = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)))

const tree3 = new TreeNode(3, new TreeNode(9, new TreeNode(2, new TreeNode(20), new TreeNode(44)), new TreeNode(17, new TreeNode(30), new TreeNode(90))), new TreeNode(20, new TreeNode(15, new TreeNode(77), new TreeNode(37)), new TreeNode(7)))

console.log(verticalTraversal(tree)) // [[4], [2], [1,5,6], [3], [7]]
console.log(verticalTraversal(tree2)) // [[9], [3,15], [20], [7]]
console.log(verticalTraversal(tree3)) // [[20], [2], [9,30,44,77], [3,15,17], [20,37,90], [7]]