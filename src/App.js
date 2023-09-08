import React, { useState } from "react";
import "./App.css";
import WelcomeContainer from "./WelcomeContainer";
import GameContainer from "./GameContainer";
import Board from "./Board";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStartClick = () => {
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {showWelcome ? (
        <WelcomeContainer onStartClick={handleStartClick} />
      ) : (
        <GameContainer>
          <Board /> {/* Add the Board component here */}
        </GameContainer>
      )}
    </div>
  );
}

export default App;
