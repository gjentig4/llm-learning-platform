"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { COMPONENT_MODELS } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Thermometer } from "lucide-react";

export function TemperatureExperiment() {
  const [prompt, setPrompt] = useState(
    "Invent a name for a coffee shop in Prishtina. Just the name, nothing else."
  );
  const [tempA, setTempA] = useState(0.0);
  const [tempB, setTempB] = useState(1.5);

  const chatA = useChat({ stream: false, model: COMPONENT_MODELS.temperatureExperiment });
  const chatB = useChat({ stream: false, model: COMPONENT_MODELS.temperatureExperiment });

  const isLoading = chatA.isLoading || chatB.isLoading;

  const handleSendBoth = async () => {
    if (!prompt.trim() || isLoading) return;
    chatA.reset();
    chatB.reset();
    await Promise.all([
      chatA.sendMessage(prompt, { temperature: tempA }),
      chatB.sendMessage(prompt, { temperature: tempB }),
    ]);
  };

  const usedTempA = chatA.response?.metadata?.model ? tempA : null;
  const usedTempB = chatB.response?.metadata?.model ? tempB : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Prompt (same for both)</label>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-card border-border"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendBoth();
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-muted-foreground">Temperature A</span>
            </div>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
              {tempA.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[tempA]}
            onValueChange={([v]) => setTempA(v)}
            min={0}
            max={2}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">Temperature B</span>
            </div>
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400">
              {tempB.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[tempB]}
            onValueChange={([v]) => setTempB(v)}
            min={0}
            max={2}
            step={0.1}
          />
        </div>
      </div>

      <Button onClick={handleSendBoth} disabled={isLoading} className="w-full">
        {isLoading ? "Sending both..." : "Send Both"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Temperature {tempA.toFixed(1)} (Precise)
            {usedTempA !== null && (
              <span className="text-xs text-muted-foreground font-normal ml-2">
                used: {usedTempA.toFixed(1)}
              </span>
            )}
          </h4>
          <ResponseDisplay
            message={chatA.response}
            isLoading={chatA.isLoading}
            error={chatA.error}
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400">
            Temperature {tempB.toFixed(1)} (Creative)
            {usedTempB !== null && (
              <span className="text-xs text-muted-foreground font-normal ml-2">
                used: {usedTempB.toFixed(1)}
              </span>
            )}
          </h4>
          <ResponseDisplay
            message={chatB.response}
            isLoading={chatB.isLoading}
            error={chatB.error}
          />
        </div>
      </div>
    </div>
  );
}
