// https://leetcode.com/explore/challenge/card/february-leetcoding-challenge-2021/584/week-1-february-1st-february-7th/3629/

// Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

// In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

// The canonical path should have the following format:

// The path starts with a single slash '/'.
// Any two directories are separated by a single slash '/'.
// The path does not end with a trailing '/'.
// The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')
// Return the simplified canonical path.

//--------------------------------------

// I could split the string and the add or remove elements to/from a stack.
// when I iterate through the split string, add if there's a file name. pop off the last folder if the element is a double period. single periods are ignored.

const simplifyPath = path => {
    const stack = []
    const parr = path.split("/")
    for (let dir of parr) {
        if (dir === "..") stack.pop()
        else if (dir && dir !== ".") stack.push("/" + dir)
    }
    return stack.join("") || "/"
}

// huh, this is apparently the popular answer for js on leet. O(3n). I could optimize it a little using pointers instead of split() but overall it'd still average to O(n). space is the same.

console.log(simplifyPath('/home/')) // /home
console.log(simplifyPath('/../')) // /
console.log(simplifyPath('/home//foo/')) // /home/foo
console.log(simplifyPath('/a/./b/../../c/')) // /c
console.log(simplifyPath('/a//b////c/d//././/..')) // /a/b/c