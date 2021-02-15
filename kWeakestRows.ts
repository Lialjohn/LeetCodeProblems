// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/586/week-3-february-15th-february-21st/3641/

// Given a m * n matrix mat of ones (representing soldiers) and zeros (representing civilians), return the indexes of the k weakest rows in the matrix ordered from the weakest to the strongest.

// A row i is weaker than row j, if the number of soldiers in row i is less than the number of soldiers in row j, or they have the same number of soldiers but i is less than j. Soldiers are always stand in the frontier of a row, that is, always ones may appear first and then zeros.

// -----------------------------------------------------

// the soldier/civilian metaphor seems unnecessary tbh...
// I have to keep track of k indices with the smallest number of ones as well as the order of the indices, from smallest to greatest.
// I could store the indices of the number of ones in an array. array [0] will contain indices that have 0 ones, array[1] will contain indices with 1 ones, etc.a
// I could also use a single priority queue that sorts by both number of ones and indices instead of an array of arrays. spit out indices k times.
// I could make a copy the matrix, sort it, and then return the indexOf()s for the first k number of elements. This'd work because I'd have a sorted copy but still have references to the inner arrays that I could use to find their indices in the original matrix. worst case for that'd be pretty bad though, probably n^2.
// the worst time problems come from the fact that I need to count the number of ones in each element of matrix. or in the copy approach's case, find the indices of each array in the original. Best I could do is a binary search.



const kWeakestRows1 = (matrix: number[][], k: number): number[] => {
    const ans: number[] = []
    const copy = [...matrix]
    copy.sort()
    let i = 0
    while (k--) ans.push(matrix.indexOf(copy[i++]))
    return ans
}

// This is nice and simple but a bs solution, probably with a pq, would definitely be faster.

class WeakestRowsPQ {
    list: {i: number, ones: number}[]
    constructor() {
        this.list = []
    }
    insert(i: number, ones: number): void {
        this.list.push({ i, ones })
        this.bubble()
    }
    bubble(): void {
        // want to sort by ones first, i second
        const list = this.list
        let child = list.length - 1
        let parent = Math.floor((child - 1) / 2)
        // want to swap if 
        // 1) child.ones is less than parent.ones
        // 2) child.ones is equal to parent.ones AND child < parent
        while (list[parent] && list[child].ones < list[parent].ones) {
            ;[list[parent], list[child]] = [list[child], list[parent]]
            child = parent
            parent = Math.floor((child - 1) / 2)
        }
    }
    remove(): ({i: number, ones: number} | undefined) {
        const list = this.list
        ;[list[0], list[list.length - 1]] = [list[list.length - 1], list[0]]
        const popped = list.pop()
        this.sink()
        return popped
    }
    sink(): void {
        const list = this.list
        let child = 1
        let parent = 0
        // want to swap if:
        // 1) first child.ones is less than parent.ones.
        // 2) parent.ones is === to child.ones but child.i < parent.i
        // 3) if either of those things is true for child + 1
        while (list[parent] && ((
            list[child] && (list[parent].ones > list[child].ones || (list[parent].ones === list[child].ones && list[child].i < list[parent].i)))
            ) || (
            list[child + 1] && (list[parent].ones > list[child+1].ones || (list[parent].ones === list[child+1].ones && list[child+1].i < list[parent].i))
        )) {
            if(list[child + 1] && (list[child + 1].ones < list[child].ones || (list[child + 1].ones === list[child].ones && list[child + 1].i < list[child].i))) child++
            ;[list[parent], list[child]] = [list[child], list[parent]]
            parent = child
            child = parent * 2 + 1
        }
    }
}

const kWeakestRows = (matrix: number[][], k: number): number[] => {
    const ans = []
    const pq = new WeakestRowsPQ
    for (let i = 0; i < matrix.length; i++) {
        const ones = onesBS(matrix, i)
        pq.insert(i, ones)
    }
    while (k--) {
        ans.push(pq.remove().i)
    }
    return ans
}

// binary search that returns the index of the first zero in an array of matrix. index of the first 0 === total number of ones in the array.
const onesBS = (matrix: number[][], a: number): number => {
    let left: number = 0
    let right: number = matrix[a].length - 1
    while (left < right) {
        let mid: number = Math.floor(left + (right - left) / 2)
        if (matrix[a][mid] === 1) left = mid + 1
        else right = mid
    }
    return matrix[a][left] === 1? left + 1 : left
}

// WOW SO MUCH MORE CODE THOUGH

console.log(kWeakestRows([[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], 3)) // [2,0,3]
console.log(kWeakestRows([[1,0,0,0],[1,1,1,1],[1,0,0,0],[1,0,0,0]], 2)) // [0,2]
console.log(kWeakestRows([[1,1,1,1,1,1],[1,1,1,0,0,0],[1,1,0,0,0,0]], 2)) // [2,1]