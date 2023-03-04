import { Cell } from "./startingGrid";

export class Node {
  prev: string | null;
  distance: number;
  cell: Cell;
  name: string;

  constructor(cell: Cell, distance: number, prev?: string) {
    this.prev = prev || null;
    this.cell = cell;
    this.distance = distance;
    this.name = `x${cell.x}y${cell.y}`;
  }
}

export class MinHeap {
  heap: Node[];
  size: number;
  nodeList: Set<string>;

  constructor(cell: Cell) {
    this.heap = [new Node(cell, 0)];
    this.nodeList = new Set();
    this.nodeList.add(this.heap[0].name);
    this.size = 1;
  }

  insertOrUpdate(cell: Cell, distance: number, prev: string) {
    const node = new Node(cell, distance, prev);
    if (this.nodeList.has(node.name)) {
      const index = this.heap.findIndex((storedNode) => {
        return storedNode.name === node.name;
      });
      const storedNode = this.heap[index];

      if (storedNode.distance > distance) {
        storedNode.distance = distance;
        storedNode.prev = prev;
        this.bubbleUp(index);
      }

      return;
    }

    if (!this.heap) {
      this.heap = [node];
      this.size = 1;
      return;
    }
    if (this.heap.length >= 0) {
      this.heap.push(node);
      const index = this.heap.length - 1;
      this.bubbleUp(index);
      this.size++;
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
      this.size--;
      return min;
    }
    if (this.heap.length === 1) {
      this.size = 0;
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
