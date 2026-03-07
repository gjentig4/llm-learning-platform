"use client";

import { useState } from "react";
import { useApiKey } from "@/components/providers/api-key-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Check, X } from "lucide-react";

export function ApiKeyInput() {
  const { apiKey, setApiKey, hasKey } = useApiKey();
  const [showKey, setShowKey] = useState(false);

  const isValidFormat = !apiKey || apiKey.startsWith("sk-or-");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Key className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground/80">API Key</span>
        {hasKey && <Check className="w-3 h-3 text-green-600" />}
      </div>

      <div className="relative">
        <Input
          type={showKey ? "text" : "password"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-or-v1-..."
          className="bg-card border-border pr-16 font-mono text-xs h-8 text-foreground placeholder:text-muted-foreground"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          {hasKey && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-muted"
              onClick={() => setApiKey("")}
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? (
              <EyeOff className="w-3 h-3 text-muted-foreground" />
            ) : (
              <Eye className="w-3 h-3 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {!isValidFormat && (
        <p className="text-xs text-destructive">Keys should start with &quot;sk-or-&quot;</p>
      )}

      <p className="text-xs text-muted-foreground">
        Get a key at{" "}
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline"
        >
          openrouter.ai/keys
        </a>
      </p>
    </div>
  );
}
