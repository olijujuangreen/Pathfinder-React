import { Grid } from "./startingGrid";

// We setup our direction modifiers
const DIRECTIONS = [
  { row: 1, col: 0 }, // down
  { row: 0, col: 1 }, // right
  { row: -1, col: 0 }, // up
  { row: 0, col: -1 }, // left
];

export function breadthFirstSearch(
  startPoint: { x: number; y: number },
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  obeyWalls: boolean,
  visited: boolean[][],
  orderOfVisits: { x: number; y: number }[],
  path: { x: number; y: number }[]
) {
  const queue = [startPoint];

  // Mark the start point as visited
  visited[startPoint.y][startPoint.x] = true;

  while (queue.length > 0) {
    const point = queue.shift()!;

    // Add this point to the list of visited points
    orderOfVisits.push(point);

    // If target, return true
    if (grid[point.y][point.x].isTarget) {
      // Reconstruct path
      let current = point;
      while (current.x !== startPoint.x || current.y !== startPoint.y) {
        path.unshift(current);
        current = grid[current.y][current.x].parent!;
      }
      path.unshift(startPoint);
      return true;
    }

    // Look in each direction and create a coord for that square
    for (const direction of DIRECTIONS) {
      const newPoint = {
        x: point.x + direction.col,
        y: point.y + direction.row,
      };
      if (
        newPoint.x >= 0 &&
        newPoint.x < maxWidth &&
        newPoint.y >= 0 &&
        newPoint.y < maxHeight &&
        (obeyWalls ? !grid[newPoint.y][newPoint.x].isWall : true) &&
        !visited[newPoint.y][newPoint.x]
      ) {
        // Mark the new point as visited and add it to the queue
        visited[newPoint.y][newPoint.x] = true;
        grid[newPoint.y][newPoint.x].parent = point;
        queue.push(newPoint);
      }
    }
  }

  // No path found
  return false;
}
