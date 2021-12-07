// https://leetcode.com/problems/n-th-tribonacci-number/

// The Tribonacci sequence Tn is defined as follows: 

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.

// ---------------------------

const tribonacci = (n: number, memo = {}): number => {
    if (n === 0) return n
    if (n <= 2 ) return 1
    let n1 = 0
    let n2 = 1
    let n3 = 1
    let n4
    let k = 3
    while (k <= n) {
        n4 = n1 + n2 + n3
        n1 = n2
        n2 = n3
        n3 = n4
        k++
    }
    return n4
}

console.log(tribonacci(34))