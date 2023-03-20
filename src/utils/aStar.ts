import { Grid, Cell } from "./startingGrid";
import { MinHeap, Node } from "./MinHeap";
import { Point } from "./executeAlgo";

const DIRECTIONS = [
  { y: 1, x: 0 }, // down
  { y: 0, x: 1 }, // right
  { y: -1, x: 0 }, // up
  { y: 0, x: -1 }, // left
];

export function aStar(
  startPoint: Point,
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  obeyWalls: boolean,
  orderOfVisits: Point[],
  path: Point[]
) {
  const queue = new MinHeap(grid[startPoint.y][startPoint.x]);
  const visited: Map<string, Node> = new Map();

  while (queue.size) {
    const current = queue.pop() as Node;
    if (visited.has(current.name)) {
      continue;
    }
    orderOfVisits.push({ x: current.cell.x, y: current.cell.y });

    if (current.cell.isTarget) {
      let prev = current.prev;
      let node = current;

      while (prev) {
        path.push({ x: node.cell.x, y: node.cell.y });
        if (node.prev) {
          node = visited.get(node.prev) as Node;
          console.log(node);
          prev = node.prev;
        } else {
          break;
        }
      }
      path.push(startPoint);
      path.reverse();
      return;
    }

    visited.set(current.name, current);
    const neighbors = findNeighbors(
      current,
      grid,
      maxWidth,
      maxHeight,
      obeyWalls,
      visited
    );

    for (const cell of neighbors) {
      const distance = current.distance + cell.weight;
      queue.insertOrUpdate(cell, distance, current.name, true);
    }
  }
}

function findNeighbors(
  node: Node,
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  obeyWalls: boolean,
  visited: Map<string, Node>
) {
  const neighbors: Cell[] = [];
  for (const direction of DIRECTIONS) {
    const newPoint = {
      x: node.cell.x + direction.x,
      y: node.cell.y + direction.y,
    };
    if (
      newPoint.x >= 0 &&
      newPoint.x < maxWidth &&
      newPoint.y >= 0 &&
      newPoint.y < maxHeight &&
      (obeyWalls ? !grid[newPoint.y][newPoint.x].isWall : true) &&
      !visited.has(`x${newPoint.x}y${newPoint.y}`)
    ) {
      neighbors.push(grid[newPoint.y][newPoint.x]);
    }
  }
  return neighbors;
}
