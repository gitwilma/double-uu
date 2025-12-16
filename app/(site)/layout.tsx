import type { ReactNode } from "react";
import { HamburgerMenu } from "../components/navigation/HamburgerMenu";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col]">
      <HamburgerMenu />
      <main className="flex-1">{children}</main>
    </div>
  );
}
