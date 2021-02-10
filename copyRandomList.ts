// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3635/

// A linked list of length n is given such that each ListNode contains an additional random pointer, which could point to any ListNode in the list, or null.

// Construct a deep copy of the list. The deep copy should consist of exactly n brand new ListNodes, where each new ListNode has its value set to the value of its corresponding original ListNode. Both the next and random pointer of the new ListNodes should point to new ListNodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to ListNodes in the original list.

// For example, if there are two ListNodes X and Y in the original list, where X.random --> Y, then for the corresponding two ListNodes x and y in the copied list, x.random --> y.

// Return the head of the copied linked list.

// The linked list is represented in the input/output as a list of n ListNodes. Each ListNode is represented as a pair of [val, random_index] where:

// val: an integer representing ListNode.val
// random_index: the index of the ListNode (range from 0 to n-1) that the random pointer points to, or null if it does not point to any ListNode.

// Your code will only be given the head of the original linked list.

// ------------------------------------------------------

// I suppose the tricky part here is getting the random pointers right.
// there can be duplicate values so I can't rely on those to tell me which ListNode is being pointed to. 
// the ListNode's random can also point to itself
// I'll create an array and stash the old ListNodes in it. go through again, check random against the array. if it exists, stash the index of it in is another new array so that I have an array of indices.
// when I make each ListNode in the new list, I'll also stash them into an array. when I make each one, I'll check the newListArray[randIndex] to see if the random ListNode exists or not. if it doesn't, make it and point, else just point.
// this approach means three new arrays of length n and probably O(n^2) time, oof. also it just seems overly complicated.
// the hints indicate I can interweave to avoid using all this extra space and time.
// ok... make a new ListNode, place it between the current ListNode and next ListNode so I get a list like orig -> copy -> orig -> copy -> etc. when I look at a ListNode.random I can assign random.next to be pointed at by ListNode.random. 
// makes for a much cleaner solution. If I loop through the list each time I 1) interweave, 2) assign randoms 3) reassign next pointers then I'd get a total time of about O(3n), although I think I could cut it down a bit if I made the code a little more compact (and also confusing)

class ListNode {
    val: number
    next: ListNode | null
    random: ListNode | null
    constructor(val?: number, next?: ListNode, random?: ListNode) {
        this.val = val || 0
        this.next = next || null
        this.random = random || null
    }
}

const copyRandomList = (head: ListNode | null): ListNode | null => {
    if (!head) return head
    let curr: ListNode | null = head
    // while curr exists, make a new ListNode, insert it between curr and curr.next
    while (curr) {
        const oldNext = curr.next
        curr.next = new ListNode(curr.val, oldNext)
        curr = oldNext
    }
    // start over from the start to assign randoms. 
    curr = head
    const newHead: ListNode | null = head.next
    while (curr) {
        const newListNode: ListNode | null = curr.next
        if (curr.random) newListNode.random = curr.random.next
        else newListNode.random = null
        curr = newListNode.next
    }
    // then reassign the nexts so that they're all pointing to the nexts in their own lists
    curr = head
    while (curr) {
        const newNode: ListNode | null = curr.next
        curr.next = curr.next.next
        newNode.next = newNode.next && newNode.next.next
        curr = curr.next
    }
    return newHead
}

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
node1.next = node2
node2.next = node3
node2.random = node1

console.log(copyRandomList(node1))