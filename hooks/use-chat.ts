"use client";

import { useState, useCallback } from "react";
import { useApiKey } from "@/components/providers/api-key-provider";
import { useModel } from "@/components/providers/model-provider";
import { Message } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface UseChatOptions {
  model?: string;
  temperature?: number;
  systemPrompt?: string;
  enableTools?: boolean;
  enableTracing?: boolean;
  stream?: boolean;
  enableReasoning?: boolean;
  reasoningEffort?: "low" | "medium" | "high";
}

interface UseChatReturn {
  sendMessage: (content: string, overrides?: Partial<UseChatOptions>) => Promise<Message | null>;
  response: Message | null;
  streamingContent: string;
  streamingReasoning: string;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { apiKey } = useApiKey();
  const { model: globalModel } = useModel();
  const [response, setResponse] = useState<Message | null>(null);
  const [streamingContent, setStreamingContent] = useState("");
  const [streamingReasoning, setStreamingReasoning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setResponse(null);
    setStreamingContent("");
    setStreamingReasoning("");
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string, overrides: Partial<UseChatOptions> = {}): Promise<Message | null> => {
      const config = { ...options, ...overrides };

      if (!apiKey) {
        setError("Please set your OpenRouter API key first (in the sidebar).");
        return null;
      }

      setIsLoading(true);
      setError(null);
      setResponse(null);
      setStreamingContent("");
      setStreamingReasoning("");

      const messages: Message[] = [
        { id: uuidv4(), role: "user", content },
      ];

      try {
        const shouldStream = config.stream !== false && !config.enableTools;

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages,
            model: config.model || globalModel,
            temperature: config.temperature ?? 0.7,
            systemPrompt: config.systemPrompt,
            enableTools: config.enableTools || false,
            enableTracing: config.enableTracing || false,
            enableReasoning: config.enableReasoning || false,
            reasoningEffort: config.reasoningEffort,
            stream: shouldStream,
            openRouterApiKey: apiKey,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: res.statusText }));
          throw new Error(errData.details || errData.error || "Request failed");
        }

        if (shouldStream) {
          const reader = res.body?.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          let accumulatedReasoning = "";

          if (!reader) throw new Error("No response body");

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

            for (const line of lines) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "reasoning") {
                  accumulatedReasoning += parsed.content;
                  setStreamingReasoning(accumulatedReasoning);
                } else if (parsed.type === "content") {
                  accumulated += parsed.content;
                  setStreamingContent(accumulated);
                } else if (parsed.type === "done") {
                  const msg = parsed.message as Message;
                  setResponse(msg);
                  setStreamingContent("");
                  setStreamingReasoning("");
                  setIsLoading(false);
                  window.dispatchEvent(new Event("balance-refresh"));
                  return msg;
                }
              } catch {}
            }
          }
          setIsLoading(false);
          return null;
        } else {
          const data = await res.json();
          const msg = data.message as Message;
          setResponse(msg);
          setIsLoading(false);
          window.dispatchEvent(new Event("balance-refresh"));
          return msg;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setIsLoading(false);
        return null;
      }
    },
    [apiKey, globalModel, options]
  );

  return { sendMessage, response, streamingContent, streamingReasoning, isLoading, error, reset };
}
