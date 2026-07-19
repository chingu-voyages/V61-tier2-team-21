import { GUESSED_LETTER_STATE_COLOR, LETTER_STYLE } from "@/data/constants";
import type { GuessLetterState } from "@/types/game/gameConfig";

interface KeyProps {
  label: string;
  isSpecial: boolean;
  onKeyClick: {
    onEnter: () => void;
    onBackspace: () => void;
    onLetter: (label: string) => void;
  };
  guessedLetterState: GuessLetterState | undefined;
}

export default function Key({ label, isSpecial, onKeyClick, guessedLetterState }: KeyProps) {
  const { onEnter, onBackspace, onLetter } = onKeyClick;

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
      className={` w-full h-full max-h-17.5 rounded-[10px] xs:text-sm sm:text-[28px] xl:text-[38px] ${isSpecial ? "max-w-46.75" : "max-w-20"}  ${guessedLetterState ? LETTER_STYLE[guessedLetterState] : ""} ${guessedLetterState ? `bg-${GUESSED_LETTER_STATE_COLOR[guessedLetterState]}` : ""} border-2 border-light-primary`}
    >
      {label}
    </button>
  );
}
