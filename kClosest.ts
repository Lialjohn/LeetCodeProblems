// https://leetcode.com/problems/k-closest-points-to-origin/

// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

// -------------------------------------------------------------------

// so I need to find the distance for each set of points and then pop out the ones that are closest to 0. Considering, the method of getting distance, I don't need to worry about negatives. 
// since I need multiple 'smallest x', I can use a priority queue which is nlogn or sort which is also nlogn but may be less space efficient.

const kClosest = (points: number[][], k: number):number[][] => {
    let distances = []
    for (let i = 0; i < points.length; i++) {
        let [x, y] = points[i]
        x *= x
        y *= y
        distances[i] = {distance: Math.sqrt(x + y), point: points[i]}
    }
    distances.sort((a,b) => a.distance - b.distance)
    const res = []
    for (let j = 0; j < k; j++) {
        res.push(distances[j].point)
    }
    return res
}

// cutting down a little bit

const kClosest2 = (points: number[][], k: number):number[][] => {
    points.sort((a,b) => Math.sqrt(a[0]**2 + a[1]**2) - Math.sqrt(b[0]**2 + b[1]**2))
    const res = []
    for (let j = 0; j < k; j++) res.push(points[j])
    return res
}



console.log(kClosest2([[1,3],[-2,2]], 1)) // [[-2,2]]
console.log(kClosest2([[3,3],[5,-1],[-2,4]], 2)) // [[3,3],[-2,4]]