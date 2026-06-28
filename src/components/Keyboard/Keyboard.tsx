import { KEYBOARD_ROWS } from '@/data/constants';
import type { KeyboardKey } from '@/types/keyboard';

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
      {KEYBOARD_ROWS.map((row) => (
        <div key={row.join('')} className="flex justify-center gap-1">
          {row.map((key: KeyboardKey) => {
            const isSpecial = key === 'ENTER' || key === 'DELETE';

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === 'ENTER') {
                    onEnter();
                    return;
                  }

                  if (key === 'DELETE') {
                    onBackspace();
                    return;
                  }

                  onLetter(key);
                }}
                className={`
                  flex items-center justify-center
                  rounded-md border
                  ${isSpecial ? 'h-12 min-w-25 px-4' : 'h-12 w-12'}
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
