import "./Grid.css";
import { createGrid } from "../utils/startingGrid";
import { GridCell } from "./GridCell";

export function Grid() {
  const grid = createGrid(25, 50);

  return (
    <main className="flex-shrink-0 bg-light">
      <div className="grid">
        {grid.map((cell) => {
          return <GridCell cell={cell} key={cell.id} />;
        })}
      </div>
    </main>
  );
}
