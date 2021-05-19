// https://leetcode.com/explore/challenge/card/may-leetcoding-challenge-2021/600/week-3-may-15th-may-21st/3747/

// Given a list paths of directory info, including the directory path, and all the fileNames with contents in this directory, return all the duplicate fileNames in the fileName system in terms of their paths. You may return the answer in any order.

// A group of duplicate fileNames consists of at least two fileNames that have the same content.

// A single directory info string in the input list has the following format:

// "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"
// It means there are n fileNames (f1.txt, f2.txt ... fn.txt) with content (f1_content, f2_content ... fn_content) respectively in the directory "root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the directory is just the root directory.

// The output is a list of groups of duplicate fileName paths. For each group, it contains all the fileName paths of the fileNames that have the same content. A fileName path is a string that has the following format:

// "directory_path/fileName_name.txt"

// ------------------------------------------------------------

// so path strings are structured as 'pathname fileName1(content1) fileName2(content2) fileName3(content1)' etc and the goal is to separate and regroup the fileNames according to content.
// so I need to separate out the content name, the root, and the fileName. combine root + fileName name, and then organize by content type.
// O(n) time where n is the number of filenames, not just whole strings, in path. 

const findDuplicate = (paths: string[]): string[][] => {
    const res: string[][] = []
    const contents = {}
    for (let s of paths) {
        const dir = s.split(' ')
        for (let i = 1; i < dir.length; i++) {
            const fileName = dir[i].split('(')
            if (!contents[fileName[1]]) contents[fileName[1]] = []
            contents[fileName[1]].push(dir[0] + '/' + fileName[0])
        }
    }
    for (let content in contents) {
        if (contents[content].length > 1) res.push(contents[content])
    }
    return res
}

console.log(findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]))
console.log(findDuplicate(["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]))