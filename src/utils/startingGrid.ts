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
  return {
    grid,
    startingPoint: { x: startX, y: startY },
    targetPoint: { x: endX, y: endY },
  };
}

function randomWeight(max: number) {
  return Math.floor(Math.random() * max + 1);
}
