export type GamePhase = "landing" | "gameInProgress" | "gameFinished";

export interface GameStore {
  phase: GamePhase;
  startGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
}
