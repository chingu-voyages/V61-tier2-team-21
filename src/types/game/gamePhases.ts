import type { GameConfig } from "./gameConfig";

export type GamePhase = "landing" | "gameInProgress" | "gameFinished";

export interface GameStore {
  config: GameConfig;
  phase: GamePhase;
  startGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
  setWordLength: (length: number) => void;
}
