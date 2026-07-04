export type GameResultsModalProps = {
  open: boolean;
  answer: string;
  attempts: number;
  percentCorrect: number;
  streak: number;
  guessDistribution: number[];
  onShare: () => void;
  onPractice: () => void;
};
