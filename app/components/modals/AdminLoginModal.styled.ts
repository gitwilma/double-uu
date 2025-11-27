"use client";

import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 50;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div.attrs({
  role: "dialog",
  "aria-modal": "true",
})`
  background: #111;
  border-radius: 0.75rem;
  padding: 1.75rem 1.5rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  color: #fff;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

export const ProvidersRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProviderButton = styled.button`
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #333;
  background: #fff;
  color: #000;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  transition: background 0.15s ease;

  &:hover {
    background: #f3f3f3;
  }
`;
