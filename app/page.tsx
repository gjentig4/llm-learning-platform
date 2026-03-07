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
    description:
      "Make your first API call. Pick a model, send a prompt, see what comes back.",
  },
  {
    href: "/system-prompts",
    icon: MessageSquare,
    title: "System Prompts",
    description:
      "Same question, completely different answers. All from one hidden instruction.",
  },
  {
    href: "/observability",
    icon: BarChart3,
    title: "Observability",
    description:
      "What did your AI just do? How much did it cost? Find out.",
  },
  {
    href: "/prompt-caching",
    icon: HardDrive,
    title: "Prompt Caching",
    description:
      "Stop paying to process the same prompt over and over.",
  },
  {
    href: "/tool-calling",
    icon: Wrench,
    title: "Tool Calling",
    description:
      "LLMs can't check the weather. Unless you give them a function that can.",
  },
  {
    href: "/rag",
    icon: Database,
    title: "RAG",
    description:
      "Models don't know about FLOSSK. Let's give them some context and fix that.",
  },
  {
    href: "/reasoning",
    icon: Brain,
    title: "Reasoning",
    description:
      "Some questions need a scratchpad. Let the model think before it answers.",
  },
  {
    href: "/security",
    icon: Shield,
    title: "Security",
    description:
      "LLMs can't tell instructions from data. Try to exploit that.",
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
        <p className="text-lg text-muted-foreground leading-relaxed">
          A hands-on FLOSSK workshop — every page
          has interactive demos that make real API calls. You'll type prompts,
          tweak parameters, and see what happens. That's how you learn this stuff.
        </p>
      </div>

      {/* API Key — friendly nudge */}
      {!hasKey && (
        <div className="mb-10 p-5 rounded-xl bg-card border border-border">
          <h2 className="text-base font-semibold text-foreground mb-1">
            Before you start
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            The demos need an OpenRouter API key. Free models are available — no credit card required.
          </p>
          <div className="max-w-md">
            <ApiKeyInput />
          </div>
        </div>
      )}

      {/* Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.href}
              href={topic.href}
              className="group p-5 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground/90 group-hover:text-foreground flex items-center gap-2">
                    {topic.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {topic.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>Pick any topic. Go in any order. Every page is self-contained.</p>
      </div>
    </div>
  );
}
