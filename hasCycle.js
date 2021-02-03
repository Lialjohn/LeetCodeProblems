// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3627/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.

//-------------------------------------------

// I could go through the list and add the nodes to a map or set or something and check if each subsequent node is in it. There's a way to solve this in O(n) space though, and that definitely wouldn't be it. Could also add an index param to the nodes as I go but mutating is bad :O and that would still be O(n) space.

// for O(1) space it seems obvious to have at least two pointers. What I know is that: the list may or may not have an end. I have nothing except these two hypothetical pointers.
// alright one pointer will move normally through the list one node at a time and the other pointer will double time it. The function returns when 1) fast pointer points to null or 2) when fast pointer overtakes slow pointer. Fast pointer will only overtake slow pointer if there's a loop. another O(n) time solution but O(1) space :D

const ListNode = function(val) {
    this.val = val
    this.next = null
}

// set solution
const hasCycleSet = head => {
    let visited = new Set()
    while (head) {
        if (visited.has(head)) return true
        visited.add(head)
        head = head.next
    }
    return false
}

// O(1) space solution
const hasCycle = head => {
    let fast = head
    let slow = head
    while (fast && fast.next) {
        if (fast === slow) return true
        fast = fast.next.next
        slow = slow.next
    }
    return false
}