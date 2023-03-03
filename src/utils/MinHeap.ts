import { Cell } from "./startingGrid";

class Node {
  prev: Node | null;
  distance: number;
  cell: Cell;

  constructor(cell: Cell, distance: number) {
    this.prev = null;
    this.cell = cell;
    this.distance = distance;
  }
}

export class MinHeap {
  heap: Node[];

  constructor(cell: Cell) {
    this.heap = [new Node(cell, 0)];
  }

  insert(cell: Cell, distance: number) {
    const node = new Node(cell, distance);
    if (!this.heap) {
      this.heap = [node];
    }
    if (this.heap.length > 0) {
      this.heap.push(node);
      const index = this.heap.length - 1;
      this.bubbleUp(index);
    }
  }

  pop() {
    if (!this.heap) {
      return null;
    }
    if (this.heap.length > 1) {
      const min = this.heap[0];
      this.heap[0] = this.heap.pop() as Node;
      this.minHeapify(0);
      return min;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    return null;
  }

  private bubbleUp(index: number) {
    const node = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (parent.distance > node.distance) {
        this.heap[parentIndex] = node;
        this.heap[index] = parent;
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private minHeapify(index: number) {
    while (true) {
      const currentNode = this.heap[index];
      const leftChildIndex = index * 2 + 1;
      const leftChild = this.heap[leftChildIndex];
      const rightChildIndex = leftChildIndex + 1;
      const rightChild = this.heap[rightChildIndex];
      let smallestDistance = currentNode.distance;
      let nextIndex = index;
      if (
        this.heap.length > leftChildIndex &&
        smallestDistance > leftChild.distance
      ) {
        smallestDistance = leftChild.distance;
        nextIndex = leftChildIndex;
      }

      if (
        this.heap.length > rightChildIndex &&
        smallestDistance > rightChild.distance
      ) {
        smallestDistance = rightChild.distance;
        nextIndex = rightChildIndex;
      }

      if (index !== nextIndex) {
        let temp = this.heap[nextIndex];
        this.heap[nextIndex] = this.heap[index];
        this.heap[index] = temp;
        this.minHeapify(nextIndex);
      } else {
        break;
      }
    }
  }
}
