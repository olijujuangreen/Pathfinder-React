import { depthFirstSearch } from "./dfs";
import { breadthFirstSearch } from "./bfs";
import { GridInfo } from "./startingGrid";
import { dijkstra } from "./dijkstra";
import { aStar } from "./aStar";

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
  console.log(algo);

  if (algo === "DFS") {
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

  if (algo === "DIJKSTRA") {
    const orderOfVisits: Point[] = [];
    const path: Point[] = [];

    dijkstra(
      grid.startingPoint,
      grid.grid,
      width,
      height,
      obeyWalls,
      orderOfVisits,
      path
    );

    return { orderOfVisits, path };
  }

  if (algo === "A*") {
    console.log("Running astar");
    const orderOfVisits: Point[] = [];
    const path: Point[] = [];

    aStar(
      grid.startingPoint,
      grid.grid,
      width,
      height,
      obeyWalls,
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
