import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import Logo from "@/assets/logo.svg";

export default function Landing() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <section className=" flex flex-col items-center max-w-7xl mx-auto text-center gap-7 md:gap-10">
      <h1>
        <img src={Logo} alt="Questle" className="h-full w-auto" />
      </h1>
      <p className="text-2xl max-w-80 md:text-5xl md:max-w-150 font-semibold leading-snug">
        Begin your 5-letter word quest with only 6 chances
      </p>
      <Button
        variant="outline"
        className="cursor-pointer text-xl w-40 h-15 md:w-55 md:h-20 md:text-2xl rounded-[20px] border border-accent bg-accent-secondary "
        onClick={startGame}
      >
        Start
      </Button>
    </section>
  );
}
