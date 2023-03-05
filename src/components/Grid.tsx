import "./Grid.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { GridInfo } from "../utils/startingGrid";
import { GridCell } from "./GridCell";
import { executeAlgo, Point } from "../utils/executeAlgo.js";
import { setTimeout } from "timers";
import { createGrid } from "../utils/startingGrid";

type GridProps = {
  gridWidth: number;
  gridHeight: number;
  showWalls: boolean;
  algoSelection: string;
  runAlgo: boolean;
  setRunAlgo: React.Dispatch<React.SetStateAction<boolean>>;
  resetGrid: boolean;
};

type PROFILE = { VISIT_DELAY: number; PATH_DELAY: number };

interface DELAY_PROFILES_MAP {
  DFS: PROFILE;
  BFS: PROFILE;
  DIJKSTRA: PROFILE;
  "A*": PROFILE;
}
type profileSelection = keyof DELAY_PROFILES_MAP;

const DELAY_PROFILES: DELAY_PROFILES_MAP = {
  DFS: { VISIT_DELAY: 5, PATH_DELAY: 5 },
  BFS: { VISIT_DELAY: 5, PATH_DELAY: 30 },
  DIJKSTRA: { VISIT_DELAY: 7, PATH_DELAY: 30 },
  "A*": { VISIT_DELAY: 9, PATH_DELAY: 30 },
};

export function Grid(props: GridProps) {
  const {
    gridWidth,
    gridHeight,
    showWalls,
    algoSelection,
    setRunAlgo,
    runAlgo,
    resetGrid,
  } = props;
  const [gridInfo, setGridInfo] = useState(
    createGrid(gridWidth, gridHeight) as GridInfo
  );

  let grid = gridInfo.grid.map((row) => {
    return row.map((cell) => {
      const [type, setType] = useState(cell.type);
      const gridCell = (
        <GridCell
          cell={cell}
          id={cell.id}
          key={cell.id}
          showWalls={showWalls}
          type={type}
          algoSelection={algoSelection}
        />
      );
      return { type, setType, cell: gridCell };
    });
  });

  const reset = () => {
    setRunAlgo(false);
    const newGridInfo = createGrid(gridWidth, gridHeight);
    newGridInfo.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        grid[y][x].setType(cell.type);
      });
    });
    setGridInfo(newGridInfo);
  };

  useEffect(() => {
    reset();
  }, [resetGrid]);

  useEffect(() => {
    if (runAlgo) {
      const { orderOfVisits, path } = executeAlgo(
        gridInfo,
        algoSelection,
        showWalls
      );
      const { VISIT_DELAY, PATH_DELAY } =
        DELAY_PROFILES[algoSelection as profileSelection];
      if (orderOfVisits) {
        orderOfVisits.forEach((point: Point, index: number) => {
          setTimeout(() => {
            grid[point.y][point.x].setType("visited");
          }, index * VISIT_DELAY);
        });
      }
      setTimeout(() => {
        if (path) {
          path.forEach((point: Point, index) => {
            setTimeout(() => {
              grid[point.y][point.x].setType("path");
            }, index * PATH_DELAY);
          });
        }
      }, orderOfVisits.length * VISIT_DELAY);
      const resetButton = document.getElementById(
        "resetButton"
      ) as HTMLButtonElement;
      const runButton = document.getElementById(
        "runButton"
      ) as HTMLButtonElement;
      const algoSelect = document.getElementById(
        "algoSelect"
      ) as HTMLSelectElement;
      resetButton.disabled = true;
      runButton.disabled = true;
      algoSelect.disabled = true;
      setTimeout(() => {
        resetButton.disabled = false;
        runButton.disabled = false;
        algoSelect.disabled = false;
      }, orderOfVisits.length * VISIT_DELAY + path.length * PATH_DELAY);
    }
  }, [runAlgo]);

  return (
    <main className="flex-shrink-0 bg-light">
      <div className="grid">
        {grid.flatMap((row) => {
          return row.map((cell) => {
            return cell.cell;
          });
        })}
      </div>
    </main>
  );
}
