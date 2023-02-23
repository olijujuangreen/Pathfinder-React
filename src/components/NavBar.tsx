import React from "react";
import { GridInfo } from "../utils/startingGrid";

type NavBarProps = {
  showWalls: boolean;
  setShowWalls: React.Dispatch<React.SetStateAction<boolean>>;
  algoSelection: string;
  setAlgoSelection: React.Dispatch<React.SetStateAction<string>>;
  runAlgo: boolean;
  setRunAlgo: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NavBar(props: NavBarProps) {
  const {
    showWalls,
    setShowWalls,
    algoSelection,
    setAlgoSelection,
    runAlgo,
    setRunAlgo,
  } = props;
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
          className={
            runAlgo
              ? "btn btn-light disabled"
              : showWalls
              ? "btn btn-light active"
              : "btn btn-light"
          }
          onClick={() => {
            if (!runAlgo) {
              setShowWalls(!showWalls);
            }
          }}
        >
          <div className="brand">Walls</div>
        </button>
        <button type="button" className="btn btn-light">
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            setRunAlgo(true);
          }}
        >
          <i className="bi bi-caret-right"></i>
        </button>
      </div>
    </div>
  );
}
