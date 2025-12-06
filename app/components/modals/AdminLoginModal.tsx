"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AdminLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/admin",
      });

      if (!res || !res.ok) {
        setErrorMessage("Fel e-post eller lösenord.");
        return;
      }

      onClose();
      router.push("/admin");
    } catch {
      setErrorMessage("Något gick fel. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setEmail("");
    setPassword("");
    setErrorMessage(null);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-[#23062E] p-6 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4">
          <h2 className="text-lg font-semibold">Admin login</h2>
          <p className="mt-1 text-xs text-neutral-200">
            Endast administratören av magasinet kan logga in här.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-300">
              E-post
            </label>
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-white/60"
              placeholder="admin@mail.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-300">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-white/60"
              placeholder="••••••••"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}

          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loggar in…" : "Logga in"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-white/40 px-4 py-2 text-sm"
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
