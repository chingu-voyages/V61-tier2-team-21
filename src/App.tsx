// core
import { useGameStore } from "@/store/gameStore";
import Layout from "./components/Layout/index";
import Landing from "./pages/Landing";
import Playing from "./pages/Playing";
import Finished from "./pages/Finished";

function App() {
  const phase = useGameStore((s) => s.phase); // eventually refactor these out

  return (
    <Layout>
      {phase === "landing" && <Landing />}
      {phase === "gameInProgress" && <Playing />}
      {phase === "gameFinished" && <Finished />}
    </Layout>
  );
}

export default App;
