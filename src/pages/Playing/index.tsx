import Game from "@/components/GameBoard/Game";
import GameResultsModal from "@/components/GameResultsModal";
import { useGameStore } from "@/store/gameStore";

export default function Playing() {
  const gameResult = useGameStore((s) => s.gameResult);

  return (
    <section className="flex flex-col items-center w-257.5">
      {gameResult && (
        <GameResultsModal
          open
          onPractice={() => {}}
          onShare={() => {}}
          guessDistribution={[0, 1, 1, 0, 2, 1]}
        />
      )}
      <Game />
    </section>
  );
}
