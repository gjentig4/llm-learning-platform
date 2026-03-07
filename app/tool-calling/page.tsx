"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `LLMs can't check the weather. They can't look up today's date, query a database, or call your API. They generate text — that's it. But what if you gave them a function they could ask you to run? That's tool calling. You define the tools, the model decides when to use them, and your code does the actual execution.`,
  },
  {
    id: "tool-demo",
    type: "interactive",
    component: "ToolCallingDemo",
  },
  {
    id: "explanation",
    type: "text",
    content: `## The ReAct loop

What you just saw is the **ReAct pattern** — Reasoning + Acting. Here's how it works: you send your message along with tool definitions (just JSON describing each function's name, purpose, and parameters). The model reads your question, decides it needs real data, and instead of answering with text, it responds with a tool call — a function name and arguments. Your code runs that function and sends the result back. The model then uses that result to write its final answer.

Sometimes it takes multiple steps. Ask "What's the weather in Prishtina and what time is it?" and the model will call two different tools, one after another, then combine both results into a single response. The demo above shows you each step of that loop as it happens. Try asking something that needs both tools and watch it work through the chain.`,
  },
];

export default function ToolCallingPage() {
  return (
    <NotebookPage
      title="Tool Calling"
      description="Give models functions they can call. Watch them reason about when to use them."
      cells={cells}
    />
  );
}
