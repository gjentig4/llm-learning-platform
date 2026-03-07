"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Zap, Clock } from "lucide-react";

export function EndpointCompare() {
  const [message, setMessage] = useState(
    "Describe what an API is in 3-4 sentences."
  );

  const streamingChat = useChat({ stream: true, model: COMPONENT_MODELS.endpointCompare });
  const nonStreamingChat = useChat({ stream: false, model: COMPONENT_MODELS.endpointCompare });

  const isLoading = streamingChat.isLoading || nonStreamingChat.isLoading;

  const handleSendBoth = async () => {
    if (!message.trim() || isLoading) return;
    streamingChat.reset();
    nonStreamingChat.reset();
    await Promise.all([
      streamingChat.sendMessage(message),
      nonStreamingChat.sendMessage(message),
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Prompt (same for both)
        </label>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium text-primary">
              Streaming ({"\u{007B}"}stream: true{"\u{007D}"})
            </h4>
          </div>
          <ResponseDisplay
            message={streamingChat.response}
            streamingContent={streamingChat.streamingContent}
            isLoading={streamingChat.isLoading}
            error={streamingChat.error}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground/70">
              Non-streaming ({"\u{007B}"}stream: false{"\u{007D}"})
            </h4>
          </div>
          <ResponseDisplay
            message={nonStreamingChat.response}
            isLoading={nonStreamingChat.isLoading}
            error={nonStreamingChat.error}
          />
        </div>
      </div>
    </div>
  );
}
