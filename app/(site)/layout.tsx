import type { ReactNode } from "react";
import { HamburgerMenu } from "../components/navigation/HamburgerMenu";
import { AdminShortcut } from "../components/admin/AdminShortcut";
import { SubscribeShortcut } from "../components/subscribe/SubscribeShortcut";


export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col]">
      <HamburgerMenu />
      <AdminShortcut />
      <SubscribeShortcut />
      <main className="flex-1">{children}</main>
    </div>
  );
}
