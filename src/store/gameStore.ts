// core
import { create } from "zustand";

// data
import { DEFAULT_GAME_CONFIG, WORD_LENGTH } from "@/data/constants";

// libs
import { getRandomAnswer } from "@/lib/getRandomAnswer";
import { createEmptyBoard } from "@/lib/createEmptyBoard";

// types
import type { GameStore } from "../types/game/gameConfig";

export const useGameStore = create<GameStore>((set) => ({
  config: DEFAULT_GAME_CONFIG,
  phase: "landing",
  startGame: () => set({ phase: "gameInProgress" }),
  finishGame: () => set({ phase: "gameFinished" }),
  resetGame: () =>
    set((state) => ({
      phase: "landing",
      answer: getRandomAnswer(state.config.wordLength),
      board: createEmptyBoard(state.config.wordLength, state.config.maxGuesses),
      currentRow: 0,
      gameResult: null,
      guessedLetters: {},
    })),
  setWordLength: (length: number) =>
    set((state) => {
      const wordLength = Math.min(WORD_LENGTH.MAX, Math.max(WORD_LENGTH.MIN, length));
      return {
        config: { ...state.config, wordLength },
        answer: getRandomAnswer(wordLength),
        board: createEmptyBoard(wordLength, state.config.maxGuesses),
        currentRow: 0,
        gameResult: null,
        guessedLetters: {},
      };
    }),
  answer: getRandomAnswer(DEFAULT_GAME_CONFIG.wordLength),
  board: createEmptyBoard(DEFAULT_GAME_CONFIG.wordLength, DEFAULT_GAME_CONFIG.maxGuesses),
  currentRow: 0,
  gameResult: null,
  guessedLetters: {},
}));
