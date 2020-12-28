// https://leetcode.com/problems/two-sum/

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
// ----------------------------------------------

// I vaguely remember doing this one way back but woo! doing it again before threesum
// two loops will give 2 pointers that add up every combination throughout, i + j where j is i + 1 + n
// once the correct sum is found will return [i, j]
// that's the brute force O(n^2) version, although there's also the O(n) hashmap version

const twoSumBF = (nums, target) => {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i+1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j]    
        }
    }
}

const twoSum = (nums, target) => {
    // hashmap version!
    // If I subtract the first element from the target and save the resulting number in a map, I can check each subsequent number to see if it's a number that exists inside the map. I'll need to save the index the first number was at as the value and the pair number as the key
    const pairs = {}
    for (let i = 0; i < nums.length; i++) {
        if (pairs[nums[i]] !== undefined) return [pairs[nums[i]], i]
        pairs[target - nums[i]] = i
    }
}

// console.log(twoSum([2,7,11,15], 9)) // [0,1]
// console.log(twoSum([3,2,4], 6)) // [1,2]
// console.log(twoSum([3,3], 6)) // [0,1]

// ----------------------------------------------
// https://leetcode.com/problems/3sum/

// Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

// Notice that the solution set must not contain duplicate triplets.
// ----------------------------------------------

// should be able to simplify this problem so that the solution is similar to twoSum
// if I subtract 1 number from 0 I get a new target for two other numbers to sum to, which is essentially twoSum
// for each element in nums, I'll subtract it from 0 for the new target. Each iteration will have an object that records (target - nums[i]) - nums[j]: true
// unlike twoSum I'd go through every iteration instead of returning on the first encountered match.
// there'd still be the problem of duplicate
// in order to reach 0 in a sum, you'd have to have both a positive and negative numbers

const threeSumBF = nums => {
    const triples = []
    // map for checking triples duplicates
    const check = {}
    for (let i = 0; i < nums.length - 2; i++) {
        // get our target for the inner loop
        const target = 0 - nums[i]
        // the map to record target - nums[j] results
        const inner = {}
        for (let j = i + 1; j < nums.length; j++) {
            if (inner[nums[j]]) {
                // solution key for the check map
                let sol = [nums[i], nums[j], target - nums[j]].sort()
                let str = `${sol[0]}&${sol[1]}&${sol[2]}`
                if (check[str]) continue
                check[str] = true
                triples.push(sol)
            }
            inner[target - nums[j]] = true
        }
    }
    return triples
}

// the above works but not particularly well, especially with space oof
// let's try again

const threeSum = nums => {
    const triples = []
    // sort, because the loops will be about O(n^2) so sort()'s O(nlogn) won't slow it down overmuch
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 2; i++) {
        // since the array is now sorted, we can avoid dupes easily by checking the previous element. if the element at i is the same as the previous, skip
        if (i > 0 && nums[i] === nums[i-1]) continue
        // 2 pointers instead of 1, one for the usual j, and another that starts at the end of nums and works its way towards j
        let j = i + 1
        let l = nums.length - 1
        while (j < l) {
            const sum = nums[i] + nums[j] + nums[l]
            // on success move both pointers, else on fail move one pointer dependent on sum result. If sum > 0 then we need to make the next sum smaller, so move the l pointer. If sum < 0 we need it to be greater, so move pointer j forward instead
            if (sum === 0) {
                // success
                triples.push([nums[i], nums[j++], nums[l--]])
                // skip all the dupes
                while (j < l && nums[j] === nums[j - 1]) j++
                while (j < l && nums[l] === nums[l + 1]) l--
            } // and failure
            else if (sum > 0) l--
            else if (sum < 0) j++
        }
    }
    return triples
}


console.log(threeSum([-1,0,1,2,-1,-4])) // [[-1,-1,2], [-1,1,0]]
console.log(threeSum([0,0,0,0])) // [0,0,0]
console.log(threeSum([0])) // []

// time O(n^2) space same