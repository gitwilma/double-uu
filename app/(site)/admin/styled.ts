"use client";
import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  padding: 96px 16px 64px;
  width: min(980px, 100%);
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.92);

  @media (max-width: 420px) {
    padding: 84px 12px 56px;
  }
`;

export const TopBar = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  margin-top: 40px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const ErrorText = styled.p`
  margin: 10px 0 18px;
  font-size: 14px;
  color: #b91c1c;
`;

export const BackButton = styled.button`
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  color: rgba(0, 0, 0, 0.92);

  border-radius: 16px;
  padding: 12px 14px;
  font-weight: 750;
  letter-spacing: 0.02em;
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.7);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
  }
`;

export const FormCard = styled.section`
  background: rgba(248, 248, 245, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  border-radius: 22px;
  padding: 18px;

  box-shadow: 0 30px 40px -24px rgba(0, 0, 0, 0.35);

  @media (max-width: 420px) {
    padding: 14px;
    border-radius: 18px;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 14px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.78);
`;

const baseControl = `
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.14);
  background: rgba(255, 255, 255, 0.7);
  color: rgba(0,0,0,0.92);
  padding: 12px 12px;
  font-size: 14px;

  transition: border-color 140ms ease, background 140ms ease;

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
  }

  &::placeholder {
    color: rgba(0,0,0,0.45);
  }
`;

export const Input = styled.input`
  ${baseControl}
`;

export const Textarea = styled.textarea`
  ${baseControl}
  resize: vertical;
  min-height: 92px;
  line-height: 1.45;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 8px 0;
`;

export const SectionFieldset = styled.fieldset`
  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 18px;
  padding: 14px;
  margin: 0;

  display: grid;
  gap: 12px;

  @media (max-width: 420px) {
    padding: 12px;
    border-radius: 16px;
  }
`;

export const SectionLegend = styled.legend`
  padding: 0 8px;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.75);
`;

export const SectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const LinkButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 6px 2px;
  cursor: pointer;

  font-size: 13px;
  font-weight: 750;
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.78);

  &:hover {
    color: rgba(0, 0, 0, 0.92);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
    border-radius: 10px;
  }
`;

export const PrimaryButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.14);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(10px);

  border-radius: 18px;
  padding: 14px 16px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.9);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
  }
`;

export const SecondaryButton = styled.button`
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);

  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 850;
  letter-spacing: 0.03em;
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.75);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
  }
`;

export const DangerButton = styled.button`
  appearance: none;
  border: 1px solid rgba(185, 28, 28, 0.25);
  background: rgba(185, 28, 28, 0.10);
  color: rgba(185, 28, 28, 0.95);

  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 900;
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(185, 28, 28, 0.16);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.75);
    outline-offset: 3px;
  }
`;

export const MonthFilter = styled.section`
  margin-top: 22px;
  display: grid;
  gap: 8px;
  max-width: 320px;
`;

export const MonthLabel = styled.label`
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.75);
`;

export const MonthInput = styled.input`
  ${baseControl}
  padding: 10px 12px;
`;

export const ListTitle = styled.h2`
  margin: 18px 0 10px;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.78);
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  gap: 10px;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;

  padding: 12px;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.40);
  border: 1px solid rgba(255, 255, 255, 0.40);
  backdrop-filter: blur(10px);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 10px;
    align-items: stretch;
  }
`;

export const ItemMain = styled.div`
  min-width: 0;
`;

export const ItemTitle = styled.p`
  margin: 0;
  font-weight: 850;
  color: rgba(0, 0, 0, 0.92);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemMeta = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: rgba(0,  0, 0, 0.62);
`;

export const EmptyState = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.70);
`;
