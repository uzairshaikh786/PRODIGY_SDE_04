// src/App.js
import React from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Solver</h1>
      </header>
      <main>
        <SudokuGrid />
      </main>
    </div>
  );
}

export default App;
