"use client";

import { signIn } from "next-auth/react";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ProvidersRow,
  ProviderButton,
} from "./AdminLoginModal.styled";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Admin login</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close login modal">
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <p>Only approved admins can log in to the dashboard.</p>
          <p className="text-xs">
            Use your Google account that has admin access.
          </p>
        </ModalBody>

        <ProvidersRow>
          <ProviderButton
            onClick={() =>
              signIn("google", {
                callbackUrl: "/admin",
              })
            }
          >
            Continue with Google
          </ProviderButton>
        </ProvidersRow>
      </ModalContent>
    </ModalOverlay>
  );
}
