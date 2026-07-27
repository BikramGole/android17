export function arrayRemove<T>(arr: T[], item: T): T[] {
  const idx = arr.indexOf(item);
  if (idx === -1) return arr;
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export function stripChars(str: string, c: string): string {
  let i = 0, j = str.length - 1;
  while (str[i] === c) i++;
  while (str[j] === c) j--;
  return str.slice(i, j + 1);
}

export function strCsum(str: string): number {
  return [...str].reduce((a, _, i) => a + str.charCodeAt(i), 0);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function quantf(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1e6) return Math.floor(n / 1000) + 'K';
  if (n < 1e9) return Math.floor(n / 1e5) / 10 + 'M';
  return Math.floor(n / 1e8) / 10 + 'B';
}

export function time12(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
}

export function pastdate(date: Date): string {
  const now = new Date();
  if (date.toDateString() === now.toDateString()) return 'Today';
  const yesterday = new Date(now.getTime() - 24 * 3600000);
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function minifyTime(date: Date, t?: number): string {
  if (!t) t = Math.round((Date.now() - date.getTime()) / (60 * 1000));
  if (t < 60) return `${t} min ago`;
  const d = new Date(Date.now() - t * 60 * 1000);
  return pastdate(d) + ', ' + time12(d);
}

export function minifyDate(date: Date, t?: number): string {
  if (!t) t = Math.round((Date.now() - date.getTime()) / (60 * 1000));
  if (t < 60) return `${t} min ago`;
  if (t < 1440) return `${Math.floor(t / 60)} hours ago`;
  if (t < 43200) return `${Math.floor(t / 1440)} days ago`;
  if (t < 525600) return `${Math.floor(t / 43200)} months ago`;
  return `${Math.floor(t / 525600)} years ago`;
}

export function pastdatetime(date: Date): string {
  const now = new Date();
  let timestr = '';
  if (date.toDateString() === now.toDateString()) timestr = 'Today';
  else {
    const yesterday = new Date(now.getTime() - 24 * 36 * 1e5);
    if (date.toDateString() === yesterday.toDateString()) timestr = 'Yesterday';
    else if (date.getFullYear() === now.getFullYear()) {
      timestr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      timestr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: '2-digit' });
    }
  }
  return timestr + ', ' + time12(date);
}
