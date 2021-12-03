// https://leetcode.com/problems/odd-even-linked-list/

// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

// The first node is considered odd, and the second node is even, and so on.

// Note that the relative order inside both the even and odd groups should remain as it was in the input.

// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

// ----------------------------------------------
import { ListNode, makeSLLFromArr, makeArrFromSLL } from "./utils/ListNode"

// note indices does not refer to values
// n can be 0 or very large. must be O(n) time and O(1) space-- doing this in one iteration and in place most like
// so as I iterate through the list, I want to uncouple the even nodes, couple the odd nodes they were between, and then attach the assembled list of even nodes at the odds tail.
// I'll want to keep a reference to the original head and return it, as well as a reference to the evens head.
// Don't necessarily need to keep index, because once the first even node is uncoupled, I just repeat the process on the next node in the odds list and so on
// recursively I could attach the odds to each other, get the reference to the even node, and attach it to the previous evens reference, if it exists. would need args: head of evens, tail of evens
// iteratively I can keep track of those references in variables. attach new tail or head/tail to evens list, change odd.next to even.next, change even.next to null.

const oddEvenList = (head: ListNode | null): ListNode | null => {
    let evenHead = null
    let evenTail = null
    let odd = head
    let oddPrev = null
    while (odd) {
        if (!evenTail) {
            evenTail = evenHead = odd.next
        } else {
            evenTail.next = odd.next
            if (evenTail) evenTail = evenTail.next
        }
        if (evenTail) {
            odd.next = evenTail.next
            evenTail.next = null
        }
        oddPrev = odd
        odd = odd.next
    }
    // attach evenHead to oddTail
    if (oddPrev) oddPrev.next = evenHead
    return head
}

// this works, but I don't love all the if statements. I can do bettterr
// right now the loop only runs on odd. when odd becomes null, I need a bunch of checks to make sure an error doesn't occur, considering all those .nexts of different swapping references.
// If I can limit the number of variables, I can reduce this. Can I do this with fewer than 4 references?
// right now I'm separating all even nodes into a separate list, and attaching it at the end. Maybe I can shuffle them somehow. Dang I wish I had my sketchbook.
// If I store even in one reference, and connect odd to odd.next.next (odd -> odd), move forward on odd so odd = odd.next, even.next should then be attached to the next even, which is the node right after that odd.next. This removes the need for the reference following odd's tail, oddPrev, because you can check for whether both an odd && even node still exist in the loop condition.

const oddEvenListNeat = (head: ListNode | null): ListNode | null => {
    if (!head) return head
    let odd = head
    let evenHead = head.next

    while (odd && odd.next) {
        let even = odd.next
        odd.next = odd.next.next
        if(odd.next) {
            odd = odd.next
            even.next = odd.next
        }
    }
    odd.next = evenHead
    return head
}

const list1 = makeSLLFromArr([1,2,3,4,5])
const list2 = makeSLLFromArr([2,1,3,5,6,4,7])
console.log(makeArrFromSLL(oddEvenList(list1))) // [1,3,5,2,4]
console.log(makeArrFromSLL(oddEvenList(list2))) // [2,3,6,7,1,5,4]
console.log(oddEvenList(new ListNode(2))) // 2
console.log(oddEvenList(null)) // null