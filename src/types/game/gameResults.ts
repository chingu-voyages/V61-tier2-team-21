export type GameResultsModalProps = {
  open: boolean;
  guessDistribution: number[];
  onShare: () => void;
  onPractice: () => void;
};
