// https://leetcode.com/problems/redundant-connection/

// In this problem, a tree is an undirected graph that is connected and has no cycles.

// The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

// The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with u < v, that represents an undirected edge connecting nodes u and v.

// Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array. The answer edge [u, v] should be in the same format, with u < v. 


// seems like I need to find an edge that's part of a cycle
// cycle = bad, not a tree (in this problem)
// a specific edge has to be returned - the last given edge of the cycle
// also are the edges in order, does each edge connect to the next in the list? doesn't say so, so have to assume no
// input ex: [[1,2], [2,3], [3,4], [1,4], [1,5]] output: [1, 4]

// first thought: travel through graph keeping track of where I've been
// when I reach a node that I've already visited, collect edge in some way. return last collected edge

// I know DFS for graphs but in an undirected graph, I'd normally restrict visits to once per node to prevent loops
// in this case I'd want to record multiple visits only when nodes are not directly connected
// I could collect visited verts as I move through the edges and watch for repetition

function findRedundantConnection(edges) {
  // so:
  // start with first edge
  // next edge is compared with the first edge. if there's one new number, add it to the set 
  // if both numbers are new, those will be a new set
  // if one number exists in one set and another in a different set, merge those sets
  // If both numbers repeat in the same set, we've found a cycle so return current edge
  const connections = {}
  for (let edge of edges) {
    // if both numbers are new
    if (!connections[edge[0]] && !connections[edge[1]]) {
      const set = new Set(edge)
      connections[edge[0]] = set
      connections[edge[1]] = set
    } else if (connections[edge[0]] && connections[edge[1]]) {
      // if both verts are in the set, that's our redundancy
      if (connections[edge[0]] === connections[edge[1]]) return edge
      const o = Array.from(connections[edge[1]])
      for (let i = 0; i < o.length; i++) {
        connections[edge[0]].add(o[i])
        connections[o[i]] = connections[edge[0]]
      }
    } else {
      // if one vert is in the set
      if (!connections[edge[0]]) {
        connections[edge[0]] = connections[edge[1]]
        connections[edge[1]].add(edge[0])
      } else {
        connections[edge[1]] = connections[edge[0]]
        connections[edge[0]].add(edge[1])
      }
    }
  }
}

console.log(findRedundantConnection([[9,10],[5,8],[2,6],[1,5],[3,8],[4,9],[8,10],[4,10],[6,8],[7,9]]))

// after struggling with this problem I've learned that union find is a thing! It's not quite like the above but follows the same sort of idea that I wrote out