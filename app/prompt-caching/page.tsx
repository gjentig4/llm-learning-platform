"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `Every time you send a request, the model processes all your input tokens from scratch. If you're sending the same long system prompt with every request — and you usually are — you're paying to process those same tokens over and over. Prompt caching fixes this. The first request processes and stores the prompt. After that, subsequent requests with the same prefix hit the cache, skip the reprocessing, and cost 75-90% less for the cached portion.`,
  },
  {
    id: "caching-demo",
    type: "interactive",
    component: "CachingCompare",
  },
  {
    id: "explanation",
    type: "text",
    content: `## How it works

The first request is a **cache write** — normal cost, the tokens get processed and stored. Every request after that with the same prefix is a **cache read** — the cached tokens are reused at a fraction of the price. The bigger your repeated prefix (system prompt, document context, instructions), the bigger the savings. For a 2,000-token system prompt with 50-token user messages, you're looking at roughly 88% savings per request after the first one. Over thousands of requests, that adds up to real money.

Note: not all models support caching, and the demo above may not show dramatic differences with free models. This matters most in production with paid models and large contexts.`,
  },
];

export default function PromptCachingPage() {
  return (
    <NotebookPage
      title="Prompt Caching"
      description="Same long prompt every time? You're overpaying. Caching fixes that."
      cells={cells}
    />
  );
}
