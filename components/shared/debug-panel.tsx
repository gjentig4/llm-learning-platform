"use client";

import { MessageMetadata } from "@/types";
import { Bug, Coins, Clock, Database, Zap, ExternalLink } from "lucide-react";

interface DebugPanelProps {
  debugInfo: MessageMetadata | null | undefined;
}

export function DebugPanel({ debugInfo }: DebugPanelProps) {
  if (!debugInfo) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground/80">Debug Info</label>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border text-center">
          <p className="text-sm text-muted-foreground">Send a message to see debug info</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Input Tokens", value: debugInfo.tokensIn?.toLocaleString() ?? "\u2014", icon: Database, color: "text-blue-600 dark:text-blue-400" },
    { label: "Output Tokens", value: debugInfo.tokensOut?.toLocaleString() ?? "\u2014", icon: Zap, color: "text-green-600 dark:text-green-400" },
    { label: "Latency", value: debugInfo.latencyMs ? `${debugInfo.latencyMs.toLocaleString()}ms` : "\u2014", icon: Clock, color: "text-amber-600 dark:text-amber-400" },
    { label: "Cost", value: debugInfo.cost !== undefined ? `$${debugInfo.cost.toFixed(6)}` : "\u2014", icon: Coins, color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bug className="w-4 h-4 text-muted-foreground" />
        <label className="text-sm font-medium text-foreground/80">Debug Info</label>
        {debugInfo.cached && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50">
            Cached
          </span>
        )}
      </div>

      <div className="p-3 rounded-lg bg-card border border-border space-y-2">
        {debugInfo.model && (
          <div className="text-xs font-mono text-muted-foreground pb-2 border-b border-border truncate">
            {debugInfo.model}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className={`w-3 h-3 ${stat.color}`} />
                  {stat.label}
                </div>
                <div className="text-sm font-mono text-foreground">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {debugInfo.toolCalls && debugInfo.toolCalls.length > 0 && (
          <div className="pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1">Tool Calls</div>
            <div className="space-y-1">
              {debugInfo.toolCalls.map((tool) => (
                <div key={tool.id} className="text-xs font-mono text-purple-700 dark:text-purple-400">
                  {tool.name}()
                </div>
              ))}
            </div>
          </div>
        )}

        {debugInfo.traceUrl && (
          <div className="pt-2 border-t border-border">
            <a
              href={debugInfo.traceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View in Langfuse
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
