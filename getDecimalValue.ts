// https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/

// Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

// Return the decimal value of the number in the linked list.

// ------------------------------------------------------------------

import { ListNode, makeSLLFromArr } from "./utils/ListNode"

// I'll be getting the nodes in reverse to how I'd like to get them. I can reverse the list and get the numbers from there, adding values according to index OR
// I can do the way lazier approach of collecting each value in a string and just convert it through parseInt(). I suppose it depends on if I want to use an in built method or not

const getDecimalValue = (head: ListNode | null): number => {
    let str = ''
    while (head) {
        str += head.val
        head = head.next
    }
    return parseInt(str, 2)
}

const getDecimalValueRev = (head: ListNode | null): number => {
    // to reverse a list, I'd need 1: ref to the previous node, 2: ref to headent node, 3: ref to next node.
    // I'd need to save head.next in temp ref, then point head.next to prev node
    let prev = null
    let next = null
    while (head) {
        next = head.next
        head.next = prev
        prev = head
        head = next
    }
    head = prev
    let i = 1
    let sum = 0
    while (head) {
        if (head.val === 1) sum += i
        // increase i by power of 2
        i <<= 1
        head = head.next
    }
    return sum
}

let list1 = makeSLLFromArr([1,0,0,1,0,0,1,1,1,0,0,0,0,0,0])
let list2 = makeSLLFromArr([1,0,1])
let list3 = makeSLLFromArr([1])
let list4 = makeSLLFromArr([0,0])

console.log(getDecimalValueRev(list1)) // 18880
console.log(getDecimalValueRev(list2)) // 5
console.log(getDecimalValue(list3)) // 1
console.log(getDecimalValue(list4)) // 0