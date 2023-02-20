import "./Grid.css";
import { Cell } from "../utils/startingGrid";
import { GridCell } from "./GridCell";

type GridProps = {
  grid: Cell[];
  hasWalls: boolean;
  runAlgo: boolean;
};

export function Grid(props: GridProps) {
  const { grid, hasWalls, runAlgo } = props;
  return (
    <main className="flex-shrink-0 bg-light">
      <div className="grid">
        {grid.map((cell) => {
          return <GridCell cell={cell} key={cell.id} hasWalls={hasWalls} />;
        })}
      </div>
    </main>
  );
}
