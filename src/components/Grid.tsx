import "./Grid.css";
import { Cell } from "../utils/startingGrid";
import { GridCell } from "./GridCell";

export function Grid(props: { grid: Cell[] }) {
  const { grid } = props;

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
