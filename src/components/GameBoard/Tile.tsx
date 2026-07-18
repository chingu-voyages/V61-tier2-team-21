import type React from "react";
import type { TileProps, TileState } from "../../types/board/tile";

// A record is a union of types
// We need both the TileState defined above, and the string of tailwind classes
const stateStyles: Record<TileState, string> = {
  empty: "bg-transparent text-black dark:text-white",
  filled: "bg-transparent text-black dark:text-white", // looks the same as empty, for now
  correct: "text-light-primary",
  present: "text-light-primary",
  incorrect: "text-light-primary",
};

const flipColors: Record<string, string> = {
  correct: "var(--game-correct)",
  present: "var(--game-present)",
  incorrect: "var(--game-absent)",
};

export default function Tile({ letter, state, index }: TileProps) {
  const resultState = state === "correct" || state === "present" || state === "incorrect";

  return (
    <div
      className={`w-14 h-10 flex items-center rounded-md justify-center text-xl font-bold uppercase border border-light-disabled transition-colors duration-300 rotate ${stateStyles[state]} ${resultState ? "animate-flip" : ""}`}
      style={
        resultState
          ? ({
              animationDelay: `${index * 100}ms`,
              "--flip-color": flipColors[state],
            } as React.CSSProperties)
          : undefined
      }
    >
      {letter}
    </div>
  );
}
