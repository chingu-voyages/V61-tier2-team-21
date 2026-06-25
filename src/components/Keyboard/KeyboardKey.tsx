export default function KeyboardKey({
  label
}: {
  label: string
}) {
  return (
    <button
      type="button"
      className={`
        h-14
        rounded-lg
        font-semibold
        text-sm
        sm:text-base
        select-none
        w-10 sm:w-12
      `}
    >
      {label}
    </button>
  );
}
