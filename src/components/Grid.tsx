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
  runAlgo: boolean;
  setRunAlgo: React.Dispatch<React.SetStateAction<boolean>>;
  resetGrid: boolean;
};

export function Grid(props: GridProps) {
  const { gridWidth, gridHeight, showWalls, setRunAlgo, runAlgo, resetGrid } =
    props;
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

  const delayMultiplier = 4;

  useEffect(() => {
    if (runAlgo) {
      const { orderOfVisits, path } = executeAlgo(gridInfo, "BFS", showWalls);
      if (orderOfVisits) {
        orderOfVisits.forEach((point: Point, index: number) => {
          setTimeout(() => {
            grid[point.y][point.x].setType("visited");
          }, index * delayMultiplier);
        });
      }
      setTimeout(() => {
        if (path) {
          path.forEach((point: Point, index) => {
            setTimeout(() => {
              grid[point.y][point.x].setType("path");
            }, index * delayMultiplier);
          });
        }
      }, orderOfVisits.length * delayMultiplier);
      const resetButton = document.getElementById(
        "resetButton"
      ) as HTMLButtonElement;
      const runButton = document.getElementById(
        "runButton"
      ) as HTMLButtonElement;
      resetButton.disabled = true;
      runButton.disabled = true;
      setTimeout(() => {
        resetButton.disabled = false;
        runButton.disabled = false;
      }, (orderOfVisits.length + path.length) * delayMultiplier);
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
