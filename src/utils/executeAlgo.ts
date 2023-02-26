import { depthFirstSearch } from "./dfs";
import { breadthFirstSearch } from "./bfs";
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
  console.log("Run Algo");

  const height = grid.grid.length;
  const width = grid.grid[0].length;

  if (algo === "DFS") {
    console.log("Run DFS");
    const visited = [];
    for (let y = 0; y < height; y++) {
      visited[y] = Array(width).fill(false);
    }
    const orderOfVisits: Point[] = [];
    const path: Point[] = [];
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

  if (algo === "BFS") {
    console.log("Run BFS");
    const visited = [];
    for (let y = 0; y < height; y++) {
      visited[y] = Array(width).fill(false);
    }
    const orderOfVisits: Point[] = [];
    const path: Point[] = [];
    breadthFirstSearch(
      grid.startingPoint,
      grid.grid,
      width,
      height,
      obeyWalls,
      visited,
      orderOfVisits,
      path
    );
    return { orderOfVisits, path };
  }

  // TEMPORARY FIX
  // Create a better return later
  return {
    orderOfVisits: [grid.startingPoint, grid.targetPoint],
    path: [grid.startingPoint, grid.targetPoint],
  };
}
