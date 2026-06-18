import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto text-center gap-y-4">
      <h1 className="text-5xl font-bold font-title">Questle</h1>
      <section>
        <Button variant="outline" className="cursor-pointer px-8">
          Play
        </Button>
      </section>
    </div>
  );
}
