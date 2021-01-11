// https://leetcode.com/explore/challenge/card/january-leetcoding-challenge-2021/580/week-2-january-8th-january-14th/3598/

// Given two words beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord, such that:

// Only one letter can be changed at a time.
// Each transformed word must exist in the word list.
// Return 0 if there is no such transformation sequence.
//--------------------------------

// hmmMMM. After yesterday's problem being so simple to do in js that I didn't bother to push it, this is more interesting.
// perhaps I could go through the list and note how many letters in each word are different from the start/end words? ex: hot is 1 away from hit, but 2 away from cog. dot is 2 away from both hit and cog. dog is 2 away from hit and 1 away from cog. 
// come up with words in between the two words? there's only 26 possibilities. constants are nice.
// ugh but then there's scenarios like hot->dot->dog. d doesn't match hit or cog but d is needed in order to get to g.
// so find these possibilities and stick them somewhere.
// I can check the list for words better if they're in an object. loop through and put them in a map... or err, just use a set if possible.


const ladderLength = (begin, end, list) => {
    const dict = new Set(list) // filter out repeated words
    let depth = 1   // the number of changes, starts at 1 because the first word/begin counts
    let queue = [begin] // put the first word into a queue. also using 'let' because I'll be reassigning new queues to it later

    while (queue.length) {
        const next = [] // the next queue
        // now loop over each word in the current queue
        for (let word of queue) {
            if (word === end) return depth
            // and each character of that word
            for (let i = 0; i < word.length; i++) {
                // get each alphabet letter and swap it for one in the word
                for (let j = 0; j < 26; j++) {
                    const newWord = word.slice(0, i) + String.fromCharCode(j + 97) + word.slice(i + 1)
                    // if this new word exists in the set made from list, push it to the next queue and delete it from the set
                    if (dict.has(newWord)) {
                        next.push(newWord)
                        dict.delete(newWord)
                    }
                }
            }
        }
        queue = next
        depth++
    }
    return 0
}

// making a set from list right at the start makes this at least O(n) time. The letter swaps are w.length * 26, and that's happening queue.length many times, which at a maximum will probably go through each word just once, as they're deleted from the dictionary as they're seen. That's O(n*m*26), not as bad as I thought it'd be tbh. space is about the same.

console.log(ladderLength("red", "tax", ["ted","tex","red","tax","tad","den","rex","pee"])) // 4
console.log(ladderLength("hot", "hit", ["hot","hit"])) // 2
console.log(ladderLength("hot", "dog", ["hot","dog"])) // 0
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])) // 5
console.log(ladderLength("hit", "ceg", ["hot","dot","dat","dag","dog","cog","ceg"])) // 6/
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"])) // 0
console.log(ladderLength("hot", "dog", ["hot","cog","dog","tot","hog","hop","pot","dot"])) // 3