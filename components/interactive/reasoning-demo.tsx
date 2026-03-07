"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Brain } from "lucide-react";

const SUGGESTIONS = [
  "Alice is looking at Bob. Bob is looking at Charlie. Alice is married, Charlie is not. Is a married person looking at an unmarried person?",
  "You have two ropes. Each takes exactly 1 hour to burn, but they burn at non-uniform rates. How can you measure exactly 45 minutes?",
  "A census taker asks a resident about her children. She says: the product of their ages is 36, and the sum equals my house number. The census taker says he needs more info. She replies: the oldest plays piano. What are the ages?",
];

const EFFORT_LEVELS = ["low", "medium", "high"] as const;

export function ReasoningDemo() {
  const [message, setMessage] = useState("");
  const [effort, setEffort] = useState<"low" | "medium" | "high">("medium");
  const [compareMode, setCompareMode] = useState(false);

  const withReasoning = useChat({
    enableReasoning: true,
    reasoningEffort: effort,
    stream: true,
    model: COMPONENT_MODELS.reasoningDemo,
  });

  const withoutReasoning = useChat({
    stream: true,
    model: COMPONENT_MODELS.reasoningDemo,
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

  return (
    <div className="space-y-4">
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
