import Header from "./Navbar";
import Footer from "./Footer";
import { useGameStore } from "@/store/gameStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const phase = useGameStore((s) => s.phase);

  return (
    <div className="flex min-h-screen flex-col bg-light-100">
      {phase !== "landing" && <Header />}
      <main className="flex flex-1 items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
