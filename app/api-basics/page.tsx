"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "explorer",
    type: "interactive",
    component: "ApiExplorer",
  },
  {
    id: "what-happened",
    type: "text",
    content: `## What just happened?

You sent an HTTP request to an LLM and got text back. That's the whole idea — when you use ChatGPT or Claude in the browser, there's an API underneath doing exactly this. You just skipped the chat interface and talked to the model directly.

We're using [OpenRouter](https://openrouter.ai) as a gateway — one API key, access to models from OpenAI, Anthropic, Google, Meta, and others. The format follows OpenAI's standard: you POST messages to \`/chat/completions\`, and the model responds.`,
  },
  {
    id: "endpoint-compare",
    type: "interactive",
    component: "EndpointCompare",
  },
  {
    id: "endpoint-note",
    type: "text",
    content: `## Streaming vs non-streaming

Same endpoint, same prompt, two modes. With \`stream: true\`, the API sends tokens back as they're generated — you see the response appear word by word (Server-Sent Events under the hood). With \`stream: false\`, you wait until the model finishes, then get the whole response at once. Streaming feels faster because the user sees progress immediately, even though the total time is about the same.`,
  },
  {
    id: "temperature-experiment",
    type: "interactive",
    component: "TemperatureExperiment",
  },
  {
    id: "temperature-note",
    type: "text",
    content: `## Temperature

Same prompt, different temperature, different results. At 0, the model plays it safe — deterministic, predictable. Crank it up toward 1.5 or 2, and it gets creative, sometimes weird. For most tasks, the default around 0.7 is a good middle ground.`,
  },
];

export default function ApiBasicsPage() {
  return (
    <NotebookPage
      title="API Basics"
      description="Let's make an API call. Pick a model, type something, hit send."
      cells={cells}
    />
  );
}
