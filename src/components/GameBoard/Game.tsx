import { useState } from "react";

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
): BoardTile[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: wordLength }, () => ({
      letter: null,
      state: "empty" as const,
    })),
  );
};

export default function Game({
  rows = 6,
  wordLength = 5,
}: GameProps) {
  const [board] = useState<BoardTile[][]>(() =>
    createEmptyBoard(rows, wordLength),
  );

  const handleLetter = (letter: string) => {
    console.log("Letter:", letter);
  };

  const handleEnter = () => {
    console.log("Enter");
  };

  const handleBackspace = () => {
    console.log("Delete");
  };

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
