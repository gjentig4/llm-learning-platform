"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message, ToolCall } from "@/types";
import { ChevronDown, ChevronRight, Wrench, ExternalLink, Bug, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

function ToolCallDisplay({ tool }: { tool: ToolCall }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card text-sm font-mono overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 p-2 hover:bg-muted transition-colors text-foreground/70"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <Wrench className="w-4 h-4" />
        <span className="font-semibold">{tool.name}()</span>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-border">
          <div className="pt-2">
            <span className="text-muted-foreground text-xs uppercase tracking-wide">Input:</span>
            <pre className="text-foreground/70 text-xs mt-1 overflow-auto max-h-32 bg-muted p-2 rounded border border-border">
              {JSON.stringify(tool.arguments, null, 2)}
            </pre>
          </div>
          {tool.result !== undefined && (
            <div>
              <span className="text-muted-foreground text-xs uppercase tracking-wide">Result:</span>
              <pre className="text-foreground/70 text-xs mt-1 overflow-auto max-h-48 bg-muted p-2 rounded border border-border">
                {JSON.stringify(tool.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DebugInfo({ metadata }: { metadata: Message["metadata"] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!metadata) return null;

  const hasInfo = metadata.tokensIn !== undefined || metadata.cost !== undefined || metadata.latencyMs !== undefined;
  if (!hasInfo) return null;

  return (
    <div className="rounded-lg border border-border bg-card text-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 p-2 hover:bg-muted transition-colors text-muted-foreground"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <Bug className="w-4 h-4" />
        <span className="font-medium">Debug Info</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {metadata.tokensIn && `${metadata.tokensIn} in / ${metadata.tokensOut} out`}
          {metadata.cost !== undefined && ` · $${metadata.cost.toFixed(4)}`}
        </span>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-border">
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {metadata.tokensIn !== undefined && (
              <div className="p-2 rounded bg-muted">
                <span className="text-muted-foreground">Tokens In:</span>
                <span className="text-foreground ml-1">{metadata.tokensIn.toLocaleString()}</span>
              </div>
            )}
            {metadata.tokensOut !== undefined && (
              <div className="p-2 rounded bg-muted">
                <span className="text-muted-foreground">Tokens Out:</span>
                <span className="text-foreground ml-1">{metadata.tokensOut.toLocaleString()}</span>
              </div>
            )}
            {metadata.cost !== undefined && (
              <div className="p-2 rounded bg-muted">
                <span className="text-muted-foreground">Cost:</span>
                <span className="text-green-700 dark:text-green-400 ml-1">${metadata.cost.toFixed(6)}</span>
              </div>
            )}
            {metadata.latencyMs !== undefined && (
              <div className="p-2 rounded bg-muted">
                <span className="text-muted-foreground">Latency:</span>
                <span className="text-foreground ml-1">{metadata.latencyMs.toLocaleString()}ms</span>
              </div>
            )}
            {metadata.cached && (
              <div className="p-2 rounded bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50">
                <span className="text-green-700 dark:text-green-400">Cached</span>
                {metadata.cachedTokens !== undefined && (
                  <span className="text-green-600 dark:text-green-400 ml-1">({metadata.cachedTokens} tokens)</span>
                )}
              </div>
            )}
            {metadata.reasoningTokens !== undefined && (
              <div className="p-2 rounded bg-muted border border-border">
                <span className="text-muted-foreground">Reasoning Tokens:</span>
                <span className="text-foreground ml-1">{metadata.reasoningTokens.toLocaleString()}</span>
              </div>
            )}
            {metadata.model && (
              <div className="p-2 rounded bg-muted col-span-2">
                <span className="text-muted-foreground">Model:</span>
                <span className="text-foreground ml-1 font-mono text-[10px]">{metadata.model}</span>
              </div>
            )}
            {metadata.traceUrl && (
              <div className="p-2 rounded bg-muted border border-border col-span-2">
                <a
                  href={metadata.traceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-3 h-3" />
                  View in Langfuse
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ThinkingDisplay({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-lg border border-border bg-muted text-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 p-2 hover:bg-muted/80 transition-colors text-muted-foreground"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <Brain className="w-4 h-4" />
        <span className="font-medium text-foreground/70">Thinking</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {content.length} chars
        </span>
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-border">
          <pre className="mt-2 text-xs text-foreground/70 whitespace-pre-wrap overflow-auto max-h-64 leading-relaxed">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}

interface ResponseDisplayProps {
  message: Message | null;
  streamingContent?: string;
  streamingReasoning?: string;
  isLoading?: boolean;
  error?: string | null;
  showDebug?: boolean;
}

export function ResponseDisplay({
  message,
  streamingContent,
  streamingReasoning,
  isLoading,
  error,
  showDebug = true,
}: ResponseDisplayProps) {
  if (error) {
    return (
      <div className="p-4 rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm">
        {error}
      </div>
    );
  }

  if (isLoading && !streamingContent && !message) {
    return (
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Thinking...
        </div>
      </div>
    );
  }

  const content = message?.content || streamingContent;
  if (!content && !message?.metadata?.toolCalls?.length) return null;

  const thinkingContent = message?.metadata?.thinking || streamingReasoning;

  return (
    <div className="space-y-3">
      {/* Thinking / Reasoning */}
      {thinkingContent && <ThinkingDisplay content={thinkingContent} />}

      {/* Tool calls */}
      {message?.metadata?.toolCalls && message.metadata.toolCalls.length > 0 && (
        <div className="space-y-2">
          {message.metadata.toolCalls.map((tool) => (
            <ToolCallDisplay key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* Response content */}
      {content && (
        <div className={cn(
          "p-4 rounded-lg border border-border bg-card",
          isLoading && "border-primary/50"
        )}>
          <div className="text-foreground/80 text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0 text-foreground/80 leading-[1.7]">{children}</p>,
                ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1 text-foreground/80">{children}</ul>,
                ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1 text-foreground/80">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  return isBlock ? (
                    <code className={`${className} block bg-muted p-3 rounded-lg overflow-x-auto text-sm border border-border`}>{children}</code>
                  ) : (
                    <code className="bg-secondary text-primary px-1.5 py-0.5 rounded text-sm">{children}</code>
                  );
                },
                pre: ({ children }) => <pre className="my-2 first:mt-0 last:mb-0">{children}</pre>,
                a: ({ children, href }) => (
                  <a href={href} className="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">{children}</a>
                ),
                table: ({ children }) => (
                  <div className="my-2 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                th: ({ children }) => <th className="px-3 py-2 text-left font-medium text-foreground border-b border-border">{children}</th>,
                td: ({ children }) => <td className="px-3 py-2 text-foreground/80 border-b border-border">{children}</td>,
                img: ({ src, alt }) => (
                  <code className="bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded text-xs break-all">
                    {`![${alt}](${src})`}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Debug info */}
      {showDebug && message?.metadata && <DebugInfo metadata={message.metadata} />}
    </div>
  );
}
