import validGuesses from "./validGuesses";

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
