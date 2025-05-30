import { CacheEntry } from "./types";

class CacheClient {
  private cache: Record<string, CacheEntry<any>> = {};

  get<T>(key: string): T | null {
    const entry = this.cache[key];
    if (!entry) return null;

    const now = Date.now();
    if (entry.expiresAt < now) {
      delete this.cache[key];
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, ttlMs = 1000 * 60 * 5) {
    const expiresAt = Date.now() + ttlMs;
    this.cache[key] = { data, expiresAt };
  }

  clear(key: string) {
    delete this.cache[key];
  }

  clearAll() {
    this.cache = {};
  }
}

export const cacheClient = new CacheClient();
