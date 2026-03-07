import { Langfuse } from "langfuse";

let langfuseInstance: Langfuse | null = null;

export function getLangfuse(): Langfuse | null {
  if (
    !process.env.LANGFUSE_SECRET_KEY ||
    !process.env.LANGFUSE_PUBLIC_KEY ||
    process.env.LANGFUSE_SECRET_KEY === "your_secret_key"
  ) {
    return null;
  }

  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: process.env.LANGFUSE_HOST || "https://cloud.langfuse.com",
    });
  }

  return langfuseInstance;
}

export function getLangfuseBaseUrl(): string {
  return process.env.LANGFUSE_HOST || "https://cloud.langfuse.com";
}

export interface TraceMetadata {
  model: string;
  temperature?: number;
  toolsEnabled?: boolean;
  systemPrompt?: string;
  topic?: string;
}

export function createTrace(name: string, metadata: TraceMetadata) {
  const langfuse = getLangfuse();
  if (!langfuse) {
    return null;
  }

  return langfuse.trace({
    name,
    metadata,
    public: true,
  });
}

export function getTraceUrl(traceId: string): string {
  const baseUrl = getLangfuseBaseUrl();
  const projectId = process.env.LANGFUSE_PROJECT_ID;
  if (!projectId) {
    return `${baseUrl}/trace/${traceId}`;
  }
  return `${baseUrl}/project/${projectId}/traces/${traceId}`;
}

export async function flushLangfuse() {
  const langfuse = getLangfuse();
  if (langfuse) {
    await langfuse.flushAsync();
  }
}
