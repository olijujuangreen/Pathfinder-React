import { Console } from "console";
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
  if (algo === "DFS") {
    const visited = [];
    for (let y = 0; y < grid.height; y++) {
      visited[y] = Array(grid.width).fill(false);
    }
    const orderOfVisits: { x: number; y: number }[] = [];
    const path: { x: number; y: number }[] = [];
    console.log("Starting point: ", grid.startingPoint);
    console.log("Expected end point: ", grid.targetPoint);
    depthFirstSearch(
      grid.startingPoint,
      grid.grid,
      grid.width,
      grid.height,
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
