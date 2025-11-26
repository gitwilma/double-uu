import type { ReactNode } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#23062E]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
