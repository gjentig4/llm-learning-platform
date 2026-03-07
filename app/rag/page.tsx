"use client";

import { NotebookPage } from "@/components/notebook/notebook-page";
import { Cell } from "@/lib/cells";

const cells: Cell[] = [
  {
    id: "intro",
    type: "text",
    content: `Ask a model "What is FLOSSK?" and it'll either make something up or say it doesn't know. It was trained on internet data up to a cutoff — it has no idea what FLOSSK is. RAG fixes this. You give the model your own data as context, right when it needs it.

The demo below asks the **same question** to the **same model** twice — once with no context (plain LLM), and once with a knowledge base injected into the system prompt (RAG). Compare the results.`,
  },
  {
    id: "rag-demo",
    type: "interactive",
    component: "RagDemo",
  },
  {
    id: "explanation",
    type: "text",
    content: `## What's actually happening

The "RAG" side isn't magic. Your knowledge base text gets pasted into the system prompt before the model sees it. That's it — the model reads the context and answers from it instead of guessing.

This technique is called **context injection**. It's the simplest form of RAG and it works great when your data fits in the context window (most models support 100K+ tokens now).

## The full RAG pipeline

When your data is too large for a single prompt, you build a pipeline:

1. **Chunk** your documents into smaller pieces
2. **Embed** each chunk into a vector (a list of numbers that captures meaning)
3. **Store** the vectors in a vector database (Pinecone, Weaviate, pgvector)
4. **Search** for the most relevant chunks when a user asks a question
5. **Inject** only the matching chunks into the system prompt

The model never sees your entire knowledge base — just the parts that are relevant to the question. This is how you scale RAG to millions of documents.

## When to use what

- **Context injection** (this demo): your data fits in ~100K tokens. No infrastructure needed.
- **Full RAG pipeline**: you have too many documents, or they change frequently, or you need semantic search over them.

Start with context injection. You'd be surprised how far it gets you.`,
  },
];

export default function RagPage() {
  return (
    <NotebookPage
      title="RAG"
      description="Same question, same model. One gets your data, one doesn't."
      cells={cells}
    />
  );
}
