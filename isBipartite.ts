// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3639/

// Given an undirected graph, return true if and only if it is bipartite.

// Recall that a graph is bipartite if we can split its set of nodes into two independent subsets A and B, such that every edge in the graph has one node in A and another node in B.

// The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists. Each node is an integer between 0 and graph.length - 1. There are no self edges or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.

// -----------------------------------------------------------------------------

// so graph[i] is a list of nodes that are connected to i. graph[3] could be a list [1,4,6] meaning that node 3 is connected to nodes 1, 4, and 6.
// each edge in the graph has to be connected to a node in two different groups to return true. so I have to find some way to split the nodes into these groups.
// well, I know that for any given node, any connected node must be in the other group. none of those connected nodes can be connected to each other.
// I think I can try BFS again. I need to iterate through both the graph's indices to make sure I miss none of them, since the graph's nodes aren't necessarily all connected. I also need to check each of their connections to make sure those aren't in opposing groups.
// I'll also need to iterate through each connection's connections, which I can use a queue for. all in all I think I can do this with 3 loops. 1) for graph indices, 2) for removing and examining an element from the queue and 3) for adding connections to the queue.
// if the iterations finish, that'll be a true. 
// If a node is completely unconnected, does that automatically make the graph non-bipartite? 
// testing tells me no!

class Qu {
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
    push(v: number): void {
        this.list[this.tail++] = v
        this.length++
    }
    shift(): number | null {
        if (this.length <= 0) return null
        const shifted = this.list[this.head]
        delete this.list[this.head++]
        this.length--
        return shifted
    }
}

const isBipartite = (graph: number[][]): boolean => {
    const groups: number[] = new Array(graph.length).fill(0) // for recording every node's group. 1 will be one group and -1 will be another.
    for (let i = 0; i < graph.length; i++) {
        // only do anything if the current i hasn't been checked at all yet
        if (groups[i] === 0) {
            groups[i] = 1
            const queue: Qu = new Qu
            queue.push(i)
            while (queue.length) {
                const node = queue.shift()
                for (const connection of graph[node]) {
                    if (groups[connection] === groups[node]) return false
                    if (groups[connection] === 0) {
                        groups[connection] = -groups[node]
                        queue.push(connection)
                    }
                }
            }
        }
    }
    return true
}

// worst case time I'd be moving through all elements once through the inner loops and then going through through all indices again in the outer for loop. O(2n). space would be the same thanks to the queue and groups array. 

console.log(isBipartite([[]])) // true
console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]])) // true
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])) // false