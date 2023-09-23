import React, { useState, useEffect } from 'react';
import './SudokuGrid.css';

function SudokuGrid() {
  const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [selectedCell, setSelectedCell] = useState(null);

  const isValidMove = (row, col, num) => {

    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }

    // 3x3 subgrid
    const subgridRowStart = Math.floor(row / 3) * 3;
    const subgridColStart = Math.floor(col / 3) * 3;

    for (let i = subgridRowStart; i < subgridRowStart + 3; i++) {
      for (let j = subgridColStart; j < subgridColStart + 3; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const findEmptyCell = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null; // If no empty cell is found
  };

  const solveSudoku = () => {
    const emptyCell = findEmptyCell();

    if (!emptyCell) {
      // No empty cells left, the puzzle is solved
      return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidMove(row, col, num)) {
        grid[row][col] = num;
        setGrid([...grid]);

        if (solveSudoku()) {
          return true; 
        }

     
        grid[row][col] = 0;
        setGrid([...grid]);
      }
    }

    // No valid number found for this cell, so backtrack
    return false;
  };

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleKeyPress = (event) => {
    if (selectedCell && grid[selectedCell.row][selectedCell.col] === 0) {
      const userInput = parseInt(event.key, 10);
      if (!isNaN(userInput) && userInput >= 1 && userInput <= 9) {
        grid[selectedCell.row][selectedCell.col] = userInput;
        setGrid([...grid]);
      }
    }
  };

  const handleAutoSolveClick = () => {
   
    setTimeout(() => {
      if (solveSudoku()) {
        alert('Sudoku solved successfully!');
      } else {
        alert('Sudoku is unsolvable.');
      }
    }, 1000);
  };

  const handleResetClick = () => {
    setGrid(initialGrid);
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selectedCell]);

  return (
    <div className="sudoku-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell === 0 ? 'editable' : 'fixed'} ${
                selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
      <div className="button-container">
        <button onClick={handleAutoSolveClick}>Auto Solve</button><button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
}

export default SudokuGrid;
