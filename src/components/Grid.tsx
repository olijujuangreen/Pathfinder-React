import "./Grid.css";
import { Cell, Walls } from "../utils/startingGrid";
import { GridCell } from "./GridCell";

type GridProps = {
  grid: { grid: Cell[]; walls: Walls };
  hasWalls: boolean;
};

export function Grid(props: GridProps) {
  const { grid, hasWalls } = props;
  return (
    <main className="flex-shrink-0 bg-light">
      <div className="grid">
        {grid.grid.map((cell) => {
          return <GridCell cell={cell} key={cell.id} hasWalls={hasWalls} />;
        })}
      </div>
    </main>
  );
}
