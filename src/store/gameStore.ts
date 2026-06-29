// core
import { create } from "zustand";

// types
import type { GameStore } from "./../types/game/gamePhases";
import { DEFAULT_GAME_CONFIG, WORD_LENGTH } from "@/data/constants";

export const useGameStore = create<GameStore>((set) => ({
  config: DEFAULT_GAME_CONFIG,
  phase: "landing",
  startGame: () => set({ phase: "gameInProgress" }),
  finishGame: () => set({ phase: "gameFinished" }),
  resetGame: () => set({ phase: "landing" }),
  setWordLength: (length: number) =>
    set((state) => ({
      config: {
        ...state.config,
        wordLength: Math.min(WORD_LENGTH.MAX, Math.max(WORD_LENGTH.MIN, length)),
      },
    })),
}));
