import type { TileProps, TileState } from "../../types/board/tile";

// A record is a union of types
// We need both the TileState defined above, and the string of tailwind classes
const stateStyles: Record<TileState, string> = {
  empty: "bg-transparent text-black dark:text-white",
  filled: "bg-transparent text-black dark:text-white", // looks the same as empty, for now
  correct: "bg-green-500 text-white",
  present: "bg-amber-400 text-white",
  incorrect: "bg-gray-500 text-white"
};

export default function Tile({ letter, state }: TileProps) {
  return (
    <div
      className={`w-14 h-10 flex items-center rounded-md justify-center text-xl font-bold uppercase border border-gray-500 transition-colors duration-300 ${stateStyles[state]}`}>
      {letter}
    </div>
  );
}

Tile.displayName = "Tile";
