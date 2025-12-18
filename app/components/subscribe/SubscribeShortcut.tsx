"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubscribeModal } from "@/app/components/modals/SubscribeModal";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export function SubscribeShortcut() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const email = session?.user?.email ?? null;
  const isAdmin = !!email && email === ADMIN_EMAIL;

  if (pathname === "/admin" || isAdmin) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Subscribe to magazine"
        className="fixed right-4 top-4 z-50 rounded-xl bg-white/70 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white focus-visible:outline-2 focus-visible:outline-black"
      >
        Subscribe
      </button>

      <SubscribeModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
