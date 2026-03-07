"use client";

import { useState, useMemo } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Message } from "@/types";
import { HardDrive } from "lucide-react";
import { generateCachingPrompt } from "@/lib/caching-prompt";

export function CachingCompare() {
  const systemPrompt = useMemo(() => generateCachingPrompt(), []);
  const charCount = systemPrompt.length;
  const approxTokens = 17209;

  const [userMessage, setUserMessage] = useState(
    "Output the following in verbatim: 'FLOSSK'"
  );
  const [firstResult, setFirstResult] = useState<Message | null>(null);
  const [secondResult, setSecondResult] = useState<Message | null>(null);

  const chatFirst = useChat({
    systemPrompt,
    stream: false,
    model: COMPONENT_MODELS.cachingCompare,
  });

  const chatSecond = useChat({
    systemPrompt,
    stream: false,
    model: COMPONENT_MODELS.cachingCompare,
  });

  const handleFirst = async () => {
    if (!userMessage.trim()) return;
    setFirstResult(null);
    setSecondResult(null);
    const result = await chatFirst.sendMessage(userMessage);
    if (result) setFirstResult(result);
  };

  const handleSecond = async () => {
    if (!userMessage.trim()) return;
    setSecondResult(null);
    const result = await chatSecond.sendMessage(userMessage);
    if (result) setSecondResult(result);
  };

  const firstCost = firstResult?.metadata?.cost ?? 0;
  const secondCost = secondResult?.metadata?.cost ?? 0;
  const savings =
    firstCost > 0 && secondCost > 0 && secondCost < firstCost
      ? ((1 - secondCost / firstCost) * 100).toFixed(0)
      : null;

  const firstCached = firstResult?.metadata?.cachedTokens ?? 0;
  const secondCached = secondResult?.metadata?.cachedTokens ?? 0;

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg border border-border bg-muted">
        <div className="flex items-center gap-2 mb-1">
          <HardDrive className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground/70">
            System Prompt
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {charCount.toLocaleString()} chars · ~{approxTokens.toLocaleString()} tokens
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          A {approxTokens.toLocaleString()}-token knowledge base about FLOSSK, Kosovo tech, open source history, and more. Same prompt sent both times — the second request should hit the cache.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">User Message</label>
        <Input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="bg-card border-border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Button
            onClick={handleFirst}
            disabled={chatFirst.isLoading}
            className="w-full"
            variant="outline"
          >
            {chatFirst.isLoading
              ? "Sending..."
              : "1. Send First (Cache Write)"}
          </Button>
          <ResponseDisplay
            message={firstResult}
            isLoading={chatFirst.isLoading}
            error={chatFirst.error}
            showDebug={false}
          />
          {firstResult && (
            <div className="p-3 rounded-lg bg-muted border border-border text-xs space-y-1">
              <div className="text-muted-foreground">
                Input tokens: <span className="text-foreground/80">{firstResult.metadata?.tokensIn?.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                Cached tokens: <span className="text-foreground/80">{firstCached.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                Cost: <span className="text-emerald-600 dark:text-emerald-400">${firstCost.toFixed(6)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleSecond}
            disabled={chatSecond.isLoading || !firstResult}
            className="w-full"
          >
            {chatSecond.isLoading
              ? "Sending..."
              : "2. Send Again (Cache Read)"}
          </Button>
          <ResponseDisplay
            message={secondResult}
            isLoading={chatSecond.isLoading}
            error={chatSecond.error}
            showDebug={false}
          />
          {secondResult && (
            <div className="p-3 rounded-lg bg-muted border border-border text-xs space-y-1">
              <div className="text-muted-foreground">
                Input tokens: <span className="text-foreground/80">{secondResult.metadata?.tokensIn?.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                Cached tokens:{" "}
                <span className={secondCached > 0 ? "text-green-600 dark:text-green-400" : "text-foreground/80"}>
                  {secondCached.toLocaleString()}
                  {secondCached > 0 && " (cache hit!)"}
                </span>
              </div>
              <div className="text-muted-foreground">
                Cost: <span className="text-emerald-600 dark:text-emerald-400">${secondCost.toFixed(6)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {savings && (
        <div className="p-4 rounded-lg border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-950/30 text-center">
          <p className="text-green-700 dark:text-green-400 font-semibold text-lg">
            {savings}% cost savings
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            from prompt caching on the second request
          </p>
        </div>
      )}

      {firstResult && secondResult && !savings && (
        <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 text-sm text-amber-800 dark:text-amber-300">
          Caching depends on the model and provider. Gemini uses implicit caching (automatic, no setup needed). Some free models may not show caching benefits — try a paid model for clearer results.
        </div>
      )}
    </div>
  );
}
