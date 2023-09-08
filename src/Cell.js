import React, { useState, useEffect } from "react";

function Cell({ cell, onCellValueChange }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(cell.value);
  }, [cell.value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onCellValueChange(cell.row, cell.col, newValue);
  };

  const handleCellClick = () => {
    if (!cell.readOnly) {
      const newValue = prompt(
        `Enter a number for cell at row ${cell.row + 1}, column ${cell.col + 1}:`,
        inputValue
      );

      if (newValue !== null) {
        setInputValue(newValue);
        onCellValueChange(cell.row, cell.col, newValue); // Update the boardEntries state
      }
    }
  };

  return (
    <input
      type="text"
      className={`cell ${cell.readOnly ? "read-only" : ""}`}
      maxLength={1}
      value={inputValue}
      readOnly={cell.readOnly}
      data-row={cell.row}
      data-col={cell.col}
      onClick={handleCellClick}
      onChange={handleChange}
    />
  );
}

export default Cell;
