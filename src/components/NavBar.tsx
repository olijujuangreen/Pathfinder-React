import React from "react";

export function NavBar(props) {
  const { algoSelection, setAlgoSelection } = props;
  return (
    <div className="navbar navbar-expand-md navbar-dark fixed bg-primary ">
      <div className="d-lg-flex justify-content-around align-content-center w-100">
        <a href="#" className="navbar-brand">
          Fixed Navbar
        </a>
        <div className="d-flex gap-4 align-content-center justify-content-around">
          <button type="button" className="btn btn-primary">
            <i className="bi bi-geo-alt"></i>
          </button>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-geo"></i>
          </button>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-bricks"></i>
          </button>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-virus"></i>
          </button>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <button type="button" className="btn btn-primary">
            <i className="bi bi-caret-right"></i>
          </button>
        </div>
        <div className="d-flex align-content-center justify-content-center">
          <div className="navbar-brand">Choose an Algorithm: </div>
          <select
            className="form-select-sm"
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
      </div>
    </div>
  );
}
