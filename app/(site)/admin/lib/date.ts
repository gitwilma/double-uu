export function monthValue(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function isSameMonth(iso: string | undefined, ym: string) {
  if (!iso) return false;
  return iso.slice(0, 7) === ym;
}
