"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponseDisplay } from "@/components/shared/response-display";
import { supportsReasoning } from "@/lib/reasoning";
import { useModel } from "@/components/providers/model-provider";
import { Brain, AlertTriangle } from "lucide-react";

const SUGGESTIONS = [
  "How many r's are in the word 'strawberry'?",
  "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
  "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
];

const EFFORT_LEVELS = ["low", "medium", "high"] as const;

export function ReasoningDemo() {
  const { model } = useModel();
  const [message, setMessage] = useState("");
  const [effort, setEffort] = useState<"low" | "medium" | "high">("medium");
  const [compareMode, setCompareMode] = useState(false);

  const withReasoning = useChat({
    enableReasoning: true,
    reasoningEffort: effort,
    stream: true,
  });

  const withoutReasoning = useChat({
    stream: true,
  });

  const isLoading = withReasoning.isLoading || withoutReasoning.isLoading;

  const handleSend = async (msg?: string) => {
    const content = msg || message;
    if (!content.trim() || isLoading) return;
    setMessage(content);
    withReasoning.reset();
    withoutReasoning.reset();

    if (compareMode) {
      await Promise.all([
        withReasoning.sendMessage(content),
        withoutReasoning.sendMessage(content),
      ]);
    } else {
      await withReasoning.sendMessage(content);
    }
  };

  const modelSupported = supportsReasoning(model);

  return (
    <div className="space-y-4">
      {/* Model support note */}
      {!modelSupported && (
        <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>{model}</strong> may not support reasoning. Try{" "}
            <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">deepseek/deepseek-r1</code> (shows full thinking),{" "}
            <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">anthropic/claude-haiku-4.5</code> (summarized thinking), or{" "}
            <code className="text-xs bg-amber-100 dark:bg-amber-900/50 px-1 rounded">google/gemini-2.5-flash-thinking</code>.
            Note: OpenAI o-series models reason internally but don&apos;t expose their thinking.
          </div>
        </div>
      )}

      {/* Effort selector */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Reasoning Effort
        </label>
        <div className="flex gap-2">
          {EFFORT_LEVELS.map((level) => (
            <Button
              key={level}
              variant={effort === level ? "default" : "outline"}
              size="sm"
              onClick={() => setEffort(level)}
              className="capitalize"
            >
              {level}
            </Button>
          ))}
          <div className="ml-auto">
            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => setCompareMode(!compareMode)}
            >
              {compareMode ? "Compare: ON" : "Compare: OFF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
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
            {s.length > 50 ? s.slice(0, 50) + "..." : s}
          </Button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a tricky question..."
          className="bg-card border-border min-h-[60px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          onClick={() => handleSend()}
          disabled={isLoading || !message.trim()}
          className="shrink-0"
        >
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </div>

      {/* Results */}
      {compareMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary">
              With Reasoning
            </h4>
            <ResponseDisplay
              message={withReasoning.response}
              streamingContent={withReasoning.streamingContent}
              streamingReasoning={withReasoning.streamingReasoning}
              isLoading={withReasoning.isLoading}
              error={withReasoning.error}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground/70">
              Without Reasoning
            </h4>
            <ResponseDisplay
              message={withoutReasoning.response}
              streamingContent={withoutReasoning.streamingContent}
              isLoading={withoutReasoning.isLoading}
              error={withoutReasoning.error}
            />
          </div>
        </div>
      ) : (
        <ResponseDisplay
          message={withReasoning.response}
          streamingContent={withReasoning.streamingContent}
          streamingReasoning={withReasoning.streamingReasoning}
          isLoading={withReasoning.isLoading}
          error={withReasoning.error}
        />
      )}
    </div>
  );
}
