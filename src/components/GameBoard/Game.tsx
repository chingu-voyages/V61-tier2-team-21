import { useEffect, useState } from "react";

import Board from "./Board";
import Keyboard from "../Keyboard/Keyboard";

import type { BoardTile } from "../../types/board/board";

interface GameProps {
  rows?: number;
  wordLength?: number;
}

const createEmptyBoard = (
  rows: number,
  wordLength: number,
): BoardTile[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: wordLength }, () => ({
      letter: null,
      state: "empty" as const,
    })),
  );

export default function Game({
  rows = 6,
  wordLength = 5,
}: GameProps) {
  const [board, setBoard] = useState<BoardTile[][]>(() =>
    createEmptyBoard(rows, wordLength),
  );

  const [currentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver] = useState(false);

  const handleLetter = (letter: string) => {
    if (gameOver || currentCol >= wordLength) return;

    setBoard((prev) => {
      const next = prev.map((row) => row.map((tile) => ({ ...tile })));

      next[currentRow][currentCol] = {
        letter,
        state: "filled",
      };

      return next;
    });

    setCurrentCol((c) => c + 1);
  };

  const handleBackspace = () => {
    if (gameOver || currentCol === 0) return;

    setBoard((prev) => {
      const next = prev.map((row) => row.map((tile) => ({ ...tile })));

      next[currentRow][currentCol - 1] = {
        letter: null,
        state: "empty",
      };

      return next;
    });

    setCurrentCol((c) => c - 1);
  };

  const handleEnter = () => {
    console.log("Enter");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEnter();
      } else if (event.key === "Backspace") {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleLetter(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <Board board={board} />

      <Keyboard
        onLetter={handleLetter}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
    </div>
  );
}
