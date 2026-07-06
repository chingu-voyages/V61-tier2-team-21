import { describe, it, expect } from "vite-plus/test";
import { getRandomAnswer } from "@/lib/getRandomAnswer";

// technically 'getRandomAnswer' is dubious
// properly speaking, each day is assigned a unique answer
// with high variance
describe("getRandomAnswer", () => {
  it("returns the same word for different time zones on the same local day", () => {
    const morningZone = new Date(2026, 6, 1, 8, 0, 0);
    const eveningZone = new Date(2026, 6, 1, 22, 0, 0);

    const morningWordle = getRandomAnswer(5, morningZone);
    const eveningWordle = getRandomAnswer(5, eveningZone);

    expect(morningWordle).toBe(eveningWordle);
  });

  it("returns a different word for a different local day", () => {
    const july1 = new Date(2026, 6, 1, 23, 30, 0);
    const july2 = new Date(2026, 6, 2, 0, 30, 0);

    const july1Wordle = getRandomAnswer(5, july1);
    const july2Wordle = getRandomAnswer(5, july2);

    expect(july1Wordle).not.toBe(july2Wordle);
  });
});
