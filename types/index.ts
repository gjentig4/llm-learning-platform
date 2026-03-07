// Chat message
export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  metadata?: MessageMetadata;
  createdAt?: string;
}

export interface MessageMetadata {
  tokensIn?: number;
  tokensOut?: number;
  cost?: number;
  latencyMs?: number;
  cached?: boolean;
  cachedTokens?: number;
  model?: string;
  toolCalls?: ToolCall[];
  toolCallId?: string;
  toolName?: string;
  traceUrl?: string;
  reasoningTokens?: number;
  thinking?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

// API request/response types
export interface ChatRequest {
  messages: Message[];
  model: string;
  temperature?: number;
  stream?: boolean;
  systemPrompt?: string;
  enableTools?: boolean;
  enableTracing?: boolean;
  openRouterApiKey?: string;
  enableReasoning?: boolean;
  reasoningEffort?: "low" | "medium" | "high";
}
