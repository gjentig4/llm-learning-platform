"use client";

import { useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponseDisplay } from "@/components/shared/response-display";
import { Send, Thermometer } from "lucide-react";

export function ApiExplorer() {
  const [temperature, setTemperature] = useState(0.7);
  const [message, setMessage] = useState("What is Kosovo known for? Answer in 1-2 sentences.");
  const [rawRequest, setRawRequest] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);

  const { sendMessage, response, streamingContent, isLoading, error } =
    useChat({ temperature, stream: false });

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const requestBody = {
      messages: [{ id: "1", role: "user", content: message }],
      model: "(from sidebar)",
      temperature,
      stream: false,
      openRouterApiKey: "YOUR_API_KEY",
    };
    setRawRequest(JSON.stringify(requestBody, null, 2));
    setRawResponse(null);

    const result = await sendMessage(message, { temperature, stream: false });
    if (result) {
      setRawResponse(
        JSON.stringify(
          {
            message: {
              role: result.role,
              content: result.content.slice(0, 500) + (result.content.length > 500 ? "..." : ""),
            },
            metadata: result.metadata,
          },
          null,
          2
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Temperature */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <label className="text-sm text-muted-foreground">Temperature</label>
          </div>
          <span className="text-sm font-mono text-primary">
            {temperature.toFixed(1)}
          </span>
        </div>
        <Slider
          value={[temperature]}
          onValueChange={([v]) => setTemperature(v)}
          min={0}
          max={2}
          step={0.1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Message input */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Your Message</label>
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="bg-card border-border min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <Tabs defaultValue="parsed" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="parsed">Response</TabsTrigger>
          <TabsTrigger value="request">Raw Request</TabsTrigger>
          <TabsTrigger value="response">Raw Response</TabsTrigger>
        </TabsList>
        <TabsContent value="parsed">
          <ResponseDisplay
            message={response}
            streamingContent={streamingContent}
            isLoading={isLoading}
            error={error}
          />
        </TabsContent>
        <TabsContent value="request">
          {rawRequest ? (
            <pre className="p-4 rounded-lg bg-muted border border-border text-xs text-foreground/70 overflow-auto max-h-64">
              {rawRequest}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground p-4">
              Send a message to see the request
            </p>
          )}
        </TabsContent>
        <TabsContent value="response">
          {rawResponse ? (
            <pre className="p-4 rounded-lg bg-muted border border-border text-xs text-foreground/70 overflow-auto max-h-64">
              {rawResponse}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground p-4">
              Send a message to see the response
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
