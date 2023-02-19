/**
 * @param {character[][]} grid
 * @return {number}
 */
// We setup our direction modifiers
// const DIRECTIONS = [
//   { row: 1, col: 0 }, // up
//   { row: 0, col: 1 }, // right
//   { row: -1, col: 0 }, // down
//   { row: 0, col: -1 }, // left
// ];

type Grid = {
  id: string;
  x: number;
  y: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  weight: number;
}[];

// For DFS to work, we need a few things:
// Where we are currently -> row: number, col: number
// All of our grid info -> grid: [number[]], maxWidth: number, maxHeight: number
// And a record of where we have been -> visited: [boolean[]]
export function depthFirstSearch(
  point: number,
  grid: Grid,
  maxWidth: number,
  maxHeight: number,
  visited: boolean[]
) {
  // First thing, mark that we have been here
  const cell = document.getElementById(grid[point].id);
  if (cell) {
    cell.classList.add("visited");
  }

  visited[point] = true;

  // Look in each direction and create a coord for that square
  const points = [];
  // Create up
  points.push(point - maxWidth);
  // Create right
  if (point % maxWidth !== 0) {
    points.push(point + 1);
  }
  // Create down
  points.push(point + maxWidth);
  // Create left
  if ((point - 1) % maxWidth !== 0) {
    points.push(point - 1);
  }
  const n = maxHeight * maxWidth;
  // Check that the new coord is on the grid, then chack that
  // the new coord is part of the island and we haven't been there.
  points.forEach((newPoint) => {
    if (
      newPoint >= 0 &&
      newPoint < n &&
      !grid[newPoint].isWall &&
      !visited[newPoint]
    ) {
      // If all of those checks pass, we recursively search the created coord.
      depthFirstSearch(newPoint, grid, maxWidth, maxHeight, visited);
    }
  });
}
