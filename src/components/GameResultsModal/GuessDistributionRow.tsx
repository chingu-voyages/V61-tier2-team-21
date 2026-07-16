import { cn } from "@/lib/tailwindUtils";

export default function GuessDistributionRow({
  tries,
  count,
  isWinningRow,
}: {
  tries: number;
  count: number;
  isWinningRow: boolean;
}) {
  return (
    <div className="flex h-[28px] items-center gap-[6px] sm:h-[35px] sm:gap-[10px]">
      <p className="w-[20px] text-lg font-medium sm:w-[25px] sm:text-2xl">{tries}:</p>
      <div
        className={cn(
          "flex h-[24px] min-w-[32px] items-center justify-center rounded-full px-[8px] text-lg font-medium sm:h-[29px] sm:min-w-[40px] sm:px-[10px] sm:text-2xl",
          isWinningRow
            ? "bg-game-correct text-light-primary"
            : "bg-light-primary text-light-inverse",
        )}
      >
        {count}
      </div>
    </div>
  );
}
