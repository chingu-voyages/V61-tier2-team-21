import type { TileState } from "../../types/board/tile";

interface KeyProps {
  label: string;
  isSpecial: boolean;
  state?: TileState;

  onKeyClick: {
    onEnter: () => void;
    onBackspace: () => void;
    onLetter: (label: string) => void;
  };
}

export default function Key({
  label,
  isSpecial,
  state,
  onKeyClick,
}: KeyProps) {
  const { onEnter, onBackspace, onLetter } = onKeyClick;

  const colorClass =
    state === "correct"
      ? "bg-green-500 text-white border-green-500"
      : state === "present"
        ? "bg-amber-400 text-white border-amber-400"
        : state === "incorrect"
          ? "bg-gray-500 text-white border-gray-500"
          : "";

  return (
    <button
      type="button"
      onClick={() => {
        if (label === "ENTER") {
          onEnter();
          return;
        }

        if (label === "DELETE") {
          onBackspace();
          return;
        }

        onLetter(label);
      }}
      className={`
        border-2
        border-[--text-light-primary]
        w-full
        h-full
        max-h-17.5
        rounded-[10px]
        xs:text-sm
        sm:text-[28px]
        xl:text-[38px]
        transition-colors
        ${isSpecial ? "max-w-46.75" : "max-w-20"}
        ${colorClass}
      `}
    >
      {label}
    </button>
  );
}
