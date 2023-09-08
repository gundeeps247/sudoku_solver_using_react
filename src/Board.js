import React from "react";
import Cell from "./Cell";

const Board = ({ boardEntries, setBoardEntries }) => {
    const handleCellValueChange = (row, col, newValue) => {
        const updatedBoard = [...boardEntries];
        updatedBoard[row][col].value = newValue;
        setBoardEntries(updatedBoard);
      };
      

  return (
    <div className="board">
      {boardEntries.map((rowEntries, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {rowEntries.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={cell}
              onCellValueChange={handleCellValueChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
