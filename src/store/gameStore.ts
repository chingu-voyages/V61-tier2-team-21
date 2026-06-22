// core
import { create } from "zustand";

// types
import type { GameStore } from "./../types/game/gamePhases";

export const useGameStore = create<GameStore>((set) => ({
  phase: "landing",
  startGame: () => set({ phase: "gameInProgress" }),
  finishGame: () => set({ phase: "gameFinished" }),
  resetGame: () => set({ phase: "landing" })
}));
