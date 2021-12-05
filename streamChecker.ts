// https://leetcode.com/problems/stream-of-characters/

// Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings words.

// For example, if words = ["abc", "xyz"] and the stream added the four characters (one by one) 'a', 'x', 'y', and 'z', your algorithm should detect that the suffix "xyz" of the characters "axyz" matches "xyz" from words.

// Implement the StreamChecker class:

// StreamChecker(String[] words) Initializes the object with the strings array words.
// boolean query(char letter) Accepts a new character from the stream and returns true if any non-empty suffix from the stream forms a word that is in words.
// --------------------------------------------------

// letter sent to query will always be a lowercase english letter. In order to avoid checking each word in the given string[] on every query call, it seems efficient to go through those words once and record what suffixes exist in the array in a map, that way query would be a quick O(1) operation. 
// I do think I'm probably misunderstanding the question and will have to come back with a wrong answer submission to get an example that makes it more clear to me.
// so what I think is supposed to happen is the stream of characters should form a word or part of a word in words[]. The description uses 'xyz' from 'axyz' though, so I'm not sure if you should return true only when the whole word is formed or some part of the tail end that is > 1
// seems like it's the whole word. oh, that's because the suffix refers to the stream and not the word. d'oh.
// so if the stream constitutes on big word, I'd check if the final given letters match any word in words[] and return a bool. 
// it makes sense to me to start a search from the final letter given. if 'f', search for if 'f' matches the final letter in any word, then the next letter, and so on. There's a way to do this without checking every character in each word every time. A tree structure probably.
// there are 26 possible ways to search for each letter, 26 for each of those 26, and so on. 
// If I could build a search structure based on the array, how would I do it.
// If I make a tree where each letter branches to possible connections, already found in the array, I can do searches through parents and children. there can be 2000 words which are 2000 characters long, so it's very possible that each query could be 2000 operations. Not sure it would time out or not.
// I check if the first character is in a map representing possible first characters. Each letter links to another map with a set of further connections. I'd need to signal when a letter is last in a word, so the value for that letter would potentially be something like 1 instead of a map or undefined. 
// I'd need to keep track of my current place in this hypothetical tree. A letter comes in, and if a connection is found, the reference moves forward. If a letter comes up that breaks the chain, reset the reference. this.curr will start as this.tree, then when a match is found, change reference to that value, which will either be another object or 1.
// ah better to use extra param in object instead of changing it entirely probably, especially if I've got two overlapping words it won't be good if it ends the check prematurely and the letter 
// oorrr, resetting could be a problem. take "aa" and "ab". if "aa" is found and the reference resets, then "b" will return false, even though the last two letters were 'a' and 'b'. I'd need to be able to reference 'b' from 'a' just like I referenced 'a' from 'a'. "abc" "bcd", "bcde" I want to be able to get to c, and when c is found to be an end, true or false, be able to form a new word from "abc".
// oof I can record all the letters given through stream and look through them each time for a match to the tree. I'd also need an alternate let's see if I time out \o/

class StreamChecker {
    tree: object | number = {}
    stream: string[] = []
    constructor(words: string[]) {
        for (let word of words) {
            // keep track of where we are in tree. as we build this part of the tree, can just insert new branches as needed and swap for next letter in iteration.
            let ref = this.tree
            for (let i = word.length - 1; i >= 0; i--) {
                if (i === 0) ref[word[i]] = 1
                else {
                    // if next letter is already in branch and === 1, no need to do any more. break off
                    if (ref[word[i]] === 1) break
                    if (!ref[word[i]]) ref[word[i]] = {}
                    ref = ref[word[i]]
                }
            }
        }
    }
    query(letter: string) {
        this.stream.push(letter)
        let curr = this.tree
        for (let i = this.stream.length - 1; i >= 0; i--) {
            if (!curr[this.stream[i]]) return false
            else {
                curr = curr[this.stream[i]]
                if (curr === 1) return true
            }
        }
        return false
    }
}

const streamOne = new StreamChecker(["ab", "ba", "aaab", "abab", "baa"])

console.log(streamOne.query('a'))
console.log(streamOne.query('a'))
console.log(streamOne.query('a'))
console.log(streamOne.query('a'))
console.log(streamOne.query('a'))
console.log(streamOne.query('b'))
console.log(streamOne.query('a'))
console.log(streamOne.query('b'))
console.log(streamOne.query('b'))
console.log(streamOne.query('b'))
console.log(streamOne.query('b'))