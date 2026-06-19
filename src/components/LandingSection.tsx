import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col items-center max-w-7xl mx-auto text-center gap-y-4">
      <h2 className="text-5xl font-bold font-title">Questle</h2>
      <div>
        <Button variant="outline" className="cursor-pointer px-8 bg-accent border-gray-400 text-light-inverse">
          Play
        </Button>
      </div>
    </section>
  );
}
