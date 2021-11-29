// https://leetcode.com/problems/accounts-merge/

// Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

// Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

// After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

// ------------------------------------------------

// I'll need to find common names and then check to see if any emails appear 2+ times. If yes, merge, if no, just sort the emails.
// all accounts owned by the same person have the same name and consist of english letters, but are they guaranteed to use the same case?
// will want a result array that I add accounts to, as that'll be easier than removing elements of an original copy.
// DFS? union find?
// get one entry, enter first email into map, look for that email in other entries of 'john'. emails that have already been searched for will be memo'd. If a match is found, merge. will sort at the end, unless i think of another way to keep them sorted as the program runs
// since emails can be unique and I'm looking specifically for dupes, I can make connections through emails. Taking one email and grouping all others that are connected to it, connected being: in the same array or in the same array as another email that is connected, etc.
// johnsmith@m.com will be connected to jsmith@m.com and if jsmith@m.com is found in another array... I'd need to make it a key in a map for best time.
// stick them all in an object with child: parent keys, starting with each one being parent to itself. jsmith@m.com parent will be johnsmith@m.com. will need to keep track of names for each of them as well.
// once all connections are made put groups of emails, distinguished by parents, into new arrays beginning with name, which can be found by using the parent email as a key in a name array.
// then .sort() each. donezo

const accountsMerge = (accounts: string[][]):string[][] => {
    const connections = {}
    const owners = {}
    const find = (key: string): string => {
        // find last parent, which will be the email that returns itself
        // if the key !== value, recursively search connection map with whatever value was returned to find its parent and so on until the head parent is returned
        if (connections[key] !== key) return find(connections[key])
        return connections[key]
    }
    const union = (child: string, parent: string): void => {
        // connect the original parent of child to the original parent of parent.
        connections[find(child)] = connections[find(parent)]
    }
    for (let [name, ...emails] of accounts) {
        for (let email of emails) {
            // first: make each email owner of itself
            // or if it already exists in connections, make the already existing value the new top parent in the current set.
            // 
            if (!connections[email]) {
                connections[email] = email
            } else {
                union(emails[0], connections[email])
            }
            owners[email] = name
            // make each subsequent email the child of the first email in the list, which'll be the top level parent for the group 
            union(connections[email], emails[0])
        }
    }
    const sets = {}
    const res = []
    // iterate through connections obj
    // get top level parent for the set, make new entries in new object for each one, which will collect all children in arrays
    for (let key in connections) {
        let parent = find(connections[key])
        if (!sets[parent]) sets[parent] = []
        sets[parent].push(key)
    }
    // now sort each resulting array, push copy to res array along with the owner's name
    for (let key in sets) {
        let owner = owners[sets[key][0]]
        sets[key].sort()
        res.push([owner, ...sets[key]])
    }
    return res
}

console.log(accountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],
                           ["John","johnsmith@mail.com","john00@mail.com"],
                           ["Mary","mary@mail.com"],
                           ["John","johnnybravo@mail.com"]])) 
                           // [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
                           //  ["Mary","mary@mail.com"],
                           //  ["John","johnnybravo@mail.com"]]
console.log(accountsMerge([["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],
                           ["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],
                           ["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],
                           ["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],
                           ["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]])) 
                           // [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],
                           //  ["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],
                           //  ["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],
                           //  ["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],
                           //  ["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
console.log(accountsMerge([["David","David0@m.co","David1@m.co"],
                           ["David","David3@m.co","David4@m.co"],
                           ["David","David4@m.co","David5@m.co"],
                           ["David","David2@m.co","David3@m.co"],
                           ["David","David1@m.co","David2@m.co"]]))
                        // [["David","David0@m.co","David1@m.co","David2@m.co","David3@m.co","David4@m.co","David5@m.co"]]
