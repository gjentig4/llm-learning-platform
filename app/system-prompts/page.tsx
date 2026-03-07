"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "system-prompt-compare",
    type: "interactive",
    component: "SystemPromptCompare",
  },
  {
    id: "what-happened",
    type: "text",
    content: `## Same question, totally different answer

That's the system prompt at work. Every API call has three message types: **system** (instructions the user doesn't see), **user** (what the person types), and **assistant** (the model's response). The system prompt fires before anything else — it sets the personality, the rules, the constraints. Change it, and you change everything about how the model behaves.

### Writing good system prompts with CRAFT

There's a simple framework called **CRAFT** that helps you cover your bases:

- **Context** — what's this assistant for?
- **Role** — what persona should it adopt?
- **Action** — what should it actually do?
- **Format** — bullet points, paragraphs, code?
- **Tone** — formal, casual, friendly?

You don't need all five every time. But when a model isn't behaving the way you want, check which one you're missing — that's usually where the problem is.`,
  },
];

export default function SystemPromptsPage() {
  return (
    <NotebookPage
      title="System Prompts"
      description="The hidden instruction that changes everything."
      cells={cells}
    />
  );
}
