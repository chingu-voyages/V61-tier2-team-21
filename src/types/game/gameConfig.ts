import type { BoardTile } from "../board/board";
import type { TileState } from "../board/tile";
import type { GamePhase } from "./gamePhases";

export type GameConfig = {
  wordLength: number;
  maxGuesses: number;
};

export type GuessLetterState = Exclude<TileState, "empty" | "filled">;

export type GuessedLetters = Record<string, GuessLetterState>;

// I'm not super happy with bunching so many items together
// I'd like to break these out into focused groups
// e.g. GameResults, GamePhases, etc.
export interface GameStore {
  config: GameConfig;
  phase: GamePhase;
  board: BoardTile[][];
  guessedLetters: GuessedLetters;
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
