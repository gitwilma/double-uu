"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export function AdminShortcut() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const email = session?.user?.email ?? null;
  const isAdmin = !!email && email === ADMIN_EMAIL;

  if (!isAdmin || pathname === "/admin") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => router.push("/admin")}
      aria-label="Go to admin panel"
    className="fixed right-4 top-4 z-50 rounded-xl bg-white/70 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white focus-visible:outline-2 focus-visible:outline-black"

    >
      Admin
    </button>
  );
}
