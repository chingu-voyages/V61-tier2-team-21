// lib
import { DEFAULT_GAME_CONFIG, PRIORITY } from "@/data/constants";
import validGuesses from "@/lib/validGuesses";
import type { GuessedLetters, GuessLetterState } from "@/types/game/gameConfig";

// I thought I could pass WORD_LENGTH.DEFAULT in to args here
// but it was throwing errors, leaving it as wordLength: number for now
export function validateGuess(guess: string, wordLength: number): boolean {
  if (guess.length !== wordLength) return false;
  return validGuesses.includes(guess.toLowerCase());
}

export function compareGuess(guess: string, answer: string) {
  const wordLength = DEFAULT_GAME_CONFIG.wordLength;
  const remaining = answer.split("");
  const states: GuessLetterState[] = Array(wordLength).fill("incorrect");

  for (let i = 0; i < wordLength; i++) {
    if (guess[i] === answer[i]) {
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

  return states;
}

export function updateGuessedLetters({
  oldGuesses,
  newGuess,
  newStates,
}: {
  oldGuesses: GuessedLetters;
  newGuess: string;
  newStates: GuessLetterState[];
}) {
  const updated = new Map(Object.entries(oldGuesses));

  Array.from(newGuess).forEach((letter, i) => {
    const newState = newStates[i];
    const oldState = updated.get(letter);

    // update only when there is no old state or new state has higher priority than the previous state
    if (!oldState || PRIORITY[newState] > PRIORITY[oldState]) {
      updated.set(letter, newState);
    }
  });
  return Object.fromEntries(updated);
}
