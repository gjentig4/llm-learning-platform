"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";

export function SystemPromptCompare() {
  const [promptA, setPromptA] = useState(
    "You are a helpful assistant. Be concise and professional. Answer in 1-2 sentences maximum."
  );
  const [promptB, setPromptB] = useState(
    "You are a pirate who loves treasure and the sea. Always respond in pirate speak with nautical metaphors. Be enthusiastic! Keep it to 1-2 sentences."
  );
  const [userMessage, setUserMessage] = useState(
    "What is the capital of Kosovo?"
  );

  const chatA = useChat({ stream: false, model: COMPONENT_MODELS.systemPromptCompare });
  const chatB = useChat({ stream: false, model: COMPONENT_MODELS.systemPromptCompare });

  const isLoading = chatA.isLoading || chatB.isLoading;

  const handleSendBoth = async () => {
    if (!userMessage.trim() || isLoading) return;
    chatA.reset();
    chatB.reset();
    await Promise.all([
      chatA.sendMessage(userMessage, { systemPrompt: promptA }),
      chatB.sendMessage(userMessage, { systemPrompt: promptB }),
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-primary font-medium">
            System Prompt A
          </label>
          <Textarea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            className="bg-card border-border min-h-[80px] text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-orange-700 dark:text-orange-400 font-medium">
            System Prompt B
          </label>
          <Textarea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            className="bg-card border-border min-h-[80px] text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">User Message (same for both)</label>
        <div className="flex gap-2">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="bg-card border-border"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendBoth();
            }}
          />
          <Button
            onClick={handleSendBoth}
            disabled={isLoading}
            className="shrink-0"
          >
            {isLoading ? "Sending..." : "Send Both"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">Response A</h4>
          <ResponseDisplay
            message={chatA.response}
            isLoading={chatA.isLoading}
            error={chatA.error}
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-orange-700 dark:text-orange-400">Response B</h4>
          <ResponseDisplay
            message={chatB.response}
            isLoading={chatB.isLoading}
            error={chatB.error}
          />
        </div>
      </div>
    </div>
  );
}
