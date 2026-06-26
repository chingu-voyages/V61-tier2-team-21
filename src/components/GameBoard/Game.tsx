import { useState } from "react";

import Board from "./Board";
import Keyboard from "../Keyboard/Keyboard";

import type { BoardTile } from "../../types/board/board";

import wordles from "../../data/wordles.json";
import validGuesses from "../../lib/validGuesses";

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

  const [currentRow] = useState(0);

  const [answer] = useState(
    () => wordles[Math.floor(Math.random() * wordles.length)],
  );

  const handleLetter = (letter: string) => {
    console.log("Letter:", letter);
  };

  const handleBackspace = () => {
    console.log("Delete");
  };

  const handleEnter = () => {
    const guess = board[currentRow]
      .map((tile) => tile.letter ?? "")
      .join("")
      .toLowerCase();

    if (guess.length !== wordLength) {
      console.log("Guess is too short.");
      return;
    }

    if (!validGuesses.includes(guess)) {
      console.log("Not in word list.");
      return;
    }

    console.log("Answer:", answer);
    console.log("Guess:", guess);

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
