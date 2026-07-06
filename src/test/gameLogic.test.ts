import { describe, it, expect } from "vite-plus/test";
import { validateGuess } from "@/lib/gameLogic";

describe("validateGuess", () => {
  it("returns true for a valid 5-letter word", () => {
    expect(validateGuess("HELLO", 5)).toBe(true);
  });

  it("returns false when the guess is too short", () => {
    expect(validateGuess("HI", 5)).toBe(false);
  });
});
