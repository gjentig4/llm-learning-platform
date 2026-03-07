"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `You need to know what your AI is actually doing — how much each call costs, how long it takes, what it received and what it said back. In production, you can't just hope it's working. That's what observability gives you.`,
  },
  {
    id: "langfuse-demo",
    type: "interactive",
    component: "LangfuseDemo",
  },
  {
    id: "explanation",
    type: "text",
    content: `## What you're looking at

[Langfuse](https://langfuse.com) is an open-source tool that captures every LLM call as a **trace**. Each trace shows you the input messages, the output, token counts, cost in dollars, latency, and which model was used. When a single request involves multiple LLM calls (like with tool calling), each one shows up as a separate **generation** inside the trace.

The trace links in this demo are **public** — you can open them without a Langfuse account. In your own projects, you control which traces are public and which stay private.

LLMs charge per token — roughly 4 characters per token. We're using free models in this workshop, but in production the costs add up fast. A chatbot handling 10,000 conversations a day on GPT-4o can easily run $500/month. That's why you trace everything from day one — so you know where the money is going and can optimize before it becomes a problem.`,
  },
];

export default function ObservabilityPage() {
  return (
    <NotebookPage
      title="Observability"
      description="Know what your AI is doing, what it costs, and why it said that."
      cells={cells}
    />
  );
}
