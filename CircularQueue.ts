// https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/593/week-1-april-1st-april-7th/3696/

// Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

// One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

// Implementation the MyCircularQueue class:

// MyCircularQueue(k) Initializes the object with the size of the queue to be k.
// int Front() Gets the front item from the queue. If the queue is empty, return -1.
// int Rear() Gets the last item from the queue. If the queue is empty, return -1.
// boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
// boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
// boolean isEmpty() Checks whether the circular queue is empty or not.
// boolean isFull() Checks whether the circular queue is full or not.

// --------------------------------------------------------

class MyCircularQueue {
    head: number
    tail: number
    size: number
    queue: object
    constructor(k: number) {
        this.head = 0
        this.tail = 0
        // can use size attribute to record k and check for fullness
        this.size = k
        this.queue = {}

    }
    enQueue(v: number): boolean {
        if (this.tail - this.head >= this.size) return false
        this.queue[this.tail++] = v
        return true
    }
    deQueue(): boolean {
        // deletes element from queue, return true if successful
        // will fail if queue is empty
        if (this.queue[this.head] === undefined) return false
        delete this.queue[this.head++]
        return true
    }

    Front(): number {
        // if this.head points to undefined, then there isn't anything in the queue at all, so return -1
        return this.queue[this.head] ?? -1
    }

    Rear(): number {
        // same as above but for tail - 1
        return this.queue[this.tail - 1] ?? -1
    }

    isEmpty(): boolean {
        // again if head points to an undefined value, the queue is empty
        return this.queue[this.head] === undefined
    }

    isFull(): boolean {
        return this.tail - this.head === this.size
    }
}

const q = new MyCircularQueue(3)

q.enQueue(1)
q.enQueue(2)
q.enQueue(3)
console.log(q.Rear())
console.log(q.Front())
console.log(q.isFull())
q.deQueue()
q.enQueue(4)
q.enQueue(5)

console.log(q)