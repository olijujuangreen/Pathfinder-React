import { MinHeap } from "./MinHeap";
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
  const height = grid.grid.length;
  const width = grid.grid[0].length;

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
    const cell = {
      id: "123",
      x: 0,
      y: 0,
      type: "start",
      isStart: true,
      isTarget: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: 0,
    };

    const cell2 = {
      id: "321",
      x: 0,
      y: 0,
      type: "cell",
      isStart: false,
      isTarget: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: 5,
    };

    const cell3 = {
      id: "321",
      x: 0,
      y: 0,
      type: "cell",
      isStart: false,
      isTarget: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: 2,
    };

    const cell4 = {
      id: "321",
      x: 0,
      y: 0,
      type: "cell",
      isStart: false,
      isTarget: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: 8,
    };

    const cell5 = {
      id: "321",
      x: 0,
      y: 0,
      type: "cell",
      isStart: false,
      isTarget: false,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: 7,
    };

    const heap = new MinHeap(cell);
    heap.insert(cell2, 1);
    heap.insert(cell3, 3);
    heap.insert(cell4, 6);
    heap.insert(cell5, 2);
    console.log(heap);
    const currentCell = heap.pop();
    console.log(currentCell, heap);
  }

  // TEMPORARY FIX
  // Create a better return later
  return {
    orderOfVisits: [grid.startingPoint, grid.targetPoint],
    path: [grid.startingPoint, grid.targetPoint],
  };
}
