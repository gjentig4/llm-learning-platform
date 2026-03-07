"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "flossk-visited-pages";

export function useProgress() {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setVisitedPages(new Set(JSON.parse(stored)));
      }
    } catch {}
  }, []);

  const markVisited = useCallback((path: string) => {
    setVisitedPages((prev) => {
      const next = new Set(prev);
      next.add(path);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isVisited = useCallback(
    (path: string) => mounted && visitedPages.has(path),
    [visitedPages, mounted]
  );

  return { visitedPages, markVisited, isVisited };
}
