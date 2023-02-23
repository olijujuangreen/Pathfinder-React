import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";
import { createGrid, GridInfo } from "./utils/startingGrid";

function App() {
  const [algoSelection, setAlgoSelection] = useState("BFS");
  const height = 40; // Grid height
  const width = 50; // Grid width
  const [showWalls, setShowWalls] = useState(false);
  const [grid, setGrid] = useState(createGrid(width, height) as GridInfo);
  const [runAlgo, setRunAlgo] = useState(false);

  return (
    <div className="d-flex bg-light bg-opacity-50 flex-column justify-content-between align-content-center h-100">
      <NavBar
        showWalls={showWalls}
        setShowWalls={setShowWalls}
        algoSelection={algoSelection}
        setAlgoSelection={setAlgoSelection}
        runAlgo={runAlgo}
        setRunAlgo={setRunAlgo}
      />
      <Grid grid={grid} showWalls={showWalls} runAlgo={runAlgo} />
      <Footer />
    </div>
  );
}

export default App;
