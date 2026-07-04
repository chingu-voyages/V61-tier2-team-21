// core
import { useGameStore } from '@/store/gameStore';
import Layout from './components/Layout/index';
import Landing from './pages/Landing';
import Playing from './pages/Playing';
import Finished from './pages/Finished';
import { Toaster } from './components/ui/toast';
import { useViewportHeight } from './hooks/useViewportHeight';

function App() {
    const phase = useGameStore((s) => s.phase); // eventually refactor these out
    const viewportHeight = useViewportHeight();
    const bottomOffset = viewportHeight * 0.4;

    return (
        <Layout>
            {phase === 'landing' && <Landing />}
            {phase === 'gameInProgress' && <Playing />}
            {phase === 'gameFinished' && <Finished />}
            <Toaster
                position="bottom-center"
                offset={{ bottom: bottomOffset }}
                mobileOffset={{ bottom: bottomOffset }}
            />
        </Layout>
    );
}

export default App;
