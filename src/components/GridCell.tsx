import "./GridCell.css";
import { Cell } from "../utils/startingGrid";

export function GridCell(props: { cell: Cell }) {
  const { cell } = props;

  let classList = "cell";

  if (cell.isStart) {
    classList = "cell start";
  }

  if (cell.isTarget) {
    classList = "cell target";
  }

  if (cell.isWall) {
    classList = "cell wall";
  }

  return (
    <div className={classList} id={cell.id}>
      {cell.isStart && <i className="bi bi-cursor-fill"></i>}
      {cell.isTarget && <i className="bi bi-flag-fill"></i>}
      {/* {!cell.isStart &&
        !cell.isWall &&
        !cell.isTarget &&
        cell.weight > 1 &&
        cell.weight} */}
    </div>
  );
}
