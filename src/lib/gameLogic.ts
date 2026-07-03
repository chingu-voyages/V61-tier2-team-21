// lib
import validGuesses from "@/lib/validGuesses";

// I thought I could pass WORD_LENGTH.DEFAULT in to args here
// but it was throwing errors, leaving it as wordLength: number for now
export function validateGuess(guess: string, wordLength: number): boolean {
  if (guess.length !== wordLength) return false;
  return validGuesses.includes(guess.toLowerCase());
}
