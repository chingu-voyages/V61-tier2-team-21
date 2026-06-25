import { KEYBOARD_LAYOUT } from "./keyboardLayout";

interface KeyboardProps {
  onLetter: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

export default function Keyboard({
  onLetter,
  onEnter,
  onBackspace,
}: KeyboardProps) {
  return (
    <div className="flex flex-col gap-1">
      {KEYBOARD_LAYOUT.map((row) => (
        <div
          key={row.join("")}
          className="flex justify-center gap-1"
        >
          {row.map((key) => {
            const isSpecial =
              key === "Enter" || key === "Delete";

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === "Enter") {
                    onEnter();
                    return;
                  }

                  if (key === "Delete") {
                    onBackspace();
                    return;
                  }

                  onLetter(key);
                }}
                className={`
                  flex items-center justify-center
                  rounded-md border
                  ${
                    isSpecial
                      ? "h-12 min-w-25 px-4"
                      : "h-12 w-12"
                  }
                `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}