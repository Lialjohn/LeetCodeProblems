// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3589/

// You are given an array of distinct integers arr and an array of integer arrays pieces, where the integers in pieces are distinct. Your goal is to form arr by concatenating the arrays in pieces in any order. However, you are not allowed to reorder the integers in each array pieces[i].

// Return true if it is possible to form the array arr from pieces. Otherwise, return false.
// --------------------------------------------

// loop through each element in arr, checking against the arrays in pieces for matching numbers...
// 49 -> look for an array which has the value 49 at [0]
// if one is found, move pointer for arr & pieces[n] to find the next element 18. if pieces[n][p+1] doesn't match, It's definitely false. If I found something like [49, 15] in pieces when arr is [49, 13], the second number being wrong means I must return false. There'd be no other 49 element to find in pieces.
// If current element in arr isn't found at any [0], then return false
// this approach could use a binary search for the second pointer, although I'd have to order the arrays in pieces via sort((a, b) => a[0] - b[0]) first
// I think that'd be O(nlogm) where n is arr and m is pieces

//naive solution with some binary search
const canFormArrayN = (arr, pieces) => {
    pieces.sort((a,b) => a[0] - b[0])
    for (let i = 0; i < arr.length; i++) {
        // do a binary search for the current element
        const m = bs(pieces, arr[i])
        if (m >= 0) {
            for (let x = 1; x < pieces[m].length; x++) {
                if (arr[i+1] !== pieces[m][x]) return false
                i++
            }
        } else return false
    }
    return true
}

const bs = (pieces, v) => {
    let start = 0
    let end = pieces.length - 1
    let mid = Math.floor((start + end) / 2)
    while (pieces[mid][0] !== v && start <= end) {
        if (v < pieces[mid][0]) end = mid - 1
        else start = mid + 1
        mid = Math.floor((start + end) / 2)
    }
    return pieces[mid][0] === v ? mid : -1
}

// this one is a bit faster at O(n). Instead of comparing elements directly against each other, this method saves the indices for arr into a map, using the elements as keys
// if the element being checked in pieces[i] exists in the map, I'll get the index of that element in arr back, or -1 if undefined.
// variable p in the outer loop starts invalid but once any match is found, will be assigned to the index in memo instead. if there are more numbers in pieces[i], the loop will continue to iterate through them and check if the new index returned from memo matches the previous index + 1
// this is only possible because all numbers only occur once in both pieces and arr, and also arr and pieces must contain the exact same number of... numbers overall. Any non-matching number will return a false.
const canFormArray = (arr, pieces) => {
    const memo = {}
    for (let i = 0; i < arr.length; i++) memo[arr[i]] = i
    for (let i = 0; i < pieces.length; i++) {
        let p = -1
        for (let j = 0; j < pieces[i].length; j++) {
            // get back the index in arr for the element or -1
            let index = memo[pieces[i][j]] ?? -1
            // if the pieces element doesn't exist in array, or it does but has the wrong index, return false
            if (index === -1 || (p !== -1 && index !== p + 1)) return false
            p = index
        }
    }
    return true
}

console.log(canFormArray([85], [[85]])) //true
console.log(canFormArray([12,21,11,22], [[12,21], [1,2]])) //false
console.log(canFormArray([1,2,3], [[1], [3,2]])) //false
console.log(canFormArray([15, 88], [[88],[15]])) //true
console.log(canFormArray([49,18,16], [[16,18,49]])) //false
console.log(canFormArray([91,4,64,78], [[78], [4,64], [91]])) //true
console.log(canFormArray([37,69,3,74,46], [[37,69,3,74,46]])) //true