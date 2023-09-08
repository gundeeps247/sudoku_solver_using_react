import React from "react";

function WelcomeContainer({ onStartClick }) {
  return (
    <div className="container welcome-container">
      <h1 className="title">WELCOME TO SUDOKU SOLVER</h1>
      <button className="btn start-btn" onClick={onStartClick}>
        START PLAYING
      </button>
      <img src="images/logo.png" alt="Logo" className="logo" />
    </div>
  );
}

export default WelcomeContainer;
