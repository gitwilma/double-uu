"use client";

import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  Actions,
  PrimaryButton,
  SecondaryButton,
  ErrorText,
} from "./AdminLoginModal.styled";

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
    requestAnimationFrame(() => lastActiveElRef.current?.focus());
  }

  function onDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      handleClose();
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Admin login"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onDialogKeyDown}
      >
        <Header>
          <Title>Admin login</Title>
          <Intro>Endast administratören av magasinet kan logga in här.</Intro>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>E-post</Label>
            <Input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mail.com"
              required
            />
          </Field>

          <Field>
            <Label>Lösenord</Label>
            <Input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

          <Actions>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Loggar in…" : "Logga in"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={handleClose}>
              Avbryt
            </SecondaryButton>
          </Actions>
        </Form>
      </Dialog>
    </Overlay>
  );
}
