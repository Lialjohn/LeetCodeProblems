// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3660/

// Write a program to find the node at which the intersection of two singly linked lists begins.
// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Each value on each linked list is in the range [1, 10^9].
// Your code should preferably run in O(n) time and use only O(1) memory.

// ---------------------------------------------------------------------

// So I have to find the first shared reference, if there is one.
// It seems tough to find any shared node without some information: how long is each linked list and are the final nodes shared? With the lengths, I can use the difference between them to check nodes. If the final nodes are the same, that is.
// so let's say I move through both of them, counting nodes. And then when I reach the final nodes, I compare. If they match, continue on. if not, return null
// I go through the lists a second time, except I skip ahead x times for the longer list. after that, I iterate normally with two pointers, checking if nodes are the same.

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = val || 0
        this.next = next || null
    }
}

const getIntersectionNode = (A: ListNode | null, B: ListNode | null): ListNode | null => {
    let aLength = 1
    let bLength = 1
    let i = A
    let j = B
    while (i || j) {
        if(i) {
            i = i.next
            aLength++
        }
        if(j) {
            j = j.next
            bLength++
        }
    }
    let diff = Math.abs(aLength - bLength)
    i = A
    j = B
    if (aLength < bLength) [i, j] = [j, i]
    while (diff--) i = i.next
    while (true) {
        if (i === j) return i
        else {
            i = i.next
            j = j.next
        }
    }
}

// Three while loops seems slightly excessive but it works! And very speedily with little memory usage :D O(n) time, O(1) space