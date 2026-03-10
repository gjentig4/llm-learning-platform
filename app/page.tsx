"use client";

import Link from "next/link";
import { ApiKeyInput } from "@/components/shared/api-key-input";
import { useApiKey } from "@/components/providers/api-key-provider";
import {
  Code,
  MessageSquare,
  BarChart3,
  HardDrive,
  Wrench,
  Database,
  Brain,
  Shield,
  ArrowRight,
} from "lucide-react";

const TOPICS = [
  {
    href: "/api-basics",
    icon: Code,
    title: "API Basics",
    description: "Make an API call, adjust temperature, compare streaming vs non-streaming.",
    tag: "Start here",
  },
  {
    href: "/system-prompts",
    icon: MessageSquare,
    title: "System Prompts",
    description: "Same question, two system prompts, completely different answers.",
  },
  {
    href: "/observability",
    icon: BarChart3,
    title: "Observability",
    description: "Trace a call with Langfuse. See tokens, cost, latency.",
  },
  {
    href: "/prompt-caching",
    icon: HardDrive,
    title: "Prompt Caching",
    description: "Send 17k tokens twice. The second one hits the cache.",
  },
  {
    href: "/tool-calling",
    icon: Wrench,
    title: "Tool Calling",
    description: "Give the model a weather function and watch it call it.",
  },
  {
    href: "/rag",
    icon: Database,
    title: "RAG",
    description: "The model doesn't know about FLOSSK. Inject context and fix that.",
  },
  {
    href: "/reasoning",
    icon: Brain,
    title: "Reasoning",
    description: "Toggle thinking on. See how the model works through a logic puzzle.",
  },
  {
    href: "/security",
    icon: Shield,
    title: "Security",
    description: "There's a fake API key in the system prompt. Try to extract it.",
  },
];

export default function Home() {
  const { hasKey } = useApiKey();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-4">
          Building with LLMs
        </h1>
        <p className="text-lg text-muted-foreground leading-[1.7]">
          Every page here has a live demo. You type a prompt, it makes a real
          API call, you see what comes back — tokens used, cost, latency,
          the whole response. The topics go from basic API calls to tool use,
          RAG, reasoning, and prompt injection. Pick one and start.
        </p>
      </div>

      {/* API Key */}
      {!hasKey && (
        <div className="mb-10 lab-card rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Before you start
            </span>
          </div>
          <div className="px-4 pb-4 pt-1">
            <p className="text-sm text-foreground/80 leading-[1.7] mb-3">
              You need an OpenRouter API key — it's what connects you to the models.
              Free tier works fine, no credit card.{" "}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
              >
                Get one here
              </a>
              .
            </p>
            <div className="max-w-sm">
              <ApiKeyInput />
            </div>
          </div>
        </div>
      )}

      {/* Topics */}
      <div className="space-y-3">
        {TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.href}
              href={topic.href}
              className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
            >
              <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground/90 group-hover:text-foreground flex items-center gap-2">
                  {topic.title}
                  {topic.tag && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {topic.tag}
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary ml-auto shrink-0" />
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>
          A{" "}
          <a
            href="https://flossk.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
          >
            FLOSSK
          </a>{" "}
          workshop. Go in any order — every page is self-contained.
        </p>
      </div>
    </div>
  );
}
