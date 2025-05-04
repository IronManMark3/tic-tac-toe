import React, { useState } from "react";
import "./App.css";

const Square = ({ value, onClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? "winning" : ""}`} onClick={onClick} disabled={value !== null}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick, winningSquares }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} isWinning={winningSquares.includes(index)} />
      ))}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return { winner: null, winningSquares: [] };
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const { winner, winningSquares } = calculateWinner(squares);
  const isDraw = squares.every((square) => square !== null) && !winner;
  const status = winner
    ? `Winner: ${winner} 🎉`
    : isDraw
    ? "It's a Draw! 🤝"
    : `Next player: ${isXNext ? "X" : "O"}`;

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} winningSquares={winningSquares} />
      <button className="reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
