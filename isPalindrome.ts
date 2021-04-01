// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/593/week-1-april-1st-april-7th/3693/

// Given the head of a singly linked list, return true if it is a palindrome.

// ----------------------------------------------------

// I could record all values from the linked list and then move through those values a second time to check for a palindrome. There should be a way to do this in O(1) space though.

import { ListNode } from './utils/ListNode'

const isPalindrome = (head: ListNode | null): boolean => {
    const stack = []
    let curr = head
    while (curr) {
        stack.push(curr.val)
        curr = curr.next
    }
    curr = head
    while (curr) {
        if (stack.pop() !== curr.val) return false
        curr = curr.next
    }
    return true
}

const list1 = new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(2, new ListNode(1, new ListNode(0)))))))

console.log(isPalindrome(list1))