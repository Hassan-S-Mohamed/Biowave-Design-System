const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

export function avatarGraphemes(value: string): string[] {
  return Array.from(graphemeSegmenter.segment(value), ({ segment }) => segment);
}

/** Derive the accessible Avatar fallback initials from a person's name. */
export function avatarInitials(name?: string): string {
  const words = name?.trim().split(/\s+/u).filter(Boolean) ?? [];
  if (words.length === 0) return '';

  const first = avatarGraphemes(words[0])[0] ?? '';
  if (/\p{Script=Arabic}/u.test(first)) return first;

  const last = words.length > 1 ? (avatarGraphemes(words.at(-1) ?? '')[0] ?? '') : '';
  return `${first}${last}`.toLocaleUpperCase();
}
