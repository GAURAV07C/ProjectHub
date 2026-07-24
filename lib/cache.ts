const CACHE_PREFIX = "app_cache_";
const VERSION_KEY = "app_cache_version";

export function getCacheVersion() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(VERSION_KEY);
  } catch {
    return null;
  }
}

export function setCacheVersion(version: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VERSION_KEY, version);
  } catch {
    // ignore
  }
}

export function getCachedData(key: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const version = getCacheVersion();
    if (version && parsed.version && parsed.version !== version) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function setCachedData(key: string, data: unknown) {
  if (typeof window === "undefined") return;
  try {
    const version = getCacheVersion() || generateVersion();
    setCacheVersion(version);
    const payload = {
      version,
      data,
      cachedAt: Date.now(),
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export function invalidateCache() {
  if (typeof window === "undefined") return;
  try {
    const version = generateVersion();
    localStorage.setItem(VERSION_KEY, version);
  } catch {
    // ignore
  }
}

export function clearAllCache() {
  if (typeof window === "undefined") return;
  try {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key === VERSION_KEY || key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // ignore
  }
}

function generateVersion() {
  return `v_${Date.now()}`;
}
