import { Grid } from "./startingGrid";
import { Point } from "./executeAlgo";

// We setup our direction modifiers
const DIRECTIONS = [
  { y: 1, x: 0 }, // down
  { y: 0, x: 1 }, // right
  { y: -1, x: 0 }, // up
  { y: 0, x: -1 }, // left
];

type BFSQueue = BFSQueueItem[];

type BFSQueueItem = {
  currentPoint: Point;
  currentPath: Point[];
};

export function breadthFirstSearch(
  startPoint: Point,
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  obeyWalls: boolean,
  visited: boolean[][],
  orderOfVisits: Point[],
  path: Point[]
): void {
  const startingPoint: BFSQueueItem = {
    currentPoint: startPoint,
    currentPath: [startPoint],
  };
  const queue: BFSQueue = [startingPoint];
  // Mark the start point as visited

  while (queue.length) {
    // Grab a point from the queue

    const { currentPoint, currentPath } = queue.shift() as BFSQueueItem;
    if (visited[currentPoint.y][currentPoint.x]) {
      continue;
    }
    // Mark this point as visited
    orderOfVisits.push(currentPoint);
    visited[currentPoint.y][currentPoint.x] = true;

    // Check if current point is target
    if (grid[currentPoint.y][currentPoint.x].isTarget) {
      currentPath.forEach((point) => {
        path.push(point);
      });
      path.push(currentPoint);
      break;
    }

    // Find all valid neighbors
    const neighbors = findNeighbors(
      currentPoint,
      grid,
      maxWidth,
      maxHeight,
      obeyWalls,
      visited
    );

    // Add new points to the queue
    neighbors.forEach((neighbor) => {
      queue.push({
        currentPoint: neighbor,
        currentPath: [...currentPath, neighbor],
      });
    });
  }
  return;
}

function findNeighbors(
  point: Point,
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  obeyWalls: boolean,
  visited: boolean[][]
) {
  const neighbors: Point[] = [];
  for (const direction of DIRECTIONS) {
    const newPoint = {
      x: point.x + direction.x,
      y: point.y + direction.y,
    };
    if (
      newPoint.x >= 0 &&
      newPoint.x < maxWidth &&
      newPoint.y >= 0 &&
      newPoint.y < maxHeight &&
      (obeyWalls ? !grid[newPoint.y][newPoint.x].isWall : true) &&
      !visited[newPoint.y][newPoint.x]
    ) {
      neighbors.push(newPoint);
    }
  }
  return neighbors;
}
