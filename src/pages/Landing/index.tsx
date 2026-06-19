import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";

export default function Landing() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto text-center gap-y-4">
      <h1 className="text-5xl font-bold font-title">Questle</h1>
      <section>
        <Button variant="outline" className="cursor-pointer px-8" onClick={startGame}>
          Play
        </Button>
      </section>
    </div>
  );
}
