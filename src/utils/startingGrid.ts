import { v4 as uuidv4 } from "uuid";

export type GridInfo = {
  grid: Grid;
  startingPoint: { x: number; y: number };
  targetPoint: { x: number; y: number };
};

export type Grid = Cell[][];

export type Cell = {
  id: string;
  x: number;
  y: number;
  type: string;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  weight: number;
  distanceToTarget: number;
};

export function createGrid(width: number, height: number): GridInfo {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({
        id: uuidv4(),
        x,
        y,
        type: "",
        isStart: false,
        isTarget: false,
        isWall: false,
        isVisited: false,
        isPath: false,
        weight: randomWeight(5),
        distanceToTarget: Number.MAX_SAFE_INTEGER,
      });
    }
    grid.push(row);
  }
  const n = height * width;
  const startX = Math.floor(width * Math.random());
  const startY = Math.floor((height / 4) * Math.random());
  const endX = Math.floor(width * Math.random());
  const endY = Math.floor((height / 4) * Math.random() + height * (3 / 4));
  grid[startY][startX].isStart = true;
  grid[startY][startX].type = "start";
  grid[endY][endX].isTarget = true;
  grid[endY][endX].type = "target";
  for (let i = 0; i < n / 5; i++) {
    const randomX = Math.floor(Math.random() * width);
    const randomY = Math.floor(Math.random() * height);
    if (!grid[randomY][randomX].isStart && !grid[randomY][randomX].isTarget) {
      grid[randomY][randomX].isWall = true;
      grid[randomY][randomX].type = "wall";
    }
  }
  const weightsWindowWidth =
    startX > endX
      ? { left: endX, right: startX }
      : { left: startX, right: endX };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[y][x];
      if (cell.isTarget) {
        cell.distanceToTarget = 0;
      } else {
        // a^2 + b^2 = c^2
        // endX = X
        // endY = Y
        const a = Math.abs(endY - cell.y);
        const b = Math.abs(endX - cell.x);
        const c = Math.sqrt(a * a + b * b);
        cell.distanceToTarget = c;
      }
      if (cell.isStart || cell.isTarget) {
        cell.weight = 0;
        continue;
      }
      // make points above starting point more weighted
      if (y < startY || y > endY) {
        cell.weight += 8;
        continue;
      }

      // make points on sides of starting and ending points more weighted
      if (x < weightsWindowWidth.left || x > weightsWindowWidth.right) {
        cell.weight += 8;
        continue;
      }
    }
  }
  return {
    grid,
    startingPoint: { x: startX, y: startY },
    targetPoint: { x: endX, y: endY },
  };
}

function randomWeight(max: number) {
  return Math.floor(Math.random() * max + 1);
}
