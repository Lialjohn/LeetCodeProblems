// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3707/

// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// ------------------------------------------------------

// going through the list to actually find these nodes is a given. I'd move through the list and create a second list for each node that's less than, decoupling those nodes from the first list as I go. after it's all done, set the tail of the lesser than list to the head of the greater than/equal list. O(n) time O(1) space
// for decoupling I'd need the current node, the previous node, and the next node. so make var for previous, current. also need vars for both head and tail of the lesser than list. 

import { ListNode, makeSLLFromArr, makeArrFromSLL } from './utils/ListNode'

const partition = (head: ListNode | null, x: number): ListNode | null => {
    // go through the list, finding the < nodes as I do
    let lesserTail: ListNode | null = null
    let lesserHead: ListNode | null = null
    let prev: ListNode | null = null
    let curr = head
    while (curr) {
        if (curr.val < x) {
            // decouple. set the previous.next to curr.next. set lesser.next to curr, and move the lesserTail up
            // also protect head from linking to itself in the event head is lesser than
            if (curr === head) head = head.next
            if (prev) prev.next = curr.next
            if (lesserTail) {
                lesserTail.next = curr
                lesserTail = lesserTail.next
            }
            else lesserHead = lesserTail = curr
        } else prev = curr // only needed if curr.val is >=
        // always move curr to curr.next
        curr = curr.next
    }
    if (lesserTail) lesserTail.next = head
    return lesserHead || head
}

const list1 = makeSLLFromArr([1,4,3,2,5,2])
const list2 = makeSLLFromArr([1,2])

console.log(makeArrFromSLL(partition(list1, 3))) // [1,2,2,4,3,5]
console.log(makeArrFromSLL(partition(list2, 2))) // [1,2]