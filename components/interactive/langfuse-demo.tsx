"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Send, ExternalLink, Clock } from "lucide-react";

export function LangfuseDemo() {
  const [message, setMessage] = useState("Explain what a trace is in observability. Answer in 1-2 sentences.");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showTrace, setShowTrace] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { sendMessage, response, streamingContent, isLoading, error } =
    useChat({
      enableTracing: true,
      stream: false,
      model: COMPONENT_MODELS.langfuseDemo,
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

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    setShowTrace(false);
    setCountdown(null);
    if (countdownRef.current) clearInterval(countdownRef.current);
    await sendMessage(message, { enableTracing: true });
    // Mark Langfuse as introduced
    if (typeof window !== "undefined") {
      localStorage.setItem("langfuse-introduced", "true");
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 text-sm text-amber-800 dark:text-amber-300">
        Tracing is enabled for this demo. After sending a message, you&apos;ll get a public link to view the full trace in Langfuse — no account needed.
      </div>

      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="bg-card border-border min-h-[60px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <ResponseDisplay
        message={response}
        streamingContent={streamingContent}
        isLoading={isLoading}
        error={error}
      />

      {response?.metadata?.traceUrl && countdown !== null && !showTrace && (
        <div className="p-4 rounded-lg border border-border bg-card flex items-center gap-3">
          <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Trace incoming in <span className="font-mono font-semibold text-primary">{countdown}</span>...
          </span>
        </div>
      )}

      {response?.metadata?.traceUrl && showTrace && (
        <div className="p-4 rounded-lg border border-border bg-card">
          <a
            href={response.metadata.traceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View this trace in Langfuse
          </a>
          <p className="text-xs text-muted-foreground mt-1">
            See the full request/response, tokens, cost, and latency in the Langfuse dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
