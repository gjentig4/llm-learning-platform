"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ResponseDisplay } from "@/components/shared/response-display";
import { ChevronDown, ChevronRight, Database } from "lucide-react";

const SAMPLE_KNOWLEDGE = `FLOSSK (Free Libre Open Source Software Kosova) is a non-profit organization founded in 2009, based in Prishtina, Kosovo. FLOSSK promotes open source software, open data, and digital rights in Kosovo and the Western Balkans.

Key Activities:
- Organizes Software Freedom Day every year since 2009
- Runs workshops on open source technologies, AI/ML, and web development
- Advocates for open data policies in Kosovo's government institutions
- Collaborates with international FOSS communities (Mozilla, Wikimedia, etc.)

Current Project - Albanian Language Model Benchmark:
- Building a benchmark to evaluate AI models on Albanian language tasks
- Categories include: general knowledge, history, science, culture, translation
- Uses OpenRouter API for multi-model comparison
- Tracks results with Langfuse for observability
- Website built with Next.js and deployed on Vercel

The benchmark project has 4 sessions:
- Session 1: AI Fundamentals (completed)
- Building with LLMs workshop (API, tools, RAG)
- Session 3: Benchmark Building Day
- Session 4: Final Presentations & Launch`;

const SUGGESTIONS = [
  "What is FLOSSK's current project?",
  "When was FLOSSK founded?",
  "What tech stack does the benchmark use?",
];

export function RagDemo() {
  const [knowledge, setKnowledge] = useState(SAMPLE_KNOWLEDGE);
  const [question, setQuestion] = useState("");
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showAugmented, setShowAugmented] = useState(false);

  const withoutContext = useChat({ stream: false });
  const withContext = useChat({ stream: false });

  const isLoading = withoutContext.isLoading || withContext.isLoading;

  const augmentedSystemPrompt = `Answer questions based ONLY on the following context. If the answer is not in the context, say "I don't have that information." Keep it to 1-2 sentences.

--- CONTEXT ---
${knowledge}
--- END CONTEXT ---`;

  const handleAsk = async (q?: string) => {
    const content = q || question;
    if (!content.trim() || isLoading) return;
    setQuestion(content);
    withoutContext.reset();
    withContext.reset();
    await Promise.all([
      withoutContext.sendMessage(content, {
        systemPrompt: "Answer in 1-2 sentences. If you don't know, say so.",
      }),
      withContext.sendMessage(content, {
        systemPrompt: augmentedSystemPrompt,
      }),
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Editable knowledge base */}
      <div className="rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => setShowKnowledge(!showKnowledge)}
          className="w-full flex items-center gap-2 p-2 hover:bg-muted text-muted-foreground text-sm"
        >
          {showKnowledge ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          <Database className="w-4 h-4 text-primary" />
          <span>Knowledge Base ({knowledge.length} chars)</span>
          <span className="text-xs ml-auto">edit</span>
        </button>
        {showKnowledge && (
          <Textarea
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
            className="border-0 border-t border-border rounded-none bg-muted min-h-[160px] text-sm font-mono focus-visible:ring-0"
          />
        )}
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <Button
            key={s}
            variant="outline"
            size="sm"
            onClick={() => handleAsk(s)}
            disabled={isLoading}
            className="text-xs"
          >
            {s}
          </Button>
        ))}
      </div>

      {/* Question input */}
      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-card border-border"
          placeholder="Ask something about the knowledge base..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />
        <Button onClick={() => handleAsk()} disabled={isLoading || !question.trim()}>
          {isLoading ? "Asking..." : "Ask Both"}
        </Button>
      </div>

      {/* Side-by-side results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Without context (plain LLM)
          </h4>
          <ResponseDisplay
            message={withoutContext.response}
            isLoading={withoutContext.isLoading}
            error={withoutContext.error}
            showDebug={false}
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-primary">
            With context (RAG)
          </h4>
          <ResponseDisplay
            message={withContext.response}
            isLoading={withContext.isLoading}
            error={withContext.error}
            showDebug={false}
          />
        </div>
      </div>

      {/* Augmented prompt viewer */}
      {(withContext.response || withContext.isLoading) && (
        <div className="rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setShowAugmented(!showAugmented)}
            className="w-full flex items-center gap-2 p-2 hover:bg-muted text-muted-foreground text-sm"
          >
            {showAugmented ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            <span>What the model actually received (augmented prompt)</span>
          </button>
          {showAugmented && (
            <pre className="p-3 bg-muted text-xs text-muted-foreground overflow-auto max-h-48 border-t border-border">
              {augmentedSystemPrompt}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
