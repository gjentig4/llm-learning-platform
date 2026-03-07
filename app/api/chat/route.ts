import { NextRequest } from "next/server";
import {
  chatCompletion,
  parseStreamChunk,
  OpenRouterResponse,
} from "@/lib/openrouter";
import { AVAILABLE_TOOLS, executeTool } from "@/lib/tools";
import { createTrace, flushLangfuse, getTraceUrl } from "@/lib/langfuse";
import { ChatRequest, Message } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body: ChatRequest = await request.json();

    const lastUserMessage = body.messages
      .filter((m) => m.role === "user")
      .pop();

    // Create Langfuse trace if enabled
    const trace = body.enableTracing
      ? createTrace("chat-completion", {
          model: body.model,
          temperature: body.temperature,
          toolsEnabled: body.enableTools,
          systemPrompt: body.systemPrompt,
        })
      : null;

    if (trace) {
      trace.update({
        input: {
          systemPrompt: body.systemPrompt,
          userMessage: lastUserMessage?.content,
          messageCount: body.messages.length,
        },
      });
    }

    // Tools setup
    const tools = body.enableTools ? AVAILABLE_TOOLS : undefined;

    // Force non-streaming when tools are enabled
    if (body.stream && body.enableTools) {
      body.stream = false;
    }

    const response = await chatCompletion(body, tools, body.openRouterApiKey);

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to get response from model",
          details: error,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle streaming response (no tools)
    if (body.stream) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      let fullContent = "";
      let fullReasoning = "";
      let usage: OpenRouterResponse["usage"] | undefined;

      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader();
          if (!reader) {
            controller.close();
            return;
          }

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n").filter((line) => line.trim());

              for (const line of lines) {
                const parsed = parseStreamChunk(line);

                if (parsed.done) {
                  const latencyMs = Date.now() - startTime;
                  const finalData = JSON.stringify({
                    type: "done",
                    message: {
                      id: uuidv4(),
                      role: "assistant",
                      content: fullContent,
                      metadata: {
                        tokensIn: usage?.prompt_tokens,
                        tokensOut: usage?.completion_tokens,
                        cost: usage?.cost,
                        cached:
                          (usage?.prompt_tokens_details?.cached_tokens ?? 0) >
                          0,
                        cachedTokens:
                          usage?.prompt_tokens_details?.cached_tokens,
                        latencyMs,
                        model: body.model,
                        traceUrl: trace
                          ? getTraceUrl(trace.id)
                          : undefined,
                        thinking: fullReasoning || undefined,
                      },
                    },
                  });
                  controller.enqueue(
                    encoder.encode(`data: ${finalData}\n\n`)
                  );
                  break;
                }

                if (parsed.reasoning) {
                  fullReasoning += parsed.reasoning;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "reasoning", content: parsed.reasoning })}\n\n`
                    )
                  );
                }

                if (parsed.content) {
                  fullContent += parsed.content;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "content", content: parsed.content })}\n\n`
                    )
                  );
                }

                if (parsed.usage) {
                  usage = parsed.usage;
                }
              }
            }
          } finally {
            reader.releaseLock();
            controller.close();

            if (trace) {
              trace.update({ output: fullContent, public: true });

              const messagesForLog = body.systemPrompt
                ? [
                    { role: "system", content: body.systemPrompt },
                    ...body.messages,
                  ]
                : body.messages;

              trace.generation({
                name: "chat-response",
                model: body.model,
                input: messagesForLog,
                output: fullContent,
                usage: usage
                  ? {
                      promptTokens: usage.prompt_tokens,
                      completionTokens: usage.completion_tokens,
                      totalTokens: usage.total_tokens,
                    }
                  : undefined,
              });
              await flushLangfuse();
            }
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Handle non-streaming response (supports tools with ReAct loop)
    let data: OpenRouterResponse = await response.json();
    let assistantMessage = data.choices[0]?.message;
    let content = assistantMessage?.content || "";

    const allToolResults: {
      id: string;
      name: string;
      arguments: Record<string, unknown>;
      result: unknown;
    }[] = [];
    let toolCalls = assistantMessage?.tool_calls;
    let iterations = 0;
    const maxIterations = 5;

    while (toolCalls && toolCalls.length > 0 && iterations < maxIterations) {
      iterations++;

      const currentToolResults: {
        id: string;
        name: string;
        arguments: Record<string, unknown>;
        result: unknown;
      }[] = [];

      for (const toolCall of toolCalls) {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await executeTool(toolCall.function.name, args);
        currentToolResults.push({
          id: toolCall.id,
          name: toolCall.function.name,
          arguments: args,
          result,
        });
        allToolResults.push({
          id: toolCall.id,
          name: toolCall.function.name,
          arguments: args,
          result,
        });
      }

      const toolMessages: Message[] = [
        ...body.messages,
        {
          id: uuidv4(),
          role: "assistant" as const,
          content: content || "",
          metadata: { toolCalls: currentToolResults },
        },
        ...currentToolResults.map((tr) => ({
          id: uuidv4(),
          role: "tool" as const,
          content: JSON.stringify(tr.result, null, 2),
          metadata: { toolCallId: tr.id, toolName: tr.name },
        })),
      ];

      if (trace) {
        trace.span({
          name: `tool-execution-${iterations}`,
          input: currentToolResults.map((t) => ({
            name: t.name,
            args: t.arguments,
          })),
          output: currentToolResults.map((t) => ({
            name: t.name,
            result: t.result,
          })),
        });
      }

      const followUpRequest: ChatRequest = {
        ...body,
        messages: toolMessages,
        stream: false,
        enableTools: iterations < maxIterations - 1,
      };

      const followUpTools =
        iterations < maxIterations - 1 ? tools : undefined;
      const followUpResponse = await chatCompletion(
        followUpRequest,
        followUpTools,
        body.openRouterApiKey
      );

      if (!followUpResponse.ok) {
        const errorText = await followUpResponse.text();
        console.error("Follow-up request failed:", errorText);
        break;
      }

      data = await followUpResponse.json();
      assistantMessage = data.choices[0]?.message;
      content = assistantMessage?.content || "";
      toolCalls = assistantMessage?.tool_calls;
    }

    const latencyMs = Date.now() - startTime;

    const reasoningContent = assistantMessage?.reasoning_content;

    const message: Message = {
      id: uuidv4(),
      role: "assistant",
      content,
      metadata: {
        tokensIn: data.usage?.prompt_tokens,
        tokensOut: data.usage?.completion_tokens,
        cost: data.usage?.cost,
        cached:
          (data.usage?.prompt_tokens_details?.cached_tokens ?? 0) > 0,
        cachedTokens: data.usage?.prompt_tokens_details?.cached_tokens,
        latencyMs,
        model: body.model,
        toolCalls: allToolResults.length > 0 ? allToolResults : undefined,
        traceUrl: trace ? getTraceUrl(trace.id) : undefined,
        thinking: reasoningContent || undefined,
      },
    };

    if (trace) {
      trace.update({ output: content, public: true });

      const messagesForLog = body.systemPrompt
        ? [
            { role: "system", content: body.systemPrompt },
            ...body.messages,
          ]
        : body.messages;

      trace.generation({
        name: "chat-response",
        model: body.model,
        input: messagesForLog,
        output: content,
        usage: data.usage
          ? {
              promptTokens: data.usage.prompt_tokens,
              completionTokens: data.usage.completion_tokens,
              totalTokens: data.usage.total_tokens,
            }
          : undefined,
        metadata: {
          toolIterations: iterations,
          toolCallsTotal: allToolResults.length,
        },
      });
      await flushLangfuse();
    }

    return new Response(
      JSON.stringify({ message, toolResults: allToolResults }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
