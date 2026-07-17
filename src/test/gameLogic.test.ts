import { describe, it, expect } from "vite-plus/test";
import { validateGuess, compareGuess } from "@/lib/gameLogic";

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
