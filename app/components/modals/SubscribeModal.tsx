"use client";
import { useEffect, useRef, useState } from "react";
import {
  Overlay,
  Dialog,
  Header,
  Title,
  Intro,
  Form,
  Field,
  Label,
  Input,
  Consent,
  Checkbox,
  Actions,
  PrimaryButton,
  SecondaryButton,
  ErrorText,
  SuccessText,
} from "./SubscribeModal.styled";

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

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastActiveElRef.current = document.activeElement as HTMLElement | null;

    requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const canSubmit = email.trim() && consent && !loading;

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

      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.error);

      setSuccessMessage("Tack för att du prenumererar 💌");
      setEmail("");
      setConsent(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Något gick fel.");
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
    requestAnimationFrame(() => lastActiveElRef.current?.focus());
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") handleClose();
  }

  return (
    <Overlay onClick={handleClose}>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Prenumerera på magasinet"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <Header>
          <Title>Prenumerera på magasinet</Title>
          <Intro>Få uppdateringar när nya nummer och artiklar publiceras.</Intro>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>E-postadress</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="din@mailadress.se"
            />
          </Field>

          <Consent>
            <Checkbox
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Ja, jag vill prenumerera på magasinet.</span>
          </Consent>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          {successMessage && <SuccessText>{successMessage}</SuccessText>}

          <Actions>
            <PrimaryButton type="submit" disabled={!canSubmit}>
              {loading ? "Skickar…" : "Prenumerera"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={handleClose}>
              Stäng
            </SecondaryButton>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  );
}
