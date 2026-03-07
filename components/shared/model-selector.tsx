"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ChevronUp } from "lucide-react";

const SUGGESTED_MODELS = [
  { id: "deepseek/deepseek-v3.2", label: "DeepSeek V3.2" },
  { id: "google/gemini-3.1-flash-lite-preview", label: "Gemini 3.1 Flash Lite" },
  { id: "qwen/qwen3.5-35b-a3b", label: "Qwen 3.5 35B" },
];

export function ModelSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (model: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="e.g. google/gemini-3.1-flash-lite-preview"
          className="bg-card border-border pr-8 font-mono text-sm"
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
      {open && (
        <div className="absolute z-50 bottom-full mb-1 w-full rounded-md border border-border bg-card shadow-md">
          {SUGGESTED_MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                onChange(m.id);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center justify-between"
            >
              <span className="text-foreground/80">{m.label}</span>
              <span className="text-xs text-muted-foreground font-mono">{m.id}</span>
            </button>
          ))}
          <div className="px-3 py-1.5 text-xs text-muted-foreground border-t border-border">
            Or paste any model ID from openrouter.ai/models
          </div>
        </div>
      )}
    </div>
  );
}

