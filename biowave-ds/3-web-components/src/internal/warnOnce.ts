declare const process: { env: { NODE_ENV?: string } };

const warned = new Set<string>();

/** Emit a development-only warning once for each stable key. */
export function warnOnce(key: string, message: string): void {
  if (process.env.NODE_ENV === 'production' || warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}
