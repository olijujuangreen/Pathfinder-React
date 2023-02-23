import { Grid } from "./startingGrid";

// We setup our direction modifiers
const DIRECTIONS = [
  { row: 1, col: 0 }, // up
  { row: 0, col: 1 }, // right
  { row: -1, col: 0 }, // down
  { row: 0, col: -1 }, // left
];

export function depthFirstSearch(
  point: { x: number; y: number },
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  visited: boolean[][],
  orderOfVisits: { x: number; y: number }[],
  path: { x: number; y: number }[]
) {
  // First thing, mark that we have been here
  orderOfVisits.push(point);
  visited[point.y][point.x] = true;

  // If target, return true
  if (grid[point.y][point.x].isTarget) {
    path.push(point);
    return true;
  }

  // Look in each direction and create a coord for that square
  for (const direction of DIRECTIONS) {
    const newPoint = { x: point.x + direction.col, y: point.y + direction.row };
    if (
      newPoint.x > 0 &&
      newPoint.x < maxWidth &&
      newPoint.y > 0 &&
      newPoint.y < maxHeight &&
      !grid[newPoint.y][newPoint.x].isWall &&
      !visited[newPoint.y][newPoint.x]
    ) {
      if (
        depthFirstSearch(
          newPoint,
          grid,
          maxWidth,
          maxHeight,
          visited,
          orderOfVisits,
          path
        )
      ) {
        path.push(point);
        return true;
      }
    }
  }
}
