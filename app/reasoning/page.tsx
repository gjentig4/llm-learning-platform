"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `Some questions need more than a quick answer. "How many r's in strawberry?" sounds trivial, but models get it wrong all the time — because they generate text one token at a time without stopping to count. Reasoning changes that. It gives the model a scratchpad to think through the problem before committing to an answer.`,
  },
  {
    id: "reasoning-demo",
    type: "interactive",
    component: "ReasoningDemo",
  },
  {
    id: "explanation",
    type: "text",
    content: `## How reasoning works

When you enable reasoning, the model gets an internal "thinking" phase before generating its visible response. During this phase it can break down the problem, consider edge cases, and verify its logic — all before you see a single word of output.

### Effort levels

- **Low** — Minimal thinking. Good for questions that just need a bit more care than usual.
- **Medium** — Balanced. The model takes a reasonable amount of time to think through the problem.
- **High** — Deep thinking. For complex math, logic puzzles, or multi-step reasoning tasks.

### When to use it

Reasoning shines on tasks where "thinking fast" fails: counting letters, logic puzzles, multi-step math, code debugging, and any question where the obvious answer is wrong. It's overkill for "summarize this text" or "translate this sentence."

### The temperature trade-off

When reasoning is enabled, **temperature is automatically disabled** (set to 0 or removed). Reasoning models need deterministic thinking — randomness in the thinking phase would lead to inconsistent logic chains. This is handled automatically by the API.

### Which models support it?

Not all models have reasoning capabilities. Models like **DeepSeek R1**, **OpenAI o1/o3**, **Qwen QwQ**, and **Claude** (with extended thinking) support reasoning natively. Other models may ignore the reasoning parameters or produce unexpected results. Check the model's documentation on OpenRouter.`,
  },
];

export default function ReasoningPage() {
  return (
    <NotebookPage
      title="Reasoning"
      description="Give the model time to think before it answers."
      cells={cells}
    />
  );
}
