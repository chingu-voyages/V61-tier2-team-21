import { describe, expect, it } from "vitest";
import { compareGuess, validateGuess } from "./gameLogic";

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

describe("compareGuess", () => {
  it("returns all correct", () => {
    expect(compareGuess("CRANE", "CRANE")).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("returns the correct mix of states", () => {
    expect(compareGuess("HELLO", "WORLD")).toEqual([
      "incorrect",
      "incorrect",
      "present",
      "correct",
      "present",
    ]);
  });

  it("returns all incorrect", () => {
    expect(compareGuess("AAAAA", "BBBBB")).toEqual([
      "incorrect",
      "incorrect",
      "incorrect",
      "incorrect",
      "incorrect",
    ]);
  });

  it("handles duplicate letters correctly", () => {
    expect(compareGuess("ALLOT", "APPLE")).toEqual([
      "correct",
      "present",
      "incorrect",
      "incorrect",
      "incorrect",
    ]);
  });

  it("handles duplicate letters (ALLEY vs LEVEL)", () => {
  expect(compareGuess("ALLEY", "LEVEL")).toEqual([
    "incorrect",
    "present",
    "incorrect",
    "correct",
    "incorrect",
    ]);
  });

  it("handles identical words with duplicates", () => {
  expect(compareGuess("EERIE", "EERIE")).toEqual([
    "correct",
    "correct",
    "correct",
    "correct",
    "correct",
    ]);
  });

  it("handles duplicate letters with partial matches", () => {
  expect(compareGuess("EERIE", "REPLY")).toEqual([
    "present",
    "correct",
    "incorrect",
    "incorrect",
    "incorrect",
    ]);
  });
});
