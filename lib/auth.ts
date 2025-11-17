// lib/auth.ts
const KEY = 'auth.token';
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(KEY); } catch { return null; }
}
export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(KEY, token); } catch {}
}
export function clearToken() {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(KEY); } catch {}
}
