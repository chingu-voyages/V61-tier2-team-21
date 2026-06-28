interface KeyProps {
  label: string;
  isSpecial: boolean;
  onKeyClick: {
    onEnter: () => void;
    onBackspace: () => void;
    onLetter: (label: string) => void;
  };
}

export default function Key({ label, isSpecial, onKeyClick }: KeyProps) {
  const { onEnter, onBackspace, onLetter } = onKeyClick;

  return (
    <button
      type="button"
      onClick={() => {
        if (label === 'ENTER') {
          onEnter();
          return;
        }

        if (label === 'DELETE') {
          onBackspace();
          return;
        }

        onLetter(label);
      }}
      className={`border-2 border-[--text-light-primary] w-full h-full max-h-17.5 rounded-[10px] xs:text-sm sm:text-[28px] xl:text-[38px] ${isSpecial ? 'max-w-46.75' : 'max-w-20'}`}
    >
      {label}
    </button>
  );
}
