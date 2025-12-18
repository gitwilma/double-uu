"use client";

import styled from "styled-components";
import { spacing } from "@/lib/styles/spacing";
import { typography } from "@/lib/styles/typography";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 420px;
  padding: ${spacing.lg};
  border-radius: 24px;

  background:
    radial-gradient(70% 70% at 50% 50%, #fff950 0%, transparent 60%),
    radial-gradient(60% 50% at 40% 20%, #efefef 0%, transparent 60%),
    radial-gradient(45% 45% at 25% 75%, #efefef 0%, transparent 65%),
    #efefef;

  box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.4);
`;

export const Header = styled.header`
  margin-bottom: ${spacing.md};
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${typography.title.family};
  font-weight: ${typography.title.weight};
  font-size: 24px;
  letter-spacing: ${typography.title.tracking};
  color: #111;
`;

export const Intro = styled.p`
  margin-top: ${spacing.xs};
  font-family: ${typography.body.family};
  font-size: 14px;
  color: rgba(0, 0, 0, 0.75);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: ${typography.body.family};
  color: rgba(0, 0, 0, 0.65);
`;

export const Input = styled.input`
  font-family: ${typography.body.family};
  font-size: 14px;

  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.6);

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

export const Consent = styled.label`
  display: flex;
  gap: 8px;
  align-items: flex-start;

  font-family: ${typography.body.family};
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

export const Checkbox = styled.input`
  margin-top: 2px;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.sm};
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;

  font-family: ${typography.body.family};
  font-weight: 600;

  background: #111;
  color: #fff;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: 10px 14px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.35);
  font-family: ${typography.body.family};
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #b00020;
`;

export const SuccessText = styled.p`
  font-size: 12px;
  color: #067d68;
`;
