import { XCircle } from "@mynaui/icons-react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GameResultsModalProps } from "@/types/game/gameResults";
import GuessDistributionRow from "./GuessDistributionRow";
import { MAX_GUESSES } from "@/data/constants";

export default function GameResultsModal({
  open,
  answer,
  attempts,
  percentCorrect,
  streak,
  guessDistribution,
  onShare,
  onPractice,
}: GameResultsModalProps) {
  return (
    <Dialog open={open} onOpenChange={(prev) => !prev}>
      <DialogContent
        showCloseButton={false}
        className="gap-2.5 rounded-[25px] border-3 border-light-primary p-0 py-6 sm:p-10.75 bg-white w-full max-w-2/3"
      >
        <DialogDescription className="sr-only">Your Wordle results for today</DialogDescription>

        <div className="relative flex w-full items-center justify-center">
          <DialogTitle className="text-2xl font-medium sm:text-3xl">Correct!</DialogTitle>
          <DialogClose className="absolute right-[10px] cursor-pointer border-none bg-transparent p-0">
            <XCircle className="size-8 sm:size-11.25" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 px-4 text-base font-medium sm:flex-row sm:gap-8 sm:px-8 sm:text-2xl">
          <p>Tries: {attempts}</p>
          <p>Percent Correct: {percentCorrect}%</p>
          <p>Streak: {streak}</p>
        </div>

        <hr className="border-light border-2" />

        <div className="flex flex-col items-center gap-[5px] px-[10px]">
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
        </div>

        <hr className="border-light border-2" />

        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center text-base font-medium sm:flex-row sm:gap-8 sm:px-8 sm:text-2xl">
          <p>Attempts Remaining: {MAX_GUESSES - attempts}</p>
          <p>Return tomorrow for another attempt!</p>
        </div>

        <p className="text-center text-xl font-medium sm:text-2xl">
          Solved Word: {answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase()}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 px-8 sm:flex-row sm:gap-6">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
