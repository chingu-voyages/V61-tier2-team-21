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
        rounded-md
        font-bold
        uppercase
        select-none
        w-10 sm:w-12
      `}
    >
      {label}
    </button>
  );
}
