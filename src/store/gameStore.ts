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
import { toast } from "sonner";
import { compareGuess, updateGuessedLetters } from "@/lib/gameLogic";

export const useGameStore = create<GameStore>((set) => ({
  config: DEFAULT_GAME_CONFIG,
  phase: "landing",
  answer: getRandomAnswer(DEFAULT_GAME_CONFIG.wordLength).toUpperCase(),
  board: createEmptyBoard(DEFAULT_GAME_CONFIG.wordLength, DEFAULT_GAME_CONFIG.maxGuesses),
  currentRow: 0,
  currentCol: 0,
  gameResult: null,
  guessedLetters: {},
  startGame: () => set({ phase: "gameInProgress" }),
  finishGame: () => set({ phase: "gameFinished" }),
  resetGame: () =>
    set((state) => ({
      phase: "landing",
      answer: getRandomAnswer(state.config.wordLength).toUpperCase(),
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
        answer: getRandomAnswer(wordLength).toUpperCase(),
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
      const { wordLength, maxGuesses } = state.config;

      // Guard here (not just in the UI) so submitGuess stays safe even if called from a future entry point that doesn't check gameResult itself
      if (state.gameResult !== null) return state;

      // When the user hasn't typed the full word length
      if (state.currentCol !== state.config.wordLength) {
        toast("Incomplete guess");
        return state;
      }

      const guess = state.board[state.currentRow]
        .map((tile) => tile.letter)
        .join("")
        .toUpperCase();
      const board = state.board.map((row) => row.map((tile) => ({ ...tile })));

      // When the words the user typed is not in the valid words list
      if (!validGuesses.includes(guess.toLowerCase())) {
        toast("Invalid");
        return state;
      }

      const tileStates = compareGuess(guess, state.answer);

      for (let i = 0; i < wordLength; i++) {
        board[state.currentRow][i].state = tileStates[i];
      }

      const updatedGuessedLetters = updateGuessedLetters({
        oldGuesses: state.guessedLetters,
        newGuess: guess,
        newStates: tileStates,
      });

      if (guess === state.answer) {
        toast("You Won!");
        return { board, gameResult: "win" as const };
      }

      if (state.currentRow === maxGuesses - 1) {
        toast(state.answer);
        return { board, gameResult: "lose" as const };
      }

      return {
        board,
        currentRow: state.currentRow + 1,
        currentCol: 0,
        guessedLetters: updatedGuessedLetters,
      };
    }),
}));
