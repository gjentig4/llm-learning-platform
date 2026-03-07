# Building with LLMs — FLOSSK Workshop

An interactive learning platform for understanding LLM APIs hands-on. Every page has live demos that make real API calls — you type prompts, tweak parameters, and see what happens.

Built for the [FLOSSK](https://flossk.org) workshop series.

## Topics

- **API Basics** — Make your first API call, compare streaming vs non-streaming
- **System Prompts** — Same question, different system prompts, completely different answers
- **Observability** — Trace every LLM call with Langfuse (tokens, cost, latency)
- **Prompt Caching** — Stop paying to process the same prompt over and over
- **Tool Calling** — Give models functions they can call (live weather data)
- **RAG** — Inject your own knowledge into the model's context
- **Reasoning** — Let the model think before it answers (with visible chain-of-thought)
- **Security** — Prompt injection, the lethal trifecta, and defense in depth

## Stack

- [Next.js 16](https://nextjs.org) + React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [OpenRouter](https://openrouter.ai) as the LLM gateway
- [Langfuse](https://langfuse.com) for observability (optional)

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and add your keys
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You'll need an [OpenRouter API key](https://openrouter.ai/keys) — enter it in the sidebar. Free models are available, no credit card required.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `LANGFUSE_SECRET_KEY` | No | Langfuse secret key (for observability page) |
| `LANGFUSE_PUBLIC_KEY` | No | Langfuse public key |
| `LANGFUSE_PROJECT_ID` | No | Langfuse project ID |
| `LANGFUSE_HOST` | No | Langfuse host (defaults to `https://cloud.langfuse.com`) |
| `OPENROUTER_API_KEY` | No | Fallback API key (users provide their own in the UI) |

## License

MIT
