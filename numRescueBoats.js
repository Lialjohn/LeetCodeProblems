// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/580/week-2-january-8th-january-14th/3602/

// The i-th person has weight people[i], and each boat can carry a maximum weight of limit.

// Each boat carries at most 2 people at the same time, provided the sum of the weight of those people is at most limit.

// Return the minimum number of boats to carry every given person.  (It is guaranteed each person can be carried by a boat.)

//----------------------------------------------------

// can I add the numbers into buckets of an array and return the length?
// I could also sort the array and do a 2 sum sort of thing with pointers. There are only 2 people allowed per boat so that's a total of n + n maximum
// If I do one set of iterations going from smallest -> largest and converting all 'used' numbers to 0, and then do a second to catch all remaining numbers... or even just add a boat for every number that gets skipped on the first iteration. If a larger number can't be summed with the smallest available number, it needs its own boat.
// like if I had [1,1,2,3,3,4,5,6] with a limit of 6, the first run could give me [0,0,0,3,0,0,0,6], the second would be skipped and the last loop would catch the remaining numbers for a result of 5. [2,3,3,4,5,6] -> [0,0,0,0,5,6], [2,2,3,4,4,5,6] -> [0,0,3,0,0,5,6]
// and if I'm only going through the entire array once, I don't have to convert to 0s.

const numRescueBoatsWithSort = (people, limit) => {
    // need: a var for boats. and to sort people
    let boats = 0
    people.sort((a,b) => a - b)
    let i = 0
    let j = people.length - 1
    while (i <= j) {
        // add the two numbers. if they're <= limit, move i. j moves regardless. add a boat.
        let sum = people[i] + people[j]
        if (sum <= limit) i++
        j--
        boats++
    }
    return boats
}

// accepted. However I'd like to try a solution that doesn't rely on sort(), as it's an in built method and tbh slows down what would be an O(n) solution otherwise.
// rather than making a new array to group 2 people, an array to group people by their weights since one's weight is >= 1 and <= limit. Their can be limit # of buckets.
// then use 2sum in a similar sort of way, except now they're grouped together.
// if i + j <= limit, add boats that are math.min(weights[i], weights[j]). subtract the smaller number of weights from both buckets, and move the index for the one that was just drained. 

const numRescueBoats = (people, limit) => {
    const weights = []
    for (let person of people) {
        weights[person] = weights[person] + 1 || 1
    }
    let i = 1
    let j = limit
    let boats = 0
    while (i <= j) {
        if (!weights[j]) j--
        else if (!weights[i]) i++
        else {
            if (i + j <= limit) {
                if (i === j) boats += Math.ceil(weights[i++] / 2)
                else if (weights[j] <= weights[i]) {
                    boats += weights[j]
                    weights[i] -= weights[j]
                    j--
                } else {
                    boats += weights[i]
                    weights[j] -= weights[i]
                    i++
                }
            } else {
                boats += weights[j--]
            }
        }
    }
    return boats
}

// the weights array is time O(n), space 0(limit). The while loop is a little more complicated than if I was decrementing weights 1 at a time, but as it is it's O(limit), to make worst time O(n)

console.log(numRescueBoats([1,2], 3)) // 1
console.log(numRescueBoats([3,2,2,1], 3)) // 3
console.log(numRescueBoats([3,5,3,4], 5)) // 4
console.log(numRescueBoats([], 5)) // 0
console.log(numRescueBoats([2], 5)) // 1
console.log(numRescueBoats([2, 2], 6)) // 1