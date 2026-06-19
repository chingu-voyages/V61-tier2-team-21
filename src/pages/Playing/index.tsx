// core
import { useGameStore } from "@/store/gameStore";
import Game from "@/components/GameBoard/Game";

export default function Playing() {
  const finishGame = useGameStore((s) => s.finishGame);

  return (
    <section className="flex flex-col items-center gap-y-2">
      <Game />
      {/* keyboard will go here! */}
      <p className="text-red-300 py-4" onClick={finishGame}>
        Keyboard element to go here!
      </p>
    </section>
  );
}
