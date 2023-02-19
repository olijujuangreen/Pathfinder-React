import { v4 as uuidv4 } from "uuid";

export type Cell = {
  id: string;
  x: number;
  y: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  weight: number;
};

export function createGrid(width: number, height: number) {
  const grid = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      grid.push({
        id: uuidv4(),
        x,
        y,
        isStart: false,
        isTarget: false,
        isWall: false,
        weight: randomWeight(5),
      });
    }
  }
  const n = height * width;
  const start = Math.floor((n / 2) * Math.random());
  const end = Math.floor((n / 2) * Math.random() + n / 2);
  grid[start].isStart = true;
  grid[end].isTarget = true;
  for (let i = 0; i < n / 5; i++) {
    const randomPoint = Math.floor(Math.random() * n);
    if (randomPoint !== start && randomPoint !== end) {
      grid[randomPoint].isWall = true;
    }
  }

  return grid;
}

function randomWeight(max: number) {
  return Math.floor(Math.random() * max + 1);
}
