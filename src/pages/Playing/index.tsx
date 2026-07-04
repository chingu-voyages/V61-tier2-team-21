import Game from "@/components/GameBoard/Game";
import GameResultsModal from "@/components/GameResultsModal";
import { useGameStore } from "@/store/gameStore";

export default function Playing() {
  const gameResult = useGameStore((s) => s.gameResult);
  const answer = useGameStore((s) => s.answer);
  const attempts = useGameStore((s) => s.currentRow) + 1; // row index starts with 0

  return (
    <section className="flex flex-col items-center w-257.5">
      {gameResult && (
        <GameResultsModal
          open
          onPractice={() => {}}
          onShare={() => {}}
          answer={answer}
          attempts={attempts}
          percentCorrect={25}
          streak={3}
          guessDistribution={[1, 1, 0, 2, 1]}
        />
      )}
      <Game />
    </section>
  );
}
