"use client";

import dynamic from "next/dynamic";

// Lazy-load interactive components
const COMPONENT_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  ApiExplorer: dynamic(() => import("@/components/interactive/api-explorer").then(m => ({ default: m.ApiExplorer })), { ssr: false }),
  EndpointCompare: dynamic(() => import("@/components/interactive/endpoint-compare").then(m => ({ default: m.EndpointCompare })), { ssr: false }),
  TemperatureExperiment: dynamic(() => import("@/components/interactive/temperature-experiment").then(m => ({ default: m.TemperatureExperiment })), { ssr: false }),
  SystemPromptCompare: dynamic(() => import("@/components/interactive/system-prompt-compare").then(m => ({ default: m.SystemPromptCompare })), { ssr: false }),
  LangfuseDemo: dynamic(() => import("@/components/interactive/langfuse-demo").then(m => ({ default: m.LangfuseDemo })), { ssr: false }),
  CachingCompare: dynamic(() => import("@/components/interactive/caching-compare").then(m => ({ default: m.CachingCompare })), { ssr: false }),
  ToolCallingDemo: dynamic(() => import("@/components/interactive/tool-calling-demo").then(m => ({ default: m.ToolCallingDemo })), { ssr: false }),
  RagDemo: dynamic(() => import("@/components/interactive/rag-demo").then(m => ({ default: m.RagDemo })), { ssr: false }),
  ReasoningDemo: dynamic(() => import("@/components/interactive/reasoning-demo").then(m => ({ default: m.ReasoningDemo })), { ssr: false }),
  InjectionDemo: dynamic(() => import("@/components/interactive/injection-demo").then(m => ({ default: m.InjectionDemo })), { ssr: false }),
};

const COMPONENT_LABELS: Record<string, string> = {
  ApiExplorer: "Try it",
  EndpointCompare: "Try it",
  TemperatureExperiment: "Experiment",
  SystemPromptCompare: "Try it",
  LangfuseDemo: "Try it",
  CachingCompare: "Try it",
  ToolCallingDemo: "Try it",
  RagDemo: "Try it",
  ReasoningDemo: "Try it",
  InjectionDemo: "Try it",
};

interface InteractiveCellProps {
  component: string;
  props?: Record<string, unknown>;
}

export function InteractiveCell({ component, props = {} }: InteractiveCellProps) {
  const Component = COMPONENT_MAP[component];

  if (!Component) {
    return (
      <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-sm">
        Unknown component: {component}
      </div>
    );
  }

  const label = COMPONENT_LABELS[component] || "Try it";

  return (
    <div className="lab-card rounded-xl overflow-hidden">
      {/* Subtle header */}
      <div className="flex items-center gap-2 px-4 py-2.5">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {label}
        </span>
        <span className="text-xs text-muted-foreground font-mono">{component}</span>
      </div>

      {/* Component content */}
      <div className="p-4 pt-2">
        <Component {...props} />
      </div>
    </div>
  );
}
