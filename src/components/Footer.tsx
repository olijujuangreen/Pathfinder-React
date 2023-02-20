import React from "react";

export function Footer() {
  return (
    <footer className="d-flex text-bg-primary bg-opacity-100 flex-wrap justify-content-between align-items-center py-3 border-top border-secondary mt-auto">
      <div className="container">
        <span>
          Source Code at:{" "}
          <a
            className="link-info"
            href="https://github.com/olijujuangreen/Pathfinder-React"
          >
            GitHub
          </a>{" "}
        </span>
      </div>
    </footer>
  );
}
