import type { BoardTile } from "@/types/board/board";
import type { TileState } from "@/types/board/tile";

export const createEmptyBoard = (wordLength: number, maxGuesses: number): BoardTile[][] =>
  Array.from({ length: maxGuesses }, () =>
    Array.from({ length: wordLength }, () => ({ letter: null, state: "empty" as TileState })),
  );

export default createEmptyBoard;
