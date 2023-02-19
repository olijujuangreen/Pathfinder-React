import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";
import { createGrid } from "./utils/startingGrid";

function App() {
  const [algoSelection, setAlgoSelection] = useState("BFS");
  const height = 40; // Grid height
  const width = 50; // Grid width
  const [walls, setWalls] = useState(false);
  const [grid, setGrid] = useState(createGrid(height, width));

  return (
    <div className="d-flex bg-light bg-opacity-50 flex-column justify-content-between align-content-center h-100">
      <NavBar
        setGrid={setGrid}
        setWalls={setWalls}
        algoSelection={algoSelection}
        setAlgoSelection={setAlgoSelection}
      />
      <Grid grid={grid} />
      <Footer />
    </div>
  );
}

export default App;
