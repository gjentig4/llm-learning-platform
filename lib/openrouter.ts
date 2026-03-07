import { ChatRequest } from "@/types";
import { mapReasoningParams } from "@/lib/reasoning";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface OpenRouterMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_calls?: {
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }[];
  tool_call_id?: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  stream?: boolean;
  max_tokens?: number;
  tools?: OpenRouterTool[];
  [key: string]: unknown;
}

export interface OpenRouterTool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface OpenRouterResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      reasoning_content?: string;
      tool_calls?: {
        id: string;
        type: "function";
        function: {
          name: string;
          arguments: string;
        };
      }[];
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: {
      cached_tokens?: number;
    };
    cost?: number;
  };
}

export async function chatCompletion(
  request: ChatRequest,
  tools?: OpenRouterTool[],
  customApiKey?: string
): Promise<Response> {
  const apiKey = customApiKey || process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("No API key provided. Please set your OpenRouter API key.");
  }

  const openRouterRequest: OpenRouterRequest = {
    model: request.model,
    messages: request.messages.map((m) => {
      const msg: OpenRouterMessage = {
        role: m.role,
        content: m.content,
      };

      if (m.role === "assistant" && m.metadata?.toolCalls && m.metadata.toolCalls.length > 0) {
        msg.tool_calls = m.metadata.toolCalls.map((tc) => ({
          id: tc.id,
          type: "function" as const,
          function: {
            name: tc.name,
            arguments: JSON.stringify(tc.arguments),
          },
        }));
      }

      if (m.role === "tool" && m.metadata?.toolCallId) {
        msg.tool_call_id = m.metadata.toolCallId;
      }

      return msg;
    }),
    stream: request.stream ?? true,
  };

  if (request.enableReasoning) {
    const reasoningParams = mapReasoningParams(
      request.model,
      request.reasoningEffort
    );
    Object.assign(openRouterRequest, reasoningParams);
    // Temperature must be unset for reasoning models
    delete openRouterRequest.temperature;
  } else if (request.temperature !== undefined) {
    openRouterRequest.temperature = request.temperature;
  }

  if (request.enableTools && tools && tools.length > 0) {
    openRouterRequest.tools = tools;
  }

  if (request.systemPrompt) {
    openRouterRequest.messages = [
      { role: "system", content: request.systemPrompt },
      ...openRouterRequest.messages,
    ];
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "FLOSSK Learning Platform",
    },
    body: JSON.stringify(openRouterRequest),
  });

  return response;
}

export interface ToolCallDelta {
  index?: number;
  id?: string;
  type?: "function";
  function?: {
    name?: string;
    arguments?: string;
  };
}

export function parseStreamChunk(chunk: string): {
  content?: string;
  reasoning?: string;
  toolCalls?: ToolCallDelta[];
  usage?: OpenRouterResponse["usage"];
  done?: boolean;
} {
  if (chunk.startsWith("data: ")) {
    const data = chunk.slice(6);
    if (data === "[DONE]") {
      return { done: true };
    }
    try {
      const parsed = JSON.parse(data);
      const delta = parsed.choices?.[0]?.delta;

      return {
        content: delta?.content,
        reasoning: delta?.reasoning_content || delta?.reasoning,
        toolCalls: delta?.tool_calls,
        usage: parsed.usage,
      };
    } catch {
      return {};
    }
  }
  return {};
}
