// core
import { useGameStore } from "@/store/gameStore";
import Game from "@/components/GameBoard/Game";

export default function Playing() {
  const finishGame = useGameStore((s) => s.finishGame);

  return (
    <section className="flex flex-col items-center gap-y-2">
      <Game />

      <button className="py-4 text-red-300" onClick={finishGame}>
        End Game
      </button>
    </section>
  );
}
