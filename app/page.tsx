import { Hero } from "./components/home/Hero";
import { Footer } from "./components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F5EDF8]">
      <main className="relative flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
