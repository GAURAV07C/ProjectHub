"use client";

import { useEffect, useRef, useState } from "react";
import { clearAllCache, getCachedData, setCachedData } from "@/lib/cache";

interface CacheFetchOptions<T> {
  key: string;
  fetchFn: () => Promise<T>;
  enabled?: boolean;
}

export function useCachedFetch<T>({
  key,
  fetchFn,
  enabled = true,
}: CacheFetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const cached = getCachedData(key);
    if (cached !== null) {
      setData(cached as T);
      setLoading(false);
      setError(null);
    }

    let cancelled = false;

    fetchFnRef.current()
      .then((fresh) => {
        if (!cancelled && mountedRef.current) {
          setCachedData(key, fresh);
          setData(fresh);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled && mountedRef.current) {
          if (cached === null) {
            setError(err instanceof Error ? err.message : "Failed to fetch");
            setLoading(false);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [key, enabled]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchFnRef.current()
      .then((fresh) => {
        setCachedData(key, fresh);
        setData(fresh);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export function useInvalidateCache() {
  return () => {
    clearAllCache();
  };
}
