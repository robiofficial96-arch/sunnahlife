/**
 * Safe Web Storage Utility
 * Prevents unhandled DOMExceptions / QuotaExceededError in restricted environments
 * (e.g. Safari Private Mode, disabled cookies, corrupt local data, or SSR).
 */

export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return fallback;
      }
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key: string): boolean {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        return false;
      }
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  getSession<T>(key: string, fallback: T): T {
    try {
      if (typeof window === "undefined" || !window.sessionStorage) {
        return fallback;
      }
      const raw = window.sessionStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  setSession<T>(key: string, value: T): boolean {
    try {
      if (typeof window === "undefined" || !window.sessionStorage) {
        return false;
      }
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};
