# Building with LLMs

A workshop platform where you learn LLM APIs by using them. Every page has interactive demos — you type a prompt, it makes a real API call, you see the response with tokens, cost, and latency.

Built for the [FLOSSK](https://flossk.org) workshop series.

## Topics

- **API Basics** — make an API call, adjust temperature, compare streaming vs non-streaming
- **System Prompts** — same question, two different system prompts, completely different answers
- **Observability** — trace calls with Langfuse (public links, no account needed)
- **Prompt Caching** — send 17k tokens twice, watch the second one hit the cache
- **Tool Calling** — give the model a weather function and watch it call it
- **RAG** — inject your own context so the model stops making things up
- **Reasoning** — toggle chain-of-thought on/off, compare the results
- **Security** — try to extract fake secrets from a system prompt via prompt injection

## Stack

- [Next.js 16](https://nextjs.org) + React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [OpenRouter](https://openrouter.ai) — one API, many models (Gemini, DeepSeek, etc.)
- [Langfuse](https://langfuse.com) — observability / tracing

Each demo component is wired to a specific model (configured in `lib/models.ts`). Users provide their own OpenRouter API key in the sidebar — nothing is stored server-side.

## Getting Started

```bash
git clone https://github.com/gjentig4/llm-learning-platform.git
cd llm-learning-platform
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You'll need an [OpenRouter API key](https://openrouter.ai/keys) — enter it in the sidebar. Free tier works, no credit card.

### Environment Variables

All optional. The platform works without them — Langfuse keys just enable the observability demos.

| Variable | Description |
|---|---|
| `LANGFUSE_SECRET_KEY` | Langfuse secret key |
| `LANGFUSE_PUBLIC_KEY` | Langfuse public key |
| `LANGFUSE_PROJECT_ID` | Langfuse project ID |
| `LANGFUSE_HOST` | Defaults to `https://cloud.langfuse.com` |
| `OPENROUTER_API_KEY` | Optional fallback (users provide their own) |

## License

MIT
