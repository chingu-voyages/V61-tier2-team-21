import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
