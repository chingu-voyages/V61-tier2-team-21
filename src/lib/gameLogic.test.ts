import { describe, expect, it } from "vitest";
import { validateGuess } from "./gameLogic";

describe("validateGuess", () => {
  it("returns true for a valid word", () => {
    expect(validateGuess("HELLO")).toBe(true);
  });

  it("returns false for a word that is too short", () => {
    expect(validateGuess("HI")).toBe(false);
  });

  it("returns false for a word that is too long", () => {
    expect(validateGuess("HELLOO")).toBe(false);
  });

  it("returns false for a word not in the word list", () => {
    expect(validateGuess("XYZZY")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(validateGuess("")).toBe(false);
  });
});
