import "./GridCell.css";
import { Cell } from "../utils/startingGrid";

export function GridCell(props: { cell: Cell }) {
  const { cell } = props;

  return (
    <div className={cell.isWall ? "cell wall" : "cell"} id={cell.id}>
      {cell.isStart && <i className="bi bi-geo-alt"></i>}
      {cell.isTarget && <i className="bi bi-geo"></i>}
    </div>
  );
}
