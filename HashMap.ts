// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/588/week-1-march-1st-march-7th/3663/

// Design a HashMap without using any built-in hash table libraries.

// To be specific, your design should include these functions:

// put(key, value) : Insert a (key, value) pair into the HashMap. If the value already exists in the HashMap, update the value.
// get(key): Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
// remove(key) : Remove the mapping for the value key if this map contains the mapping for the key.

// -----------------------------------------------------

// without using any built in hash table libraries means no objects, since objects in js are technically hashmaps. Using an array might be fine? but technically that's an object too uuuu
// 

class MyHashMap {
    map: number[]
    constructor() {
        this.map = []
    }
    put(key: number, value: number): void {
        this.map[key] = value
    }
    get(key: number): number {
        return this.map[key] ?? -1
    }
    remove(key: number): void {
        this.map[key] = undefined
    }
}

// accepted, and I'm comforted by the fact that pretty much every other submission is using object literals and Maps. O(1) time on all ops and O(highest given key) space