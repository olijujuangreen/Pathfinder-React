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

export type Walls = Set<string>;

export function createGrid(
  width: number,
  height: number
): { grid: Cell[]; walls: Walls } {
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
  const start = Math.floor((n / 4) * Math.random());
  const end = Math.floor((n / 4) * Math.random() + n * (3 / 4));
  grid[start].isStart = true;
  grid[end].isTarget = true;
  const walls = new Set() as Walls;
  for (let i = 0; i < n / 5; i++) {
    const randomPoint = Math.floor(Math.random() * n);
    if (randomPoint !== start && randomPoint !== end) {
      const cell = grid[randomPoint];
      cell.isWall = true;
      walls.add(cell.id);
    }
  }

  return { grid, walls };
}

function randomWeight(max: number) {
  return Math.floor(Math.random() * max + 1);
}
