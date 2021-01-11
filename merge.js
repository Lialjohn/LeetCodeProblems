// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/580/week-2-january-8th-january-14th/3600/

// Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

// The number of elements initialized in nums1 and nums2 are m and n respectively. You may assume that nums1 has enough space (size that is equal to m + n) to hold additional elements from nums2.

//----------------------------------------

// called merge but is not merge sort :O
// nums2 will only ever have n elements, no extra zeroes to worry about.
// I also am not returning anything, which is interesting. I should be modifying nums1 in-place instead.
// possible o(nm) solution is to move through the first array comparing each element to the first element in nums2. if nums2[j] < nums1[i] or nums[i] === 0 && i >= m, then swap them both. 
// the problem with this is that it kind of sucks. better to simply replace indices at m+ with nums2 and then do a built in sort(). I want to get a time that's at least as good as O(nlogn) without using a built in method for the main operation.
// ok what if I start from the end of nums1 and start replacing zeroes with the largest numbers first. if nums1[m - 1] > nums2[n - 1], then it's replaced with nums1's number or nums2's otherwise. The array which has a number swapped will decrement its index while the other's will stay put.
// this'll make a tidy 0(n+m) solution


const merge = (nums1, m, nums2, n) => {
    let i1 = m - 1 // starting comparison index for nums1
    let i2 = n - 1 // starting comparison index for nums2
    for (let x = m + n - 1; x >= 0 ; x--) {
        // if we go through all of nums2 early, quit out
        if (i2 < 0) break
        // do the compares and such
        if (nums1[i1] > nums2[i2]) {
            nums1[x] = nums1[i1--]
        } else {
            nums1[x] = nums2[i2--]
        }
    }

    console.log(nums1)
}

merge([4,6,9,10,11,12,0,0,0,], 6, [2,5,6], 3) // [2,4,5,6,6,10,11,12]
merge([-1,3,0,0,0,0,0], 2, [0,0,1,2,3], 5) // [-1,0,0,1,2,3,3]
merge([1], 1, [], 0) // [1]