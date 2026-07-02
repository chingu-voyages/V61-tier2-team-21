// core
import { create } from "zustand";

// data
import { DEFAULT_GAME_CONFIG, WORD_LENGTH } from "@/data/constants";

// libs
import { getRandomAnswer } from "@/lib/getRandomAnswer";
import { createEmptyBoard } from "@/lib/createEmptyBoard";
import validGuesses from "@/lib/validGuesses";

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
      currentCol: 0,
      gameResult: null,
    })),
  setWordLength: (length: number) =>
    set((state) => {
      const wordLength = Math.min(WORD_LENGTH.MAX, Math.max(WORD_LENGTH.MIN, length));
      return {
        config: { ...state.config, wordLength },
        answer: getRandomAnswer(wordLength),
        board: createEmptyBoard(wordLength, state.config.maxGuesses),
        currentRow: 0,
        currentCol: 0,
        gameResult: null,
      };
    }),
  addLetter: (letter: string) =>
    set((state) => {
      if (state.gameResult !== null || state.currentCol >= state.config.wordLength) return state;

      const board = state.board.map((row) => row.map((tile) => ({ ...tile })));
      board[state.currentRow][state.currentCol] = { letter, state: "filled" };

      return { board, currentCol: state.currentCol + 1 };
    }),
  deleteLetter: () =>
    set((state) => {
      if (state.gameResult !== null || state.currentCol === 0) return state;

      const board = state.board.map((row) => row.map((tile) => ({ ...tile })));
      board[state.currentRow][state.currentCol - 1] = { letter: null, state: "empty" };

      return { board, currentCol: state.currentCol - 1 };
    }),
  submitGuess: () =>
    set((state) => {
      if (state.gameResult !== null || state.currentCol !== state.config.wordLength) return state;

      const { wordLength, maxGuesses } = state.config;
      const guess = state.board[state.currentRow]
        .map((tile) => tile.letter)
        .join("")
        .toUpperCase();

      if (!validGuesses.includes(guess.toLowerCase())) {
        alert("Not in word list");
        return state;
      }

      const board = state.board.map((row) => row.map((tile) => ({ ...tile })));
      const remaining = state.answer.split("");
      const states: ("correct" | "present" | "incorrect")[] = Array(wordLength).fill("incorrect");

      for (let i = 0; i < wordLength; i++) {
        if (guess[i] === state.answer[i]) {
          states[i] = "correct";
          remaining[i] = "";
        }
      }

      for (let i = 0; i < wordLength; i++) {
        if (states[i] === "correct") continue;

        const index = remaining.indexOf(guess[i]);

        if (index !== -1) {
          states[i] = "present";
          remaining[index] = "";
        } else {
          states[i] = "incorrect";
        }
      }

      for (let i = 0; i < wordLength; i++) {
        board[state.currentRow][i].state = states[i];
      }

      if (guess === state.answer) {
        alert("You win!");
        return { board, gameResult: "win", phase: "gameFinished" as const };
      }

      if (state.currentRow === maxGuesses - 1) {
        alert(`Game over! Answer: ${state.answer}`);
        return { board, gameResult: "lose", phase: "gameFinished" as const };
      }

      return { board, currentRow: state.currentRow + 1, currentCol: 0 };
    }),
  answer: getRandomAnswer(DEFAULT_GAME_CONFIG.wordLength),
  board: createEmptyBoard(DEFAULT_GAME_CONFIG.wordLength, DEFAULT_GAME_CONFIG.maxGuesses),
  currentRow: 0,
  currentCol: 0,
  gameResult: null,
  guessedLetters: {},
}));
