// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3706/

// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

// Implement the NestedIterator class:

// NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
// int next() Returns the next integer in the nested list.
// boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.

// ------------------------------------------------------

// alright, so I'm to assume NestedIterator is instantiated with an object like [1,3,[3,7,[9],[4,5]],2] and I need to be able to deliver those like 1,3,3,7,9,4,5,2. I swear that 1337 was accidental.
// nestedInteger functions I can use: isInteger, getInteger, getList
// I could make a new list within the nestediterator class that holds a flattened version of the given list. Meaning I'd need a whole other method to take care of that, which isn't ideal. space O(n), time O(n), O(1) for next and hasnext.
// this is not super space efficient as I'd be copying all elements into the iterator. Ideally I'd want to be able to travel along the list of nested integers as needed, but a better way to do that isn't occurring to me. Or anyone else, apparently, since I checked to discussion boards too D:

class NestedIterator {
    #list: number[]
    #i: number
    constructor(nestedList: NestedInteger[]) {
        this.#list = []
        this.unwind(nestedList)
        this.#i = 0
    }
    hasNext(): boolean {
        return this.#i < this.#list.length
    }
    next(): number {
        return this.#list[this.#i++]
    }
    unwind(list: NestedInteger[]): void {
        // iterate through.
        // if the current i is an integer, record it in #list. if it's an array, recursively call this.unwind.
        for (const e of list) {
            if (e.isInteger()) this.#list.push(e.getInteger())
            else this.unwind(e.getList())
        }
    }
}