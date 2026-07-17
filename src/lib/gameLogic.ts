// lib
import validGuesses from "@/lib/validGuesses";

// I thought I could pass WORD_LENGTH.DEFAULT in to args here
// but it was throwing errors, leaving it as wordLength: number for now
export function validateGuess(guess: string, wordLength: number): boolean {
  if (guess.length !== wordLength) return false;
  return validGuesses.includes(guess.toLowerCase());
}

export function compareGuess(guess: string, answer: string) {
  const wordLength = 6;
  const remaining = answer.split("");
  const states: ("correct" | "present" | "incorrect")[] = Array(wordLength).fill("incorrect");

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
