"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";
import { AVAILABLE_TOOLS } from "@/lib/tools";
import { Wrench, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";

const SUGGESTIONS = [
  "What's the weather in Prishtina?",
  "What time is it in Tokyo?",
  "What's the weather and time in Brussels?",
];

export function ToolCallingDemo() {
  const [message, setMessage] = useState("");
  const [showTools, setShowTools] = useState(false);

  const { sendMessage, response, isLoading, error } = useChat({
    enableTools: true,
    enableTracing: true,
    stream: false,
    systemPrompt:
      "You are a helpful assistant with access to tools for getting weather and time information. Use the tools when asked about weather or time. Keep your final response to 1-2 sentences.",
  });

  const handleSend = async (msg?: string) => {
    const content = msg || message;
    if (!content.trim() || isLoading) return;
    setMessage(content);
    await sendMessage(content);
  };

  return (
    <div className="space-y-4">
      {/* Available tools display */}
      <div className="rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => setShowTools(!showTools)}
          className="w-full flex items-center gap-2 p-2 hover:bg-muted text-muted-foreground text-sm"
        >
          {showTools ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <Wrench className="w-4 h-4" />
          <span>Available Tools ({AVAILABLE_TOOLS.length})</span>
        </button>
        {showTools && (
          <pre className="p-3 bg-muted text-xs text-muted-foreground overflow-auto max-h-48 border-t border-border">
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

      {/* Trace link */}
      {response?.metadata?.traceUrl && (
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
        <div className="p-3 rounded-lg border border-border bg-muted text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground/70">ReAct Flow:</p>
          <p>1. Your message was sent to the model with tool definitions</p>
          <p>
            2. Model decided to call:{" "}
            {response.metadata.toolCalls.map((t) => t.name).join(", ")}
          </p>
          <p>3. Tools were executed server-side and results sent back</p>
          <p>4. Model generated the final response using tool results</p>
        </div>
      )}
    </div>
  );
}
