import { describe, it, expect } from "vite-plus/test";
import { validateGuess, compareGuess, updateGuessedLetters } from "@/lib/gameLogic";

describe("validateGuess", () => {
  it("returns true for a valid 5-letter word", () => {
    expect(validateGuess("HELLO", 5)).toBe(true);
  });

  it("returns false when the guess is too short", () => {
    expect(validateGuess("HI", 5)).toBe(false);
  });
});

describe("compareGuess", () => {
  it("marks every letter correct for an exact match", () => {
    expect(compareGuess("APPLE", "APPLE")).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("marks letters incorrect when they don't appear in the answer", () => {
    expect(compareGuess("CRIMP", "ABOUT")).toEqual([
      "incorrect",
      "incorrect",
      "incorrect",
      "incorrect",
      "incorrect",
    ]);
  });

  it("marks a letter present when it's in the answer but at the wrong position", () => {
    expect(compareGuess("LEMON", "MELON")).toEqual([
      "present",
      "correct",
      "present",
      "correct",
      "correct",
    ]);
  });

  it("only marks as many duplicate letters as appear in the answer", () => {
    // "PIZZA" has one Z (used by the correct match at index 2) and one A
    // (used by the correct match at index 4), so the extra Z and A in the
    // guess have nothing left to match.
    expect(compareGuess("ZZZAA", "PIZZA")).toEqual([
      "present",
      "incorrect",
      "correct",
      "incorrect",
      "correct",
    ]);
  });

  it("doesn't mark a duplicate letter as present once all copies are used by correct matches", () => {
    // "ERROR" has three Rs, all consumed by correct-position matches
    // (indices 1, 2, 4), so the extra R at index 0 is incorrect, not present.
    expect(compareGuess("RRROR", "ERROR")).toEqual([
      "incorrect",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });
});

describe("updateGuessedLetters", () => {
  it("upgrades a gray letter to yellow", () => {
    const result = updateGuessedLetters({
      oldGuesses: { A: "incorrect" },
      newGuess: "APPLE",
      newStates: ["present", "incorrect", "incorrect", "incorrect", "incorrect"],
    });

    expect(result.A).toBe("present");
  });

  it("upgrades a yellow letter to green", () => {
    const result = updateGuessedLetters({
      oldGuesses: { B: "present" },
      newGuess: "BOARD",
      newStates: ["correct", "incorrect", "incorrect", "incorrect", "incorrect"],
    });

    expect(result.B).toBe("correct");
  });

  it("never downgrades a green letter", () => {
    const result = updateGuessedLetters({
      oldGuesses: { C: "correct" },
      newGuess: "CRIMP",
      newStates: ["present", "incorrect", "incorrect", "incorrect", "incorrect"],
    });

    expect(result.C).toBe("correct");
  });

  it("adds a brand-new letter that wasn't guessed before", () => {
    const result = updateGuessedLetters({
      oldGuesses: {},
      newGuess: "APPLE",
      newStates: ["correct", "correct", "correct", "correct", "correct"],
    });

    expect(result).toEqual({
      A: "correct",
      P: "correct",
      L: "correct",
      E: "correct",
    });
  });

  it("doesn't mutate the oldGuesses object it was given", () => {
    const oldGuesses = { A: "incorrect" as const };

    updateGuessedLetters({
      oldGuesses,
      newGuess: "APPLE",
      newStates: ["present", "incorrect", "incorrect", "incorrect", "incorrect"],
    });

    expect(oldGuesses.A).toBe("incorrect");
  });

  it("keeps the best state per letter when the same letter repeats in one guess with different results", () => {
    // "APPLE" has two Ps; guessing "PIZZA" style duplicates should still
    // leave the best (correct) state for the letter, not the last-seen one.
    const result = updateGuessedLetters({
      oldGuesses: {},
      newGuess: "PP",
      newStates: ["incorrect", "correct"],
    });

    expect(result.P).toBe("correct");
  });
});
