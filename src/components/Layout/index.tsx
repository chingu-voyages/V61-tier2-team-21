import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-light-100">
      <Header />
      <main className="flex flex-1 items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}
