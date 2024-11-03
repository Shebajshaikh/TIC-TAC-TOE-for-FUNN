import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    if (state.every((square) => square !== null)) {
      return "draw";
    }

    return false;
  };

  const isWinner = checkWinner();
  const handleClick = (index) => {
    if (state[index] !== null || isWinner) {
      return;
    }

    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setState(copyState);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fafafa",
        padding: "20px",
      }}
    >
      {isWinner ? (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {isWinner === "draw" ? (
            <>
              <h2>It's a Draw!</h2>
              <button
                onClick={handleReset}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#ff6347",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Play Again
              </button>
            </>
          ) : (
            <>
              <h2>{isWinner} Wins the Game!</h2>
              <button
                onClick={handleReset}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#ff6347",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Play Again
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: "20px" }}>Player {isXTurn ? "X" : "O"}'s Turn</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 100px)",
              gap: "10px",
            }}
          >
            {state.map((value, index) => (
              <Square key={index} onClick={() => handleClick(index)} value={value} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
