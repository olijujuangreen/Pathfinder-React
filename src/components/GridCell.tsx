import "./GridCell.css";
import { useEffect } from "react";
import { Cell } from "../utils/startingGrid";

type GridCellType = {
  cell: Cell;
  showWalls: boolean;
  type: string;
};

export function GridCell(props: GridCellType) {
  const { cell, showWalls, type } = props;

  let classList =
    type === "wall" ? (showWalls ? "cell wall" : "cell") : `cell ${type}`;

  return (
    <div className={classList} id={cell.id}>
      {cell.isStart && <i className="bi bi-cursor-fill"></i>}
      {cell.isTarget && <i className="bi bi-flag-fill"></i>}
      {/* {!cell.isStart && !cell.isWall && !cell.isTarget && cell.weight} */}
    </div>
  );
}
