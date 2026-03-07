"use client";

import { useState, useEffect, useCallback } from "react";
import { useApiKey } from "@/components/providers/api-key-provider";
import { Wallet, RefreshCw } from "lucide-react";

export function BalanceDisplay() {
  const { apiKey, hasKey } = useApiKey();
  const [limit, setLimit] = useState<number | null>(null);
  const [usage, setUsage] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchKeyInfo = useCallback(async () => {
    if (!apiKey) {
      setLimit(null);
      setUsage(null);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/credits", {
        headers: { "x-api-key": apiKey },
      });

      if (!res.ok) {
        setError(true);
        setLimit(null);
        setUsage(null);
        return;
      }

      const data = await res.json();
      setLimit(data.data?.limit ?? null);
      setUsage(data.data?.usage ?? 0);
    } catch {
      setError(true);
      setLimit(null);
      setUsage(null);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    if (hasKey) {
      fetchKeyInfo();
    } else {
      setLimit(null);
      setUsage(null);
      setError(false);
    }
  }, [hasKey, fetchKeyInfo]);

  // Refresh after every LLM request
  useEffect(() => {
    const handler = () => fetchKeyInfo();
    window.addEventListener("balance-refresh", handler);
    return () => window.removeEventListener("balance-refresh", handler);
  }, [fetchKeyInfo]);

  if (!hasKey) return null;

  const remaining = limit !== null && usage !== null ? limit - usage : null;
  const percentage = limit !== null && limit > 0 && usage !== null
    ? Math.max(0, Math.min(100, ((limit - usage) / limit) * 100))
    : null;

  return (
    <div className="px-2 py-1.5 space-y-1.5">
      <div className="flex items-center gap-2">
        <Wallet className="w-3.5 h-3.5 text-[--sidebar-foreground]/50" />
        <span className="text-xs text-[--sidebar-foreground]/60">
          {loading ? (
            "Loading..."
          ) : error ? (
            "Could not fetch balance"
          ) : remaining !== null ? (
            <>
              <span className="font-mono font-medium text-[--sidebar-foreground]/80">
                ${remaining.toFixed(4)}
              </span>
              {" / "}
              <span className="font-mono text-[--sidebar-foreground]/50">
                ${limit!.toFixed(2)}
              </span>
            </>
          ) : usage !== null ? (
            <>
              Used{" "}
              <span className="font-mono font-medium text-[--sidebar-foreground]/80">
                ${usage.toFixed(4)}
              </span>
              {" "}(no limit)
            </>
          ) : null}
        </span>
        {!loading && hasKey && (
          <button
            onClick={fetchKeyInfo}
            className="ml-auto text-[--sidebar-foreground]/40 hover:text-[--sidebar-foreground]/70 transition-colors"
            title="Refresh balance"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>
      {percentage !== null && !loading && !error && (
        <div className="h-1.5 rounded-full bg-[--sidebar-foreground]/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor:
                percentage > 50
                  ? "var(--color-green-500, #22c55e)"
                  : percentage > 20
                    ? "var(--color-yellow-500, #eab308)"
                    : "var(--color-red-500, #ef4444)",
            }}
          />
        </div>
      )}
    </div>
  );
}
