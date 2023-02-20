import React from "react";
import { Cell, Walls } from "../utils/startingGrid";

type NavBarProps = {
  setGrid: React.Dispatch<
    React.SetStateAction<{
      grid: Cell[];
      walls: Walls;
    }>
  >;
  hasWalls: boolean;
  setHasWalls: React.Dispatch<React.SetStateAction<boolean>>;
  algoSelection: string;
  setAlgoSelection: React.Dispatch<React.SetStateAction<string>>;
};

export function NavBar(props: NavBarProps) {
  const { setGrid, hasWalls, setHasWalls, algoSelection, setAlgoSelection } =
    props;
  return (
    <div className="navbar navbar-expand navbar-dark flex-shrink-0 fixed bg-primary border-bottom border-dark w-100 justify-content-around">
      <div className="navbar-brand">Algorithm Visualizer</div>
      <div className="d-flex gap-4 align-content-center justify-content-around">
        <div className="d-flex align-content-center justify-content-center">
          <div className="navbar-brand">Choose an Algorithm: </div>
          <select
            className="form-select-sm text-bg-light"
            aria-label="Default select example"
            value={algoSelection}
            onChange={(e) => {
              console.log(e.target.value);
              setAlgoSelection(e.target.value);
            }}
          >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="DIJKSTRA">Dijkstra</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            setHasWalls(!hasWalls);
          }}
        >
          <div className="brand">Walls</div>
        </button>
        <button type="button" className="btn btn-light">
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button type="button" className="btn btn-light">
          <i className="bi bi-caret-right"></i>
        </button>
      </div>
    </div>
  );
}
