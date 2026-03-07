// Hardcoded model assignments per component
// Each component uses a specific model tailored for its demo purpose

export const COMPONENT_MODELS = {
  apiExplorer: "google/gemini-3.1-flash-lite-preview",
  endpointCompare: "google/gemini-3.1-flash-lite-preview",
  temperatureExperiment: "deepseek/deepseek-v3.2",
  systemPromptCompare: "google/gemini-3.1-flash-lite-preview",
  langfuseDemo: "google/gemini-3.1-flash-lite-preview",
  cachingCompare: "google/gemini-3.1-flash-lite-preview",
  toolCallingDemo: "google/gemini-3.1-flash-lite-preview",
  ragDemo: "google/gemini-3.1-flash-lite-preview",
  reasoningDemo: "deepseek/deepseek-v3.2",
  injectionDemo: "deepseek/deepseek-v3.2",
} as const;
