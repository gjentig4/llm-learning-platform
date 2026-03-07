"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";
import { AVAILABLE_TOOLS } from "@/lib/tools";
import { Wrench, ExternalLink, ChevronDown, ChevronRight, Clock } from "lucide-react";

const SUGGESTIONS = [
  "What's the weather in Prishtina?",
  "What time is it in Tokyo?",
  "What's the weather and time in Brussels?",
];

export function ToolCallingDemo() {
  const [message, setMessage] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showTrace, setShowTrace] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { sendMessage, response, isLoading, error } = useChat({
    enableTools: true,
    enableTracing: true,
    stream: false,
    model: COMPONENT_MODELS.toolCallingDemo,
    systemPrompt:
      "You are a helpful assistant with access to tools for getting weather and time information. Use the tools when asked about weather or time. Keep your final response to 1-2 sentences.",
  });

  // Start countdown when we get a response with a trace URL
  useEffect(() => {
    if (response?.metadata?.traceUrl && !showTrace) {
      setCountdown(5);
      setShowTrace(false);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            setShowTrace(true);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [response?.metadata?.traceUrl]);

  const handleSend = async (msg?: string) => {
    const content = msg || message;
    if (!content.trim() || isLoading) return;
    setMessage(content);
    setShowTrace(false);
    setCountdown(null);
    if (countdownRef.current) clearInterval(countdownRef.current);
    await sendMessage(content);
  };

  return (
    <div className="space-y-4">
      {/* Available tools display */}
      <div className="rounded-lg border-2 border-primary/20 overflow-hidden bg-primary/[0.02] dark:bg-primary/[0.04]">
        <button
          onClick={() => setShowTools(!showTools)}
          className="w-full flex items-center gap-2 p-3 hover:bg-primary/5 text-sm"
        >
          {showTools ? <ChevronDown className="w-3 h-3 text-primary" /> : <ChevronRight className="w-3 h-3 text-primary" />}
          <Wrench className="w-4 h-4 text-primary" />
          <span className="font-medium text-primary">Available Tools ({AVAILABLE_TOOLS.length})</span>
        </button>
        {showTools && (
          <pre className="p-3 bg-muted/50 text-xs text-muted-foreground overflow-auto max-h-48 border-t border-primary/20">
            {JSON.stringify(
              AVAILABLE_TOOLS.map((t) => ({
                name: t.function.name,
                description: t.function.description,
                parameters: t.function.parameters,
              })),
              null,
              2
            )}
          </pre>
        )}
      </div>

      {/* Suggestion buttons */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <Button
            key={s}
            variant="outline"
            size="sm"
            onClick={() => handleSend(s)}
            disabled={isLoading}
            className="text-xs"
          >
            {s}
          </Button>
        ))}
      </div>

      {/* Message input */}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about weather or time..."
          className="bg-card border-border"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button
          onClick={() => handleSend()}
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "Running..." : "Send"}
        </Button>
      </div>

      {/* Response with tool calls */}
      <ResponseDisplay
        message={response}
        isLoading={isLoading}
        error={error}
      />

      {/* Trace countdown */}
      {response?.metadata?.traceUrl && countdown !== null && !showTrace && (
        <div className="p-3 rounded-lg border border-border bg-card flex items-center gap-3">
          <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Trace incoming in <span className="font-mono font-semibold text-primary">{countdown}</span>...
          </span>
        </div>
      )}

      {/* Trace link */}
      {response?.metadata?.traceUrl && showTrace && (
        <div className="p-3 rounded-lg border border-border bg-card">
          <a
            href={response.metadata.traceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View full trace in Langfuse
          </a>
          <p className="text-xs text-muted-foreground mt-1">
            See the full ReAct loop: tool calls, arguments, results, and final response.
          </p>
        </div>
      )}

      {/* Explain the flow */}
      {response?.metadata?.toolCalls && response.metadata.toolCalls.length > 0 && (
        <div className="p-3 rounded-lg border-2 border-primary/20 bg-primary/[0.02] dark:bg-primary/[0.04] text-xs space-y-1">
          <p className="font-medium text-primary">ReAct Flow:</p>
          <p className="text-muted-foreground">1. Your message was sent to the model with tool definitions</p>
          <p className="text-muted-foreground">
            2. Model decided to call:{" "}
            <span className="font-mono font-semibold text-primary">
              {response.metadata.toolCalls.map((t) => t.name).join(", ")}
            </span>
          </p>
          <p className="text-muted-foreground">3. Tools were executed server-side and results sent back</p>
          <p className="text-muted-foreground">4. Model generated the final response using tool results</p>
        </div>
      )}
    </div>
  );
}
