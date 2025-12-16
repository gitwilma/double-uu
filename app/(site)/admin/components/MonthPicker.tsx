import { MonthFilter, MonthLabel, MonthInput } from "../styled";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function MonthPicker({ value, onChange }: Props) {
  return (
    <MonthFilter aria-label="Filter articles by month">
      <MonthLabel htmlFor="month">Month</MonthLabel>
      <MonthInput
        id="month"
        type="month"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </MonthFilter>
  );
}
