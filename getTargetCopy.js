// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3590/

// Given two binary trees original and cloned and given a reference to a node target in the original tree.

// The cloned tree is a copy of the original tree.

// Return a reference to the same node in the cloned tree.

// Note that you are not allowed to change any of the two trees or the target node and the answer must be a reference to a node in the cloned tree.

// Follow up: Solve the problem if repeated values on the tree are allowed.

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
//--------------------------------------------------

// doesn't seem like the given trees necessarily have to be valid trees, but otherwise this seems like a straightforward problem. I can recursively search through the copy's nodes until I find one with the same value as the reference of the original.
// still it isn't really ideal to have to search through potentially every node on the tree to find one.
// It doesn't seem as through they're organized any particular way
// for the follow up: I can traverse both trees at the same time and check the whole target node against the original nodes. When I find a match, the copy node will also be available in the same iteration.
// this is really considered a medium level problem? it's basic tree traversal...

const getTargetCopyDFS = (orig, clone, target) => {
    let cloneRef = null
    const travel = (currO, currC) => {
        if (currO === null) return
        if (currO === target) return cloneRef = currC
        travel(currO.left, currC.left)
        travel(currO.right, currC.right)
    }
    travel(orig, clone)
    return cloneRef
}

// BFS, slightly better time as long as I use a map instead of an array for the queue
class Q {
    constructor() {
        this.length = 0
        this.list = {}
        this.start = 0
        this.end = 0
    }
    add(v) {
        this.list[this.end++] = v
        this.length++
    }
    remove() {
        const temp = this.list[this.start]
        delete this.list[this.start++]
        this.length--
        return temp
    }
}

const getTargetCopyBFS = (orig, clone, target) => {
    const queue = new Q
    queue.add(clone)
    while (queue.length) {
        let curr = queue.remove()
        if (curr.val === target.val) return curr
        if (curr.left) queue.add(curr.left)
        if (curr.right) queue.add(curr.right)
    }
    return -1
}

// no written out examples this time because I'd have to spend quite some time building trees in order for them to work. Everything done on the website's editor.