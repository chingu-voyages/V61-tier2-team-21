import type { GameConfig } from "@/types/game/gameConfig";

export const WORD_LENGTH = {
  MIN: 4,
  DEFAULT: 5,
  MAX: 6,
} as const;

export const MAX_GUESSES = 6;

export const DEFAULT_GAME_CONFIG: GameConfig = {
  wordLength: WORD_LENGTH.DEFAULT,
  maxGuesses: MAX_GUESSES,
};

export const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
] as const;
