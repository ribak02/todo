export function getTodayKey(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDisplayDate(dayKey: string): string {
  const [yyyy, mm, dd] = dayKey.split('-').map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatSidebarDate(dayKey: string): string {
  const [yyyy, mm, dd] = dayKey.split('-').map(Number);
  const date = new Date(yyyy, mm - 1, dd);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
