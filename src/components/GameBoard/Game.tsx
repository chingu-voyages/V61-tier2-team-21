import { useState } from "react";
import Board from "./Board";
import type { BoardTile } from "../../types/board";

// hard coding the rows for now, make dynamic later!
const GAME_BOARD_ROWS = 6;
const GAME_ROW_LETTERS = 5;

const createEmptyBoard = (): BoardTile[][] => {
  return Array.from({ length: GAME_BOARD_ROWS }, () =>
    Array.from({ length: GAME_ROW_LETTERS }, () => ({
      letter: null,
      state: "empty" as const
    }))
  );
};

export default function Game() {
  // need to build setBoard later!
  const [board] = useState<BoardTile[][]>(createEmptyBoard);

  return (
    <div>
      <Board board={board} />
    </div>
  );
}
