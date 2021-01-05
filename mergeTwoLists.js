// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3592/

// Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

/**
 * Definition for singly-linked list.
 */

function ListNode(val, next) {
    this.val = val || 0
    this.next = next || null
}

//--------------------------------------

// the lists are already sorted which is helpful. I'll start by checking the values of the first two nodes against each other. The smaller value node's pointer will then iterate down that list until it finds a value >= the larger value node.
// the previous node to that's next will then be set to the larger node. The pointers will move down, and the process will begin again
// stopping point will be when one list hits a null next. that will set to whatever node the other pointer is pointing at, and then it should be done.
// return the original reference to whichever list had the smaller first node value at the start

const mergeTwoLists = (l1, l2) => {
    if (!l2) return l1
    if (!l1) return l2
    let a = l1.val <= l2.val ? l1 : l2
    let b = l1.val <= l2.val ? l2 : l1
    // need to save the pointer of whichever list has the smallest first value
    let result = l1.val <= l2.val ? l1 : l2
    while (a.next) {  
        // check the current pointer values against each other
        // whichever ones is smaller will move a pointer down so that the next value in the list can also be compared

        // a is always whichever list has the smallest values so
        // iterate through a's nodes until we hit a next value that's larger than b's current node value 
        // a.next's previous value to b, and b to a.next. a should also be set to the old be aka the new a.next
        // swaps, dude
        if (a.next.val <= b.val) a = a.next
        else {
            let temp = a.next // old a.next
            a.next = b
            a = a.next // new a.next
            b = temp
        }
    }
    // b will always be the list that has leftovers, so set a.next = b
    a.next = b
    return result
}

// 99% faster than other js submissions at O(n) :D
// ... I don't think a lot of js coders must do these

const l1 = new ListNode(1, new ListNode(2, new ListNode(4)))
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)))

console.log(mergeTwoLists(l1, l2))