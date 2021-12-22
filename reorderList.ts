// https://leetcode.com/problems/reorder-list/

// You are given the head of a singly linked-list. The list can be represented as:

// L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:

// L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.

// ----------------------------------------------------

import { ListNode, makeSLLFromArr, makeArrFromSLL } from "./utils/ListNode"

// head stays the same. it seems like the change needs to alternate between the first half of the list and the last half of the list in reverse order. Like it's folded together. The middle node(s) will wind up at the end.
// the second half of the list has to be reversed in pointer order, and then mashed with the first half of the list. I'd have to know where the midpoint is if I brute forced that, though.
// midpoint can be found with fast and slow ref pass through the list. fast moves two ref at a time while slow moves 1 at a time. By the time fast has iterated through, slow will reference the midpoint of the list.
// I think I could recursively do this next part. I'll iterate through the first half of the list until I find the reference, save .next, then point it at null. return .next, and that node will now point at the returned .next. 123 -> null return 45. I'd need to attach returned .next (4) to current .next (3) before returning return.next.next. will try :0

const reorderListFail = (head: ListNode | null): void => {
    let slow = head
    let fast = head.next
    let oddOrEven = 1
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        oddOrEven++
    }
    // now slow refs the midpoint
    if (oddOrEven % 2 === 0) slow = slow.next
    const weave = (node: ListNode | null): ListNode | null => {
        // want if midpoint: save curr.next to return, then point curr at null
        // else: save a returned node recursively. save returned's next and then point at current node.
        let currnext
        if (node === slow) {
            currnext = node.next // 4
            node.next = null            
        } else {
            let retnext = weave(node.next) // 4
            console.log('else: ', node.val, 'val: ', retnext.val)
            currnext = retnext.next // 3
            // console.log(node.val, retnext.val, currnext.val)

            retnext.next = node.next // 4 -> 2
            if (!currnext && oddOrEven % 2 === 0) {
                currnext = retnext  
            } else node.next = retnext // 1 -> 4
        }
        return currnext
    }
    weave(head)
    // console.log(makeArrFromSLL(head))
    console.log(head)
}

// oof had trouble with this one

const reorderList = (head: ListNode | null): void => {
    if (!head || !head.next || !head.next.next) return
  
    let slow = head
    let fast = head.next
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
    }
  
    let prev = slow.next
    let tail = prev.next
    // reverse
    while (tail) {
      const next = tail.next
      tail.next = prev
      prev = tail
      tail = next
    }
    slow.next.next = null
    slow.next = prev
  
    let left = head
    let right = slow.next
    slow.next = null
    // merge
    while (left && right) {
      const ln = left.next
      const rn = right.next
      left.next = right
      right.next = ln
      left = ln
      right = rn
    }
    console.log(makeArrFromSLL(head))
}

let list1 = makeSLLFromArr([1,2,3,4])
let list2 = makeSLLFromArr([1,2,3,4,5])
let list3 = makeSLLFromArr([1,2,3,4,5,6,7])

reorderList(list1) // [1,4,2,3]
reorderList(list2) // [1,5,2,4,3]
reorderList(list3) // [1,7,2,6,3,5,4]