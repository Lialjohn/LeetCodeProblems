// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/580/week-2-january-8th-january-14th/3601/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their ListNodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

//------------------------------------------

// so if the ListNodes were 2 -> 4 -> 3, the number I'd be looking at is 342. If the other number is 465 then what I'd have to return is a linked list 7 -> 0 -> 8.
// I can add the values together and create a new list with them as I move through, and then reverse it for O(2n). Straightforward enough. if I point at the previous node as I go through sums I can make it a tidy O(n).

class ListNode {
    constructor(v, next) {
        this.val = v ?? null
        this.next = next || null
    }
}

// for convenient viewing, just for me
const toArray = node => {
    let a = []
    while (node) {
        a.push(node.val)
        node = node.next
    }
    return a
}

const addTwoNumbers = (l1, l2) => {
    let head = null
    let prev = null
    let carryover = 0
    while (l1 || l2) {
        // sum. If the sum is over 10 (and it will never be more than 19) then adjust sum and increment carryover
        let sum = 0
        if (l1) {
            sum += l1.val
            l1 = l1.next
        }
        if (l2) {
            sum += l2.val
            l2 = l2.next
        }
        sum += carryover
        if (carryover) carryover--
        if (sum > 9) {
            carryover++
            sum -= 10
        }
        // now create a node with that sum. this node will be be assigned to prev.next
        let curr = new ListNode(sum)
        if (!head) {
            head = prev = curr
        }
        prev.next = curr
        prev = prev.next
    }
    // edge case, if the sum is only one node long, it'll reference itself. remove the self-reference
    if (head === prev) head.next = null
    // if there's still carryover (if the final sum was > 9) add a new node to accommodate
    if (carryover) prev.next = new ListNode(carryover)
    return toArray(head)
}

// I tried to reverse the list after the sum was made at first rather than do it while summing, this function is leftover from that solution
const reverse = node => {
    if(!node || !node.next) return node
    let prevPrev = null
    let prev = node
    let curr = node.next
    while (curr) {
        let nextNode = curr.next
        curr.next = prev
        prev.next = prevPrev
        prevPrev = prev
        prev = curr
        curr = nextNode
    }
    curr = prev
    return curr
}

let first = new ListNode(2, new ListNode(4, new ListNode(3)))
let second = new ListNode(5, new ListNode(6, new ListNode(4)))

let third = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))))
let fourth = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))

let fifth = new ListNode(5, new ListNode(6))
let sixth = new ListNode(5, new ListNode(4, new ListNode(9)))

let seventh = new ListNode(5)
let eighth = new ListNode(5)

console.log(addTwoNumbers(first, second)) // 708
console.log(addTwoNumbers(third, fourth)) // 89990001
console.log(addTwoNumbers(fifth, sixth)) // 0101
console.log(addTwoNumbers(seventh, eighth)) // 01 (shouldn't this be 10 according to the question??? test cases why)