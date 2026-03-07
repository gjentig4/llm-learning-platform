"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  hasKey: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: "",
  setApiKey: () => {},
  hasKey: false,
});

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("openrouter-api-key");
    if (stored) setApiKeyState(stored);
  }, []);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    if (key) {
      localStorage.setItem("openrouter-api-key", key);
    } else {
      localStorage.removeItem("openrouter-api-key");
    }
  };

  if (!mounted) return <>{children}</>;

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, hasKey: apiKey.length > 0 }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
}
