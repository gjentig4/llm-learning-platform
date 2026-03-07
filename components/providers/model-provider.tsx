"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ModelContextType {
  model: string;
  setModel: (model: string) => void;
}

const DEFAULT_MODEL = "deepseek/deepseek-v3.2";

const ModelContext = createContext<ModelContextType>({
  model: DEFAULT_MODEL,
  setModel: () => {},
});

export function ModelProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState(DEFAULT_MODEL);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("flossk-selected-model");
    if (stored) setModelState(stored);
  }, []);

  const setModel = (m: string) => {
    setModelState(m);
    if (m) {
      localStorage.setItem("flossk-selected-model", m);
    }
  };

  if (!mounted) return <>{children}</>;

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
}
