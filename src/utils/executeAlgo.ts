import { depthFirstSearch } from "./dfs";
import { GridInfo } from "./startingGrid";

export type Point = { x: number; y: number };

export type AlgoResult = {
  orderOfVisits: Point[];
  path: Point[];
};

export function executeAlgo(
  grid: GridInfo,
  algo: string,
  obeyWalls: boolean
): AlgoResult {
  const height = grid.grid.length;
  const width = grid.grid[0].length;

  if (algo === "DFS") {
    const visited = [];
    for (let y = 0; y < height; y++) {
      visited[y] = Array(width).fill(false);
    }
    const orderOfVisits: { x: number; y: number }[] = [];
    const path: { x: number; y: number }[] = [];
    depthFirstSearch(
      grid.startingPoint,
      grid.grid,
      width,
      height,
      obeyWalls,
      visited,
      orderOfVisits,
      path
    );
    return { orderOfVisits, path: path.reverse() };
  }

  // TEMPORARY FIX
  // Create a better return later
  return {
    orderOfVisits: [grid.startingPoint, grid.targetPoint],
    path: [grid.startingPoint, grid.targetPoint],
  };
}
