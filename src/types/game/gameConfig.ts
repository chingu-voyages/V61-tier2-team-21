import type { BoardTile } from "../board/board";
import type { TileState } from "../board/tile";
import type { GamePhase } from "./gamePhases";

export type GameConfig = {
  wordLength: number;
  maxGuesses: number;
};

// I'm not super happy with bunching so many items together
// I'd like to break these out into focused groups
// e.g. GameResults, GamePhases, etc.
export interface GameStore {
  config: GameConfig;
  phase: GamePhase;
  board: BoardTile[][];
  guessedLetters: Record<string, TileState>;
  answer: string;
  currentRow: number;
  currentCol: number;
  gameResult: "win" | "lose" | null;
  setWordLength: (length: number) => void;
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: () => void;
  startGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
}
