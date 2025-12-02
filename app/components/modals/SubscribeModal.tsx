"use client";

import { useState } from "react";

type SubscribeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const canSubmit = email.trim().length > 0 && consent && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });

      const data = (await res.json().catch(() => null)) as
        | { error?: string; success?: boolean }
        | null;

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Något gick fel");
      }

      setSuccessMessage("Tack för att du prenumererar 💌");
      setEmail("");
      setConsent(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Kunde inte skicka din prenumeration.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setEmail("");
    setConsent(false);
    setSuccessMessage(null);
    setErrorMessage(null);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-[#23062E] p-6 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4">
          <h2 className="text-xl font-semibold">Prenumerera på magasinet</h2>
          <p className="mt-1 text-sm text-neutral-200">
            Få uppdateringar när nya nummer och artiklar publiceras.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-300">
              E-postadress
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none placeholder:text-neutral-400 focus:border-white/60"
              placeholder="din@mailadress.se"
              required
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-neutral-200">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border border-white/40 bg-transparent"
            />
            <span>Ja, jag vill prenumerera på magasinet.</span>
          </label>

          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-xs text-emerald-400">{successMessage}</p>
          )}

          <div className="mt-2 flex gap-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Skickar…" : "Prenumerera"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-white/30 px-4 py-2 text-sm"
            >
              Stäng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
