import validGuesses from "./validGuesses";
import type { TileState } from "../types/board/tile";

export function validateGuess(
  guess: string,
  wordLength = 5,
): boolean {
  const normalizedGuess = guess.trim().toLowerCase();

  if (normalizedGuess.length !== wordLength) {
    return false;
  }

  return validGuesses.includes(normalizedGuess);
}

export function compareGuess(
  guess: string,
  answer: string,
): TileState[] {
  guess = guess.toUpperCase();
  answer = answer.toUpperCase();

  const states: TileState[] = Array(guess.length).fill("incorrect");
  const remaining = answer.split("");

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      states[i] = "correct";
      remaining[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (states[i] === "correct") {
      continue;
    }

    const index = remaining.indexOf(guess[i]);

    if (index !== -1) {
      states[i] = "present";
      remaining[index] = "";
    }
  }

  return states;
}
