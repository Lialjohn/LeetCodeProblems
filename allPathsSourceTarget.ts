// https://leetcode.com/problems/all-paths-from-source-to-target/

// Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

// The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).

// ----------------------------------------------------------

// no self loops, DAG, all elements of a node unique, 2 <=n <= 15, 0 <= graph[i][j] < n
// I can trust that the index of each node indicated it's number in n. It does seem like nodes never connect backwards, so I don't have to worry overmuch about checking 'did I visit this node' within each individual path.
// since I need to find all combinations, a costly DFS seems inevitable here.
// using recursion, I'll explore a node and each connection within it. I do it in a separate function to make it easy to add paths to the result array. 
// Need to start search at zero. each path can have it's own array, or possibly I can just push and pop as needed. I like that second one better for space reasons. Go down one path, push copy to result array, pop numbers as they're backtracked.
// will use a loop in the recursive function to explore each step in each array. will make it easy to pop()

const allPathsSourceTarget = (graph: number[][]): number[][] => {
    const res: number[][] = []
    const n = graph.length - 1
    const path = []
    const DFS = (path: number[], i: number, end: number) => {
        path.push(i)
        if (i === end) {
            res.push([...path])
        } else {
            for (let e of graph[i]) {
                DFS(path, e, end)
                path.pop()
            }
        }
    }
    DFS(path, 0, n)
    return res
}

console.log(allPathsSourceTarget([[4,3,1],[3,2,4],[3],[4],[]])) //[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
console.log(allPathsSourceTarget([[1],[1]])) // [[0,1]]
console.log(allPathsSourceTarget([[1,2,3],[2],[3],[]])) // [[0,1,2,3],[0,2,3],[0,3]]
console.log(allPathsSourceTarget([[1,3],[2],[3],[]])) // [[0,1,2,3],[0,3]]