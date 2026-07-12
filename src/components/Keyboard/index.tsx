import { KEYBOARD_ROWS } from "@/data/constants";
import { useGameStore } from "@/store/gameStore";
import type { KeyboardKey } from "@/types/keyboard";
import Key from "./Key";

interface KeyboardProps {
  onLetter: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

export default function Keyboard(handlers: KeyboardProps) {
  const guessedLetters = useGameStore((s) => s.guessedLetters);

  return (
    <div className="w-full mt-18.5">
      {KEYBOARD_ROWS.map((row) => (
        <div
          key={row.join("")}
          className="flex justify-center w-full h-17.5 gap-x-2.5 mt-0.75"
        >
          {row.map((key: KeyboardKey) => {
            const isSpecial =
              key === "ENTER" || key === "DELETE";

            return (
              <Key
                key={key}
                label={key}
                isSpecial={isSpecial}
                onKeyClick={handlers}
                state={
                  !isSpecial
                    ? guessedLetters[key]
                    : undefined
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
