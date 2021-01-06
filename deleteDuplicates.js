// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/579/week-1-january-1st-january-7th/3593/

// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

function ListNode(val, next) {
    this.val = val || 0
    this.next = next || null
}

//--------------------------------

// keep in mind that I have to remove all of the numbers that are dupes. If there are three 2s I remove all three of them, not leave one behind to be unique.

// just so I can easily see if the values are in the right order on return
const makeArray = head => {
    const a = []
    while (head) {
        a.push(head.val)
        head = head.next
    }
    return a
}
// instead of keeping curr moving blindly on ahead until it lands on whatever, make a dummy node and connect it to head. curr will start there and then check the next 2 values ahead of it. if they're different values, curr is safe to move forward one node. if they're the same, make another reference that will continue until it finds another number that doesn't match the dupe.
// set curr.next to this new ref. 
// this also means that the dummy node's next will hold the first valid node in the list for the return

const deleteDuplicates = head => {
    if (!head || !head.next) return head
    const dummy = new ListNode(null, head)
    let curr = dummy // finds dupes
    while (curr.next) {
        // compare the next 2 values after the current one
        if (curr.next.next && curr.next.val === curr.next.next.val) {
            // if y, then get the third node after current
            let dupe = curr.next.next.next
            // compare it to the first dupe's value to see if we need to go further down the list
            while (dupe && dupe.val === curr.next.val) {
                dupe = dupe.next
            }
            // when a new value node is found with dupe, set curr.next to it
            curr.next = dupe
        } else curr = curr.next
    }
    return makeArray(dummy.next)
}

// iterating through the entire list, O(n) time

const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5))))))) // [1,2,5]
const list2 = new ListNode(1, new ListNode(1, new ListNode(2))) // [2]
const list3 = new ListNode(1, new ListNode(2, new ListNode(2))) // [1]
const list4 = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(2)))) // []

console.log(deleteDuplicates(list)) // [1,2,5]
console.log(deleteDuplicates(list2)) // [2]
console.log(deleteDuplicates(list3)) // [1]
console.log(deleteDuplicates(list4)) // []