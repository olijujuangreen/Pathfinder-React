import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";

function App() {
  const [algoSelection, setAlgoSelection] = useState("BFS");
  const height = 40; // Grid height
  const width = 50; // Grid width
  const [showWalls, setShowWalls] = useState(false);
  const [runAlgo, setRunAlgo] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);

  return (
    <div className="d-flex bg-light bg-opacity-50 flex-column justify-content-between align-content-center h-100">
      <NavBar
        showWalls={showWalls}
        setShowWalls={setShowWalls}
        algoSelection={algoSelection}
        setAlgoSelection={setAlgoSelection}
        runAlgo={runAlgo}
        setRunAlgo={setRunAlgo}
        resetGrid={resetGrid}
        setResetGrid={setResetGrid}
      />
      <Grid
        gridWidth={width}
        gridHeight={height}
        showWalls={showWalls}
        setRunAlgo={setRunAlgo}
        runAlgo={runAlgo}
        resetGrid={resetGrid}
      />
      <Footer />
    </div>
  );
}

export default App;
