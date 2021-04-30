// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/597/week-5-april-29th-april-30th/3726/

// Given three integers x, y, and bound, return a list of all the powerful integers that have a value less than or equal to bound.

// An integer is powerful if it can be represented as xi + yj for some integers i >= 0 and j >= 0.

// You may return the answer in any order. In your answer, each value should occur at most once.

// ----------------------------------------------------------

// this seems almost like a two sum problem, but you're picking your own sets of ints based on power.
// say I make 2 sets, one for every power of x up to bound - 1 and another for every power of y up to bound - 1. I set a pointer at the start of one and another at the end. I sum.
// every sum found that's less than bound will be added to the result array.

const powerfulIntegers1 = (x: number, y: number, bound: number): number[] => {
    const res: Set<number> = new Set
    const xPows = [1]
    const yPows = [1]
    let sum
    if (x > 1) for (let i = 0; x**i < bound; i++) xPows.push(x**i)
    if (y > 1) for (let j = 0; y**j < bound; j++) yPows.push(y**j)
    for (let i = 0; i < xPows.length; i++) {
        for (let j = 0; j < yPows.length; j++) {
            sum = xPows[i] + yPows[j]
            if (sum <= bound) res.add(sum)
        }
    }
    return Array.from(res.values())
}

// this works but it's clunky and takes up more memory than I suspect it needs. I think I can get rid of the two sets of pows

const powerfulIntegers = (x: number, y: number, bound: number): number[] => {
    const res: Set<number> = new Set
    let sum
    for (let i = 0; x**i < bound; i++) {
        for (let j = 0; y**j < bound; j++) {
            sum = x**i + y**j
            if (sum <= bound) res.add(sum)
            if (y === 1) break
        }
        if (x === 1) break
    }
    return Array.from(res.values())
}

// much better on mem. Still O(log(x, bound) * log(y, bound)) though

console.log(powerfulIntegers(2,3,10)) // [2,3,4,5,7,9,10]
console.log(powerfulIntegers(3,5,15)) // [2,4,6,8,10,14]
console.log(powerfulIntegers(2,1,10)) // [2,3,5,9]