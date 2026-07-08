import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { Share2 } from "lucide-react";

export default function Finished() {
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <section className="flex flex-col items-center gap-y-2">
      <h2>Game Over</h2>
      <Button onClick={resetGame}>
        <Share2 /> Share
      </Button>
    </section>
  );
}
