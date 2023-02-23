import "./Grid.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { GridInfo } from "../utils/startingGrid";
import { GridCell } from "./GridCell";
import { executeAlgo, Point } from "../utils/executeAlgo.js";
import { setTimeout } from "timers";

type GridProps = {
  grid: GridInfo;
  showWalls: boolean;
  runAlgo: boolean;
};

export function Grid(props: GridProps) {
  const { grid, showWalls, runAlgo } = props;

  const cellTypeRef: React.Dispatch<React.SetStateAction<string>>[][] = [];
  for (let i = 0; i < grid.height; i++) {
    cellTypeRef.push([] as React.Dispatch<React.SetStateAction<string>>[]);
  }

  const delayMultiplier = 5;

  useEffect(() => {
    if (runAlgo) {
      const { orderOfVisits, path } = executeAlgo(grid, "DFS", showWalls);
      if (orderOfVisits) {
        orderOfVisits.forEach((point: Point, index: number) => {
          setTimeout(() => {
            cellTypeRef[point.y][point.x]("visited");
          }, index * delayMultiplier);
        });
      }
      setTimeout(() => {
        if (path) {
          path.forEach((point: Point, index) => {
            setTimeout(() => {
              cellTypeRef[point.y][point.x]("path");
            }, index * delayMultiplier);
          });
        }
      }, orderOfVisits.length * delayMultiplier);
    }
  }, [runAlgo]);

  return (
    <main className="flex-shrink-0 bg-light">
      <div className="grid">
        {grid.grid.flatMap((row, y) => {
          return row.map((cell, x) => {
            if (cell.isStart) {
              const [type, setType] = useState("start");
              cellTypeRef[y].push(setType);
              return (
                <GridCell
                  cell={cell}
                  key={cell.id}
                  showWalls={showWalls}
                  type={type}
                />
              );
            }
            if (cell.isTarget) {
              const [type, setType] = useState("target");
              cellTypeRef[y].push(setType);
              return (
                <GridCell
                  cell={cell}
                  key={cell.id}
                  showWalls={showWalls}
                  type={type}
                />
              );
            }
            if (cell.isWall) {
              const [type, setType] = useState("wall");
              cellTypeRef[y].push(setType);
              return (
                <GridCell
                  cell={cell}
                  key={cell.id}
                  showWalls={showWalls}
                  type={type}
                />
              );
            }
            const [type, setType] = useState("");
            cellTypeRef[y].push(setType);
            return (
              <GridCell
                cell={cell}
                key={cell.id}
                showWalls={showWalls}
                type={type}
              />
            );
          });
        })}
      </div>
    </main>
  );
}
