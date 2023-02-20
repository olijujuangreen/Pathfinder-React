import "./Grid.css";
import { Cell, Walls } from "../utils/startingGrid";
import { GridCell } from "./GridCell";

type GridProps = {
  grid: Cell[];
  walls: Walls;
};

export function Grid(props: GridProps) {
  const { grid, walls } = props;
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
