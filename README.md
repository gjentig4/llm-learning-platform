# Building with LLMs

An interactive, open-source learning platform that teaches you how to work with Large Language Model APIs — by actually using them. No slides, no videos. Every page has live demos where you type prompts, tweak parameters, and see real API responses.

Built for the [FLOSSK](https://flossk.org) (Free Libre Open Source Software Kosova) workshop series on AI and open source.

## What You'll Learn

The platform covers 8 topics, each with hands-on interactive components:

| Topic | What it covers |
|---|---|
| **API Basics** | Make your first LLM API call. Adjust temperature, see raw request/response JSON, compare streaming vs non-streaming side by side. |
| **System Prompts** | Write two different system prompts and send the same user message to both. See how a single hidden instruction completely changes the model's personality. |
| **Observability** | Every API call is traced with Langfuse. After each request you get a public link to inspect the full trace — tokens, cost, latency, everything. |
| **Prompt Caching** | Send a 17k-token system prompt twice. The first request writes the cache, the second reads it. Watch the cost drop in real time. |
| **Tool Calling** | Give the model access to weather and time functions. Ask "What's the weather in Prishtina?" and watch the ReAct loop: the model calls tools, gets results, and generates a final answer. |
| **RAG** | Edit a knowledge base, then ask questions with and without it. Compare how a plain LLM hallucinates vs how a RAG-augmented one answers from context. |
| **Reasoning** | Toggle reasoning on/off and adjust effort levels. Compare how the same model performs on logic puzzles with and without chain-of-thought. |
| **Security** | A model has a system prompt with fake secrets (API keys, internal URLs). Try to extract them with prompt injection attacks. Some will work — that's the point. |

## How It Works

- **No backend AI logic** — everything goes through [OpenRouter](https://openrouter.ai), which gives you access to models from Google, DeepSeek, OpenAI, Anthropic, and others through a single API.
- **Each component uses a specific model** — Gemini for most demos, DeepSeek for temperature experiments, reasoning, and security. Configured in [`lib/models.ts`](lib/models.ts).
- **Observability built in** — [Langfuse](https://langfuse.com) traces are generated for the observability and tool calling demos, with public links so anyone can inspect them without an account.
- **Balance tracking** — the sidebar shows your OpenRouter API key's remaining credits in real time, updated after every request.
- **Fully client-driven** — users provide their own OpenRouter API key in the sidebar. Nothing is stored server-side.

## Stack

- [Next.js 16](https://nextjs.org) + React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [OpenRouter](https://openrouter.ai) as the LLM gateway
- [Langfuse](https://langfuse.com) for observability

## Getting Started

```bash
# Clone
git clone https://github.com/gjentig4/llm-learning-platform.git
cd llm-learning-platform

# Install
npm install

# Set up environment variables (Langfuse keys are optional)
cp .env.example .env.local

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You'll need an [OpenRouter API key](https://openrouter.ai/keys) — enter it in the sidebar. Free models are available, no credit card required.

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `LANGFUSE_SECRET_KEY` | No | Langfuse secret key (enables observability demos) |
| `LANGFUSE_PUBLIC_KEY` | No | Langfuse public key |
| `LANGFUSE_PROJECT_ID` | No | Langfuse project ID |
| `LANGFUSE_HOST` | No | Defaults to `https://cloud.langfuse.com` |
| `OPENROUTER_API_KEY` | No | Fallback key (users provide their own in the UI) |

## Project Structure

```
app/                  # Next.js pages and API routes
  api/chat/           # Main LLM proxy (streaming, tools, tracing)
  api/credits/        # OpenRouter balance/key info proxy
  api-basics/         # Topic pages...
  observability/
  ...
components/
  interactive/        # The 10 demo components (api-explorer, rag-demo, etc.)
  shared/             # Reusable UI (response-display, balance, api-key input)
  providers/          # React context (API key, model, theme)
  layout/             # Sidebar, navigation
hooks/                # useChat, useProgress
lib/                  # OpenRouter client, tools, models config, reasoning utils
```

## License

MIT
