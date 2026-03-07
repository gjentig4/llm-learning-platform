const REASONING_PATTERNS = [
  /^anthropic\/claude/i,
  /^openai\/o[1-9]/i,
  /^openai\/o3/i,
  /^openai\/gpt-5/i,
  /^deepseek\/deepseek-r1/i,
  /^deepseek\/deepseek-(chat-)?v3\.[12]/i,
  /^qwen\/qwq/i,
  /^qwen\/qwen.*think/i,
  /^google\/gemini.*thinking/i,
  /^google\/gemini-2\.5/i,
  /^google\/gemini-3/i,
];

export function supportsReasoning(modelId: string): boolean {
  return REASONING_PATTERNS.some((pattern) => pattern.test(modelId));
}

// Token-budget models (Anthropic, DeepSeek, Alibaba)
const TOKEN_BUDGET_PATTERNS = [
  /^anthropic\//i,
  /^deepseek\//i,
  /^qwen\//i,
];

export function mapReasoningParams(
  modelId: string,
  effort: "low" | "medium" | "high" = "medium"
): Record<string, unknown> {
  // Models that use max_tokens budget
  if (TOKEN_BUDGET_PATTERNS.some((p) => p.test(modelId))) {
    const budgetMap = { low: 1024, medium: 4096, high: 16384 };
    return {
      reasoning: { max_tokens: budgetMap[effort] },
    };
  }

  // All others (OpenAI, Gemini, Grok, etc.) use effort
  return {
    reasoning: { effort },
  };
}
