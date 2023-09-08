import React, { useState } from "react";
import Board from "./Board";

function GameContainer() {
  const [boardEntries, setBoardEntries] = useState(() => {
    const initialBoard = [];
    for (let row = 0; row < 9; row++) {
      const rowEntries = [];
      for (let col = 0; col < 9; col++) {
        rowEntries.push({ value: "0", readOnly: false, row, col });
      }
      initialBoard.push(rowEntries);
    }
    return initialBoard;
  });


  const updateCell = (row, col, value) => {
    const updatedBoard = boardEntries.map((rowEntries, rowIndex) => {
      if (rowIndex === row) {
        return rowEntries.map((cell, colIndex) => {
          if (colIndex === col) {
            return { ...cell, value };
          }
          return cell;
        });
      }
      return rowEntries;
    });
    setBoardEntries(updatedBoard);
  };

  const generateSudoku = () => {
    // Step 1: Start with an Empty Grid
    const generatedPuzzle = generateEmptyGrid();

    const solveSudoku = (grid) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col].value === "0") {
            for (let num = 1; num <= 9; num++) {
              const numStr = num.toString();
              if (isValidMove(row, col, numStr, grid)) {
                grid[row][col] = { value: numStr, readOnly: true, row, col };
                if (solveSudoku(grid)) {
                  return true;
                }
                grid[row][col] = { value: "0", readOnly: false, row, col };
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    // Step 3: Implement Puzzle Difficulty
    const difficultyLevels = {
      easy: 30,   // Define the number of given cells for each difficulty level
      medium: 25,
      hard: 20,
    };

    let totalFilledCells;
    if (selectedDifficulty === "easy") {
      totalFilledCells = 30; // Adjust the number of filled cells for each difficulty level
    } else if (selectedDifficulty === "medium") {
      totalFilledCells = 24;
    } else if (selectedDifficulty === "hard") {
      totalFilledCells = 18;
    }

    let filledCells = 0;
    while (filledCells < totalFilledCells) {
      const row = getRandomNumber(0, 8);
      const col = getRandomNumber(0, 8);
      const value = getRandomNumber(1, 9).toString();
      if (isValidMove(row, col, value, generatedPuzzle)) {
        generatedPuzzle[row][col] = { value, readOnly: true, row, col };
        filledCells++;
      }
    }

    console.log(`Generated ${difficulty} Puzzle:`, generatedPuzzle);


    setBoardEntries(generatedPuzzle);
  };

  const solveSudoku = () => {
    const copyOfBoard = JSON.parse(JSON.stringify(boardEntries)); // Create a deep copy of the current board
    
    const solve = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].value === "0") {
            for (let num = 1; num <= 9; num++) {
              const numStr = num.toString();
              if (isValidMove(row, col, numStr, board)) {
                board[row][col] = { value: numStr, readOnly: true, row, col };
                if (solve(board)) {
                  setBoardEntries(board); // Update the boardEntries state with the solved puzzle
                  return true;
                }
                board[row][col] = { value: "0", readOnly: false, row, col };
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    if (solve(copyOfBoard)) {
      setBoardEntries(copyOfBoard); // Update the boardEntries state with the solved puzzle
    } else {
      alert("No solution exists for the current puzzle.");
    }
  };
  




  const isValidMove = (row, col, value, puzzle) => {
    // Check if the value already exists in the same row or column
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i].value === value || puzzle[i][col].value === value) {
        return false;
      }
    }

    // Check if the value already exists in the same 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (puzzle[r][c].value === value) {
          return false;
        }
      }
    }

    return true;
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };



  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Other state variables and event handlers

  return (
    <div className="container game-container">
      <h1 className="title">SUDOKU SOLVER</h1>
      <Board boardEntries={boardEntries} updateCell={updateCell} setBoardEntries={setBoardEntries} />
      <button className="btn" onClick={generateSudoku}>
        GENERATE PUZZLE
      </button>
      <button className="btn" onClick={solveSudoku}>
        SOLVE
      </button>


      {/* Other JSX elements */}
      <button
        className={`btn difficulty-button ${selectedDifficulty === "easy" ? "selected" : ""}`}
        onClick={() => handleDifficultyClick("easy")}
      >
        Easy
      </button>
      <button
        className={`btn difficulty-button ${selectedDifficulty === "medium" ? "selected" : ""}`}
        onClick={() => handleDifficultyClick("medium")}
      >
        Medium
      </button>
      <button
        className={`btn difficulty-button ${selectedDifficulty === "hard" ? "selected" : ""}`}
        onClick={() => handleDifficultyClick("hard")}
      >
        Hard
      </button>
    </div>
  );
}

export default GameContainer;
