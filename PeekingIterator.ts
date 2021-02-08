// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/585/week-2-february-8th-february-14th/3633/

// Given an Iterator class interface with methods: next() and hasNext(), design and implement a PeekingIterator that support the peek() operation -- it essentially peek() at the element that will be returned by the next call to next().

// Assume that the iterator is initialized to the beginning of the list: [1,2,3].

// Call next() gets you 1, the first element in the list.
// Now you call peek() and it returns 2, the next element. Calling next() after that still return 2. 
// You call next() the final time and it returns 3, the last element. 
// Calling hasNext() after that should return false.

// -----------------------------------------------------------------------

// I "should not implement [the iterator], or speculate about its implementation" so no test examples here. it has hasNext() and next() methods.
// sooo, there's no way to do anything except call the iterators next() to get the next element for peek(). what I'll do is call next() and stash it in the class's attributes to return the next time peekings next() is called. Check if an element is stored, otherwise operate on the iterator normally. I could also have another attribute for whether or not the user has peeked.

// I have no idea what the time for the iterator methods are but for peeking iterator this is an easy O(1)

class PeekingIterator {
    iterator: Iterator
    peeked: boolean
    cache: number | null
    constructor(iterator: Iterator) {
        this.iterator = iterator
        this.peeked = false
        this.cache = null
    }
    peek(): number {
        if (!this.peeked) {
            this.cache = this.iterator.next()
            this.peeked = true
        }
        return this.cache
    }
    next(): number {
        if (!this.peeked) return this.iterator.next() ?? null
        const temp = this.cache
        this.cache = null
        this.peeked = false
        return temp
    }
    hasNext(): boolean {
        if (!this.peeked) return this.iterator.hasNext()
        return !!(this.cache ?? false)
    }
}