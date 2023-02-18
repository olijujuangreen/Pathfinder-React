import React, { useState } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Grid } from "./components/Grid";
import { Footer } from "./components/Footer";

function App() {
  const [algoSelection, setAlgoSelection] = useState("BFS");

  return (
    <div className="d-flex bg-secondary bg-opacity-25 flex-column justify-content-between align-content-center h-100">
      <NavBar
        algoSelection={algoSelection}
        setAlgoSelection={setAlgoSelection}
      />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
