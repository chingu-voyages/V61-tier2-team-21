// core
import { useGameStore } from "@/store/gameStore";
import Layout from "./components/Layout/index";
<<<<<<< HEAD
import Welcome from "./components/LandingSection";
=======
import Landing from "./pages/Landing";
import Playing from "./pages/Playing";
import Finished from "./pages/Finished";
>>>>>>> 3dcf45d (feat/app-state: zustand game phase routing & updated codebase configuration)

function App() {
  const phase = useGameStore((set) => set.phase); // eventually refactor these out
  // const startGame = useGameStore((set) => set.startGame);
  // const finishGame = useGameStore((set) => set.finishGame);
  // const resetGame = useGameStore((set) => set.resetGame);

  return (
    <Layout>
      {phase === "landing" && <Landing />}
      {phase === "gameInProgress" && <Playing />}
      {phase === "gameFinished" && <Finished />}
    </Layout>
  );
}

export default App;
