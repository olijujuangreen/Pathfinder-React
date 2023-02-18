export function getGrid(width: number, height: number) {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const local = [];
    for (let x = 0; x < width; x++) {
      local.push({
        x,
        y,
        isStart: false,
        isTarget: false,
        isWall: false,
        weight: 1,
      });
    }
    grid.push(local);
  }
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true;
  grid[height - 2][width - 2].isTarget = true;
  return grid;
}
