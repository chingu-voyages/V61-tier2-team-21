import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GameResultsModalProps } from "@/types/game/gameResults";
import { TOAST_DURATION_MS } from "@/data/constants";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

export default function GameResultsModal({ open }: GameResultsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const gameResult = useGameStore((s) => s.gameResult);
  const answer = useGameStore((s) => s.answer);
  const attempts = useGameStore((s) => s.currentRow) + 1; // row index starts with 0

  useEffect(() => {
    if (!open) return;

    // Delay matches the toast duration so the modal opens after the win/lose toast dismisses
    const timeoutId = setTimeout(() => setIsOpen(true), TOAST_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [open]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={true}
        className="gap-2.5 rounded-[25px] border-3 border-light-primary p-0 py-6 sm:p-10.75 bg-light-100 w-full max-w-4/5"
      >
        <DialogDescription className="sr-only">Your Questle results for today</DialogDescription>

        <div className="relative flex w-full items-center justify-center">
          <DialogTitle className="text-2xl font-medium sm:text-3xl">
            {gameResult === "win" ? "Correct!" : "Try Again"}
          </DialogTitle>
        </div>

        {gameResult === "win" && (
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-base font-medium sm:flex-row sm:gap-8 sm:px-8 sm:text-2xl">
            <p>
              You got it in {attempts} {`${attempts > 1 ? "tries!" : "try!"}`}
            </p>
            {/* <p>Tries: {attempts}</p> */}
            {/* <p>Win Rate: {percentCorrect}%</p>
          <p>Streak: {streak}</p> */}
          </div>
        )}

        <p className="text-center text-xl font-medium sm:text-2xl">
          Solved Word: {answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase()}
        </p>

        <hr className="border-light border-2" />

        {/* <div className="flex flex-col items-center gap-1.25 px-2.5">
          <p className="text-xl font-medium sm:text-2xl">Guess Distribution</p>
          <div className="flex flex-col items-start">
            {guessDistribution.map((count, i) => (
              <GuessDistributionRow
                key={i}
                tries={i + 1}
                count={count}
                isWinningRow={i + 1 === attempts}
              />
            ))}
          </div>
        </div> */}

        {/* <hr className="border-light border-2" /> */}

        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center text-base font-medium sm:flex-row sm:gap-8 sm:px-8 sm:text-2xl">
          {/* <p>Attempts Remaining: {MAX_GUESSES - attempts}</p> */}
          <p>Return tomorrow for another attempt!</p>
        </div>

        {/* <div className="flex flex-col items-center justify-center gap-4 px-8 sm:flex-row sm:gap-6">
          <Button
            onClick={onShare}
            className="h-16 w-full gap-1 rounded-[20px] border border-accent bg-accent-secondary text-lg text-light-primary hover:bg-accent-secondary/80 sm:h-20 sm:w-60 sm:text-xl"
          >
            Share <Share className="size-6.5 sm:size-8.5" />
          </Button>
          <Button
            onClick={onPractice}
            variant="outline"
            className="h-16 w-full rounded-[20px] border-3 border-light-primary text-lg sm:h-20 sm:w-60 sm:text-xl"
          >
            Practice
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
