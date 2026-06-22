import { useState } from "react";
import Board from "./Board";
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
  // need to build setBoard later!
  const [board] = useState<BoardTile[][]>(() =>
    createEmptyBoard(rows, wordLength),
  );

  return (
    <div>
      <Board board={board} />
    </div>
  );
}
