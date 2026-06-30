import wordles from "@/data/wordles.json";

// dummy, old date just to provide a
// stable, static start point
const START_DATE = new Date("2024-01-01T00:00:00.000Z");

// I want to get the wordLength to be dynamic later on somehow
export const getRandomAnswer = (wordLength: number = 5, date: Date = new Date()): string => {
  const matching = wordles.filter((word) => word.length === wordLength);

  if (matching.length === 0) return "";

  // get days in UTC date so the words are stable for 24hrs
  const dateStr = date.toISOString().split("T")[0];
  const startStr = START_DATE.toISOString().split("T")[0];

  const daysSinceStart = Math.floor(
    (new Date(dateStr).getTime() - new Date(startStr).getTime()) / (1000 * 60 * 60 * 24),
  );

  const index = daysSinceStart % matching.length;

  return matching[index] ?? "";
};

export default getRandomAnswer;
